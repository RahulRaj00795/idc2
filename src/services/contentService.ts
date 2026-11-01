import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  Achiever,
  NewsItem,
  ProjectShowcase,
  BlogPost,
  DiasporaEvent,
  ContactSubmission,
  NriPioMember
} from '../types';

export const CONTACT_RECIPIENT_EMAIL = 'indiandiasporaclub@gmail.com';
import {
  INITIAL_ACHIEVERS,
  INITIAL_NEWS,
  INITIAL_PROJECTS,
  INITIAL_POSTS,
  INITIAL_EVENTS,
  INITIAL_NRI_PIO
} from '../data/initialData';

// Storage keys for offline/fast fallback cache
const STORAGE_PREFIX = 'diaspora_portal_';

// Canonical timestamps for untouched starter sample items so user-posted content always appears first
const SEED_METADATA = new Map<string, { headline: string; createdAtMs: number }>();

for (const a of INITIAL_ACHIEVERS) {
  SEED_METADATA.set(a.id, { headline: a.name, createdAtMs: Date.parse(a.createdAt || '') || 0 });
}
for (const n of INITIAL_NEWS) {
  SEED_METADATA.set(n.id, { headline: n.title, createdAtMs: Date.parse(n.createdAt || '') || 0 });
}
for (const p of INITIAL_PROJECTS) {
  SEED_METADATA.set(p.id, { headline: p.title, createdAtMs: Date.parse(p.createdAt || '') || 0 });
}
for (const b of INITIAL_POSTS) {
  SEED_METADATA.set(b.id, { headline: b.title, createdAtMs: Date.parse(b.createdAt || '') || 0 });
}
for (const e of INITIAL_EVENTS) {
  SEED_METADATA.set(e.id, { headline: e.title, createdAtMs: Date.parse(e.createdAt || '') || 0 });
}
for (const m of INITIAL_NRI_PIO) {
  SEED_METADATA.set(m.id, { headline: m.name, createdAtMs: Date.parse(m.createdAt || '') || 0 });
}

function parseTimestampMs(val: unknown): number {
  if (!val) return 0;
  if (typeof val === 'number' && Number.isFinite(val)) return val;
  if (typeof val === 'string') {
    const parsed = Date.parse(val);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (typeof val === 'object' && val !== null) {
    const maybeTs = val as { toMillis?: () => number; seconds?: number };
    if (typeof maybeTs.toMillis === 'function') {
      return maybeTs.toMillis();
    }
    if (typeof maybeTs.seconds === 'number') {
      return maybeTs.seconds * 1000;
    }
  }
  return 0;
}

function extractIdTimestampMs(id?: string): number {
  if (!id) return 0;
  const match = id.match(/(\d{13})/);
  return match ? Number(match[1]) : 0;
}

type SortableContentItem = {
  id: string;
  title?: string;
  name?: string;
  createdAt?: string;
  publishedAt?: string;
  order?: number;
};

function getItemSortTimeMs(item: SortableContentItem, rawUpdatedAt?: unknown): number {
  const seed = SEED_METADATA.get(item.id);
  const currentHeadline = item.title || item.name || '';

  // If this is an untouched sample item from initial seed data, use its canonical sample timestamp
  if (seed && seed.headline === currentHeadline && seed.createdAtMs > 0) {
    return seed.createdAtMs;
  }

  const createdMs = parseTimestampMs(item.createdAt);
  const idMs = extractIdTimestampMs(item.id);
  if (createdMs > 0 || idMs > 0) {
    return Math.max(createdMs, idMs);
  }

  const updatedMs = parseTimestampMs(rawUpdatedAt);
  if (updatedMs > 0) return updatedMs;

  return parseTimestampMs(item.publishedAt);
}

function sortNewestFirst<T extends SortableContentItem>(
  items: T[],
  updatedAtById?: Map<string, unknown>
): T[] {
  return [...items].sort((a, b) => {
    const aTime = getItemSortTimeMs(a, updatedAtById?.get(a.id));
    const bTime = getItemSortTimeMs(b, updatedAtById?.get(b.id));
    if (bTime !== aTime) {
      return bTime - aTime;
    }

    const idDiff = extractIdTimestampMs(b.id) - extractIdTimestampMs(a.id);
    if (idDiff !== 0) return idDiff;

    const pubDiff = parseTimestampMs(b.publishedAt) - parseTimestampMs(a.publishedAt);
    if (pubDiff !== 0) return pubDiff;

    const orderDiff = (a.order ?? 99) - (b.order ?? 99);
    if (orderDiff !== 0) return orderDiff;

    return a.id.localeCompare(b.id);
  });
}

function getCached<T extends SortableContentItem>(key: string, fallback: T[]): T[] {
  try {
    const val = localStorage.getItem(STORAGE_PREFIX + key);
    if (val) {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        return sortNewestFirst(parsed as T[]);
      }
    }
  } catch (e) {
    console.error('Local cache read error', e);
  }
  return sortNewestFirst(fallback);
}

function setCached<T>(key: string, data: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error('Local cache write error', e);
  }
}

/**
 * Service to manage all Diaspora portal content with Firestore (ordered most-recently-posted first)
 */
export const contentService = {
  // --- Seed Data into Firestore ---
  async seedInitialData(): Promise<void> {
    try {
      for (const item of INITIAL_ACHIEVERS) {
        await setDoc(doc(db, 'achievers', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      for (const item of INITIAL_NEWS) {
        await setDoc(doc(db, 'news', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      for (const item of INITIAL_PROJECTS) {
        await setDoc(doc(db, 'projects', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      for (const item of INITIAL_POSTS) {
        await setDoc(doc(db, 'posts', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      for (const item of INITIAL_EVENTS) {
        await setDoc(doc(db, 'events', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      await this.seedNriPioInitialData();

      console.log('Initial diaspora data successfully seeded into Firestore');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'seed');
    }
  },

  async seedNriPioInitialData(): Promise<void> {
    for (const item of INITIAL_NRI_PIO) {
      await setDoc(doc(db, 'nriPio', item.id), {
        id: item.id,
        name: item.name,
        photoUrl: item.photoUrl,
        country: item.country,
        awarded: item.awarded,
        designation: item.designation || '',
        details: item.details,
        createdAt: item.createdAt,
        updatedAt: serverTimestamp()
      });
    }
    await setDoc(
      doc(db, 'siteConfig', 'nriPioSeeded'),
      { imageUrl: 'seeded', updatedAt: serverTimestamp() },
      { merge: true }
    );
    localStorage.setItem(STORAGE_PREFIX + 'nri_pio_initialized', '1');
  },

  // --- Check if DB is empty and auto-seed if needed ---
  async checkAndAutoSeed(): Promise<void> {
    try {
      const snap = await getDocs(collection(db, 'achievers'));
      if (snap.empty) {
        console.log('No achievers found in Firestore, auto-seeding initial database...');
        await this.seedInitialData();
      }

      const nriInitSnap = await getDoc(doc(db, 'siteConfig', 'nriPioSeeded'));
      if (!nriInitSnap.exists()) {
        const nriSnap = await getDocs(collection(db, 'nriPio'));
        if (nriSnap.empty) {
          await this.seedNriPioInitialData();
        } else {
          await setDoc(
            doc(db, 'siteConfig', 'nriPioSeeded'),
            { imageUrl: 'seeded', updatedAt: serverTimestamp() },
            { merge: true }
          );
          localStorage.setItem(STORAGE_PREFIX + 'nri_pio_initialized', '1');
        }
      } else {
        localStorage.setItem(STORAGE_PREFIX + 'nri_pio_initialized', '1');
      }
    } catch (error) {
      console.warn('Auto-seed check encountered non-blocking error:', error);
    }
  },

  // --- Achievers ---
  subscribeAchievers(callback: (achievers: Achiever[]) => void): () => void {
    const cached = getCached<Achiever>('achievers', INITIAL_ACHIEVERS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'achievers'),
        (snapshot) => {
          if (!snapshot.empty) {
            const updatedMap = new Map<string, unknown>();
            const rawList: Achiever[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              updatedMap.set(docSnap.id, data.updatedAt);
              return {
                id: docSnap.id,
                name: data.name || '',
                role: data.role || '',
                country: data.country || '',
                achievement: data.achievement || '',
                story: data.story || '',
                imageUrl: data.imageUrl || '',
                featured: data.featured ?? true,
                order: data.order ?? 99,
                tags: data.tags || [],
                createdAt: data.createdAt || ''
              } as Achiever;
            });
            const sorted = sortNewestFirst(rawList, updatedMap);
            setCached('achievers', sorted);
            callback(sorted);
          } else {
            callback(cached);
          }
        },
        (error) => {
          console.warn('Achievers snapshot fallback to cache:', error);
          callback(cached);
        }
      );
      return unsub;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'achievers');
      return () => {};
    }
  },

  async saveAchiever(item: Achiever): Promise<void> {
    const id = item.id || `achiever-${Date.now()}`;
    const cleanItem: Achiever = {
      ...item,
      id,
      createdAt: item.createdAt || new Date().toISOString()
    };
    try {
      await setDoc(
        doc(db, 'achievers', id),
        { ...cleanItem, updatedAt: serverTimestamp() },
        { merge: true }
      );
      const list = getCached<Achiever>('achievers', INITIAL_ACHIEVERS);
      const idx = list.findIndex((i) => i.id === id);
      if (idx >= 0) list[idx] = cleanItem;
      else list.unshift(cleanItem);
      setCached('achievers', sortNewestFirst(list));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `achievers/${id}`);
    }
  },

  async deleteAchiever(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'achievers', id));
      const list = getCached<Achiever>('achievers', INITIAL_ACHIEVERS).filter((i) => i.id !== id);
      setCached('achievers', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `achievers/${id}`);
    }
  },

  // --- News ---
  subscribeNews(callback: (news: NewsItem[]) => void): () => void {
    const cached = getCached<NewsItem>('news', INITIAL_NEWS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'news'),
        (snapshot) => {
          if (!snapshot.empty) {
            const updatedMap = new Map<string, unknown>();
            const rawList: NewsItem[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              updatedMap.set(docSnap.id, data.updatedAt);
              return {
                id: docSnap.id,
                title: data.title || '',
                summary: data.summary || '',
                content: data.content || '',
                category: data.category || 'General',
                country: data.country || 'Global',
                imageUrl: data.imageUrl || '',
                source: data.source || 'Diaspora News',
                publishedAt: data.publishedAt || new Date().toLocaleDateString(),
                readTime: data.readTime || '3 min read',
                createdAt: data.createdAt || ''
              } as NewsItem;
            });
            const sorted = sortNewestFirst(rawList, updatedMap);
            setCached('news', sorted);
            callback(sorted);
          } else {
            callback(cached);
          }
        },
        (error) => {
          console.warn('News snapshot fallback to cache:', error);
          callback(cached);
        }
      );
      return unsub;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'news');
      return () => {};
    }
  },

  async saveNews(item: NewsItem): Promise<void> {
    const id = item.id || `news-${Date.now()}`;
    const cleanItem: NewsItem = {
      ...item,
      id,
      publishedAt:
        item.publishedAt ||
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: item.createdAt || new Date().toISOString()
    };
    try {
      await setDoc(
        doc(db, 'news', id),
        { ...cleanItem, updatedAt: serverTimestamp() },
        { merge: true }
      );
      const list = getCached<NewsItem>('news', INITIAL_NEWS);
      const idx = list.findIndex((i) => i.id === id);
      if (idx >= 0) list[idx] = cleanItem;
      else list.unshift(cleanItem);
      setCached('news', sortNewestFirst(list));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `news/${id}`);
    }
  },

  async deleteNews(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'news', id));
      const list = getCached<NewsItem>('news', INITIAL_NEWS).filter((i) => i.id !== id);
      setCached('news', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
    }
  },

  // --- Projects ---
  subscribeProjects(callback: (projects: ProjectShowcase[]) => void): () => void {
    const cached = getCached<ProjectShowcase>('projects', INITIAL_PROJECTS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'projects'),
        (snapshot) => {
          if (!snapshot.empty) {
            const updatedMap = new Map<string, unknown>();
            const rawList: ProjectShowcase[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              updatedMap.set(docSnap.id, data.updatedAt);
              return {
                id: docSnap.id,
                title: data.title || '',
                tagline: data.tagline || '',
                description: data.description || '',
                founder: data.founder || '',
                country: data.country || 'Global',
                category: data.category || 'Initiative',
                imageUrl: data.imageUrl || '',
                projectUrl: data.projectUrl || '',
                tags: data.tags || [],
                status: data.status || 'Live',
                createdAt: data.createdAt || ''
              } as ProjectShowcase;
            });
            const sorted = sortNewestFirst(rawList, updatedMap);
            setCached('projects', sorted);
            callback(sorted);
          } else {
            callback(cached);
          }
        },
        (error) => {
          console.warn('Projects snapshot fallback to cache:', error);
          callback(cached);
        }
      );
      return unsub;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'projects');
      return () => {};
    }
  },

  async saveProject(item: ProjectShowcase): Promise<void> {
    const id = item.id || `proj-${Date.now()}`;
    const cleanItem: ProjectShowcase = {
      ...item,
      id,
      createdAt: item.createdAt || new Date().toISOString()
    };
    try {
      await setDoc(
        doc(db, 'projects', id),
        { ...cleanItem, updatedAt: serverTimestamp() },
        { merge: true }
      );
      const list = getCached<ProjectShowcase>('projects', INITIAL_PROJECTS);
      const idx = list.findIndex((i) => i.id === id);
      if (idx >= 0) list[idx] = cleanItem;
      else list.unshift(cleanItem);
      setCached('projects', sortNewestFirst(list));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `projects/${id}`);
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'projects', id));
      const list = getCached<ProjectShowcase>('projects', INITIAL_PROJECTS).filter((i) => i.id !== id);
      setCached('projects', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  },

  // --- Blog Posts ---
  subscribePosts(callback: (posts: BlogPost[]) => void): () => void {
    const cached = getCached<BlogPost>('posts', INITIAL_POSTS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'posts'),
        (snapshot) => {
          if (!snapshot.empty) {
            const updatedMap = new Map<string, unknown>();
            const rawList: BlogPost[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              updatedMap.set(docSnap.id, data.updatedAt);
              return {
                id: docSnap.id,
                title: data.title || '',
                excerpt: data.excerpt || '',
                content: data.content || '',
                author: data.author || 'Diaspora Contributor',
                authorBio: data.authorBio || '',
                category: data.category || 'Article',
                imageUrl: data.imageUrl || '',
                readTime: data.readTime || '5 min read',
                publishedAt: data.publishedAt || new Date().toLocaleDateString(),
                createdAt: data.createdAt || ''
              } as BlogPost;
            });
            const sorted = sortNewestFirst(rawList, updatedMap);
            setCached('posts', sorted);
            callback(sorted);
          } else {
            callback(cached);
          }
        },
        (error) => {
          console.warn('Posts snapshot fallback to cache:', error);
          callback(cached);
        }
      );
      return unsub;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'posts');
      return () => {};
    }
  },

  async savePost(item: BlogPost): Promise<void> {
    const id = item.id || `post-${Date.now()}`;
    const cleanItem: BlogPost = {
      ...item,
      id,
      publishedAt:
        item.publishedAt ||
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: item.createdAt || new Date().toISOString()
    };
    try {
      await setDoc(
        doc(db, 'posts', id),
        { ...cleanItem, updatedAt: serverTimestamp() },
        { merge: true }
      );
      const list = getCached<BlogPost>('posts', INITIAL_POSTS);
      const idx = list.findIndex((i) => i.id === id);
      if (idx >= 0) list[idx] = cleanItem;
      else list.unshift(cleanItem);
      setCached('posts', sortNewestFirst(list));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `posts/${id}`);
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'posts', id));
      const list = getCached<BlogPost>('posts', INITIAL_POSTS).filter((i) => i.id !== id);
      setCached('posts', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    }
  },

  // --- Events ---
  subscribeEvents(callback: (events: DiasporaEvent[]) => void): () => void {
    const cached = getCached<DiasporaEvent>('events', INITIAL_EVENTS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'events'),
        (snapshot) => {
          if (!snapshot.empty) {
            const updatedMap = new Map<string, unknown>();
            const rawList: DiasporaEvent[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              updatedMap.set(docSnap.id, data.updatedAt);
              return {
                id: docSnap.id,
                title: data.title || '',
                date: data.date || '',
                location: data.location || '',
                description: data.description || '',
                imageUrl: data.imageUrl || '',
                registrationLink: data.registrationLink || '',
                category: data.category || 'Event',
                createdAt: data.createdAt || ''
              } as DiasporaEvent;
            });
            const sorted = sortNewestFirst(rawList, updatedMap);
            setCached('events', sorted);
            callback(sorted);
          } else {
            callback(cached);
          }
        },
        (error) => {
          console.warn('Events snapshot fallback to cache:', error);
          callback(cached);
        }
      );
      return unsub;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'events');
      return () => {};
    }
  },

  async saveEvent(item: DiasporaEvent): Promise<void> {
    const id = item.id || `event-${Date.now()}`;
    const cleanItem: DiasporaEvent = {
      ...item,
      id,
      createdAt: item.createdAt || new Date().toISOString()
    };
    try {
      await setDoc(
        doc(db, 'events', id),
        { ...cleanItem, updatedAt: serverTimestamp() },
        { merge: true }
      );
      const list = getCached<DiasporaEvent>('events', INITIAL_EVENTS);
      const idx = list.findIndex((i) => i.id === id);
      if (idx >= 0) list[idx] = cleanItem;
      else list.unshift(cleanItem);
      setCached('events', sortNewestFirst(list));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `events/${id}`);
    }
  },

  async deleteEvent(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'events', id));
      const list = getCached<DiasporaEvent>('events', INITIAL_EVENTS).filter((i) => i.id !== id);
      setCached('events', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `events/${id}`);
    }
  },

  // ==================== HOME BANNER ====================
  subscribeHomeBanner(callback: (imageUrl: string) => void): () => void {
    const cacheKey = `${STORAGE_PREFIX}home_banner`;
    const cachedUrl = localStorage.getItem(cacheKey) || '';
    if (cachedUrl) {
      callback(cachedUrl);
    }

    try {
      const unsub = onSnapshot(
        doc(db, 'siteConfig', 'homeBanner'),
        (snap) => {
          if (snap.exists()) {
            const url = (snap.data()?.imageUrl as string) || '';
            localStorage.setItem(cacheKey, url);
            callback(url);
          } else {
            localStorage.removeItem(cacheKey);
            callback('');
          }
        },
        (error) => {
          console.warn('Home banner snapshot fallback to cache:', error);
          callback(localStorage.getItem(cacheKey) || '');
        }
      );
      return unsub;
    } catch (err) {
      console.warn('Home banner subscription error:', err);
      return () => {};
    }
  },

  async saveHomeBanner(imageUrl: string): Promise<void> {
    const cacheKey = `${STORAGE_PREFIX}home_banner`;
    const trimmed = imageUrl.trim();
    try {
      if (!trimmed) {
        await deleteDoc(doc(db, 'siteConfig', 'homeBanner'));
        localStorage.removeItem(cacheKey);
      } else {
        await setDoc(
          doc(db, 'siteConfig', 'homeBanner'),
          { imageUrl: trimmed, updatedAt: serverTimestamp() },
          { merge: true }
        );
        localStorage.setItem(cacheKey, trimmed);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'siteConfig/homeBanner');
    }
  },

  async clearHomeBanner(): Promise<void> {
    try {
      await fetch('/api/upload-banner', { method: 'DELETE' });
    } catch {
      // Ignore if static endpoint is unavailable
    }
    await this.saveHomeBanner('');
  },

  async uploadExactBannerFile(file: File): Promise<string> {
    const rawDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });

    // 1. Persist exact untouched original PNG/image bytes to public/banner.png on server
    try {
      await fetch('/api/upload-banner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: rawDataUrl }),
      });
    } catch {
      // Continue to Firestore persistence even if static write is read-only in production
    }

    // 2. Persist in Firestore siteConfig/homeBanner (keep lossless if <= 900KB, else high-res WebP)
    let firestoreDataUrl = rawDataUrl;
    if (rawDataUrl.length > 900_000) {
      firestoreDataUrl = await new Promise<string>((resolve) => {
        const img = new window.Image();
        img.onload = () => {
          const maxWidth = 2400;
          const scale = img.width > maxWidth ? maxWidth / img.width : 1;
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          let encoded = canvas.toDataURL('image/webp', 0.94);
          if (encoded.length > 900_000) {
            encoded = canvas.toDataURL('image/webp', 0.86);
          }
          if (encoded.length > 900_000) {
            encoded = canvas.toDataURL('image/jpeg', 0.85);
          }
          if (encoded.length > 900_000) {
            const fallbackWidth = 1600;
            const fallbackScale = img.width > fallbackWidth ? fallbackWidth / img.width : 1;
            canvas.width = Math.round(img.width * fallbackScale);
            canvas.height = Math.round(img.height * fallbackScale);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            encoded = canvas.toDataURL('image/jpeg', 0.8);
          }
          resolve(encoded);
        };
        img.onerror = () => resolve(rawDataUrl);
        img.src = rawDataUrl;
      });
    }

    await this.saveHomeBanner(firestoreDataUrl);
    return firestoreDataUrl;
  },

  // ==================== CONTACT US SUBMISSIONS ====================
  subscribeContactSubmissions(callback: (items: ContactSubmission[]) => void): () => void {
    const cached = getCached<ContactSubmission>('contact_submissions', []);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'contactSubmissions'),
        (snapshot) => {
          const updatedMap = new Map<string, unknown>();
          const rawList: ContactSubmission[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            updatedMap.set(docSnap.id, data.updatedAt);
            return {
              id: docSnap.id,
              fullName: data.fullName || '',
              email: data.email || '',
              country: data.country || '',
              subject: data.subject || '',
              message: data.message || '',
              recipientEmail: data.recipientEmail || CONTACT_RECIPIENT_EMAIL,
              emailStatus: data.emailStatus || 'sent',
              createdAt: data.createdAt || ''
            } as ContactSubmission;
          });
          const sorted = sortNewestFirst(rawList, updatedMap);
          setCached('contact_submissions', sorted);
          callback(sorted);
        },
        (error) => {
          console.warn('Contact submissions snapshot fallback to cache:', error);
          callback(getCached<ContactSubmission>('contact_submissions', []));
        }
      );
      return unsub;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'contactSubmissions');
      return () => {};
    }
  },

  async saveContactSubmission(item: ContactSubmission): Promise<void> {
    const safeId = (item.id || `contact-${Date.now()}`)
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .slice(0, 128) || `contact-${Date.now()}`;

    const cleanItem: ContactSubmission = {
      id: safeId,
      fullName: item.fullName.trim().slice(0, 150),
      email: item.email.trim().slice(0, 200),
      country: (item.country || '').trim().slice(0, 100),
      subject: item.subject.trim().slice(0, 250),
      message: item.message.trim().slice(0, 5000),
      recipientEmail: (item.recipientEmail || CONTACT_RECIPIENT_EMAIL).trim().slice(0, 200),
      emailStatus: item.emailStatus || 'sending',
      createdAt: (item.createdAt || new Date().toISOString()).slice(0, 100)
    };

    try {
      await setDoc(doc(db, 'contactSubmissions', safeId), {
        id: cleanItem.id,
        fullName: cleanItem.fullName,
        email: cleanItem.email,
        country: cleanItem.country,
        subject: cleanItem.subject,
        message: cleanItem.message,
        recipientEmail: cleanItem.recipientEmail,
        emailStatus: cleanItem.emailStatus,
        createdAt: cleanItem.createdAt,
        updatedAt: serverTimestamp()
      });

      const list = getCached<ContactSubmission>('contact_submissions', []);
      const idx = list.findIndex((i) => i.id === safeId);
      if (idx >= 0) list[idx] = cleanItem;
      else list.unshift(cleanItem);
      setCached('contact_submissions', sortNewestFirst(list));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `contactSubmissions/${safeId}`);
    }
  },

  async deleteContactSubmission(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'contactSubmissions', id));
      const list = getCached<ContactSubmission>('contact_submissions', []).filter((i) => i.id !== id);
      setCached('contact_submissions', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `contactSubmissions/${id}`);
    }
  },

  async deliverContactEmail(
    item: Pick<ContactSubmission, 'fullName' | 'email' | 'country' | 'subject' | 'message'>
  ): Promise<'sent' | 'pending_activation' | 'failed'> {
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: item.fullName.trim().slice(0, 150),
          email: item.email.trim().slice(0, 200),
          country: item.country.trim().slice(0, 100) || 'Not specified',
          subject: item.subject.trim().slice(0, 250),
          message: item.message.trim().slice(0, 5000),
          _subject: `[Indian Diaspora Club] ${item.subject.trim().slice(0, 200)}`,
          _replyto: item.email.trim().slice(0, 200),
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await response.json().catch(() => null);
      if (response.ok && (data?.success === 'true' || data?.success === true)) {
        return 'sent';
      }

      const msg = String(data?.message || '').toLowerCase();
      if (msg.includes('activat')) {
        return 'pending_activation';
      }

      return response.ok ? 'sent' : 'failed';
    } catch (err) {
      console.warn('Email forwarding error:', err);
      return 'failed';
    }
  },

  // ==================== NRI / PIO MEMBERS ====================
  subscribeNriPio(callback: (members: NriPioMember[]) => void): () => void {
    const isInitialized = localStorage.getItem(STORAGE_PREFIX + 'nri_pio_initialized') === '1';
    const initialFallback = isInitialized ? [] : INITIAL_NRI_PIO;
    const cached = getCached<NriPioMember>('nri_pio', initialFallback);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'nriPio'),
        (snapshot) => {
          if (!snapshot.empty) {
            const updatedMap = new Map<string, unknown>();
            const rawList: NriPioMember[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              updatedMap.set(docSnap.id, data.updatedAt);
              return {
                id: docSnap.id,
                name: data.name || '',
                photoUrl: data.photoUrl || '',
                country: data.country || '',
                awarded: data.awarded || '',
                designation: data.designation || '',
                details: data.details || '',
                createdAt: data.createdAt || ''
              };
            });
            const sorted = sortNewestFirst(rawList, updatedMap);
            localStorage.setItem(STORAGE_PREFIX + 'nri_pio_initialized', '1');
            setCached('nri_pio', sorted);
            callback(sorted);
          } else {
            const alreadySeeded = localStorage.getItem(STORAGE_PREFIX + 'nri_pio_initialized') === '1';
            if (alreadySeeded) {
              setCached('nri_pio', []);
              callback([]);
            } else {
              callback(sortNewestFirst(INITIAL_NRI_PIO));
            }
          }
        },
        (error) => {
          console.warn('NRI/PIO snapshot fallback to cache:', error);
          callback(getCached<NriPioMember>('nri_pio', INITIAL_NRI_PIO));
        }
      );
      return unsub;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'nriPio');
      return () => {};
    }
  },

  async saveNriPio(item: NriPioMember): Promise<void> {
    const safeId =
      (item.id || `nri-pio-${Date.now()}`)
        .replace(/[^a-zA-Z0-9_-]/g, '')
        .slice(0, 128) || `nri-pio-${Date.now()}`;

    const cleanItem: NriPioMember = {
      id: safeId,
      name: item.name.trim().slice(0, 150),
      photoUrl: item.photoUrl.trim().slice(0, 800000),
      country: item.country.trim().slice(0, 120),
      awarded: item.awarded.trim().slice(0, 200),
      designation: (item.designation || '').trim().slice(0, 200),
      details: item.details.trim().slice(0, 10000),
      createdAt: (item.createdAt || new Date().toISOString()).slice(0, 100)
    };

    try {
      await setDoc(doc(db, 'nriPio', safeId), {
        id: cleanItem.id,
        name: cleanItem.name,
        photoUrl: cleanItem.photoUrl,
        country: cleanItem.country,
        awarded: cleanItem.awarded,
        designation: cleanItem.designation || '',
        details: cleanItem.details,
        createdAt: cleanItem.createdAt,
        updatedAt: serverTimestamp()
      });

      localStorage.setItem(STORAGE_PREFIX + 'nri_pio_initialized', '1');
      const list = getCached<NriPioMember>('nri_pio', []);
      const idx = list.findIndex((i) => i.id === safeId);
      if (idx >= 0) list[idx] = cleanItem;
      else list.unshift(cleanItem);
      setCached('nri_pio', sortNewestFirst(list));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `nriPio/${safeId}`);
    }
  },

  async deleteNriPio(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'nriPio', id));
      localStorage.setItem(STORAGE_PREFIX + 'nri_pio_initialized', '1');
      const list = getCached<NriPioMember>('nri_pio', []).filter((i) => i.id !== id);
      setCached('nri_pio', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `nriPio/${id}`);
    }
  },

  async encodeNriPioPhotoFile(file: File): Promise<string> {
    const rawDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    });

    return new Promise<string>((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const maxDimension = 900;
        const scale = Math.min(
          1,
          maxDimension / Math.max(img.width || 1, img.height || 1)
        );
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(rawDataUrl.slice(0, 750000));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let encoded = canvas.toDataURL('image/webp', 0.85);
        if (encoded.length > 650000) {
          encoded = canvas.toDataURL('image/jpeg', 0.8);
        }
        if (encoded.length > 650000) {
          const smallerScale = Math.min(1, 600 / Math.max(img.width || 1, img.height || 1));
          canvas.width = Math.max(1, Math.round(img.width * smallerScale));
          canvas.height = Math.max(1, Math.round(img.height * smallerScale));
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          encoded = canvas.toDataURL('image/jpeg', 0.76);
        }
        resolve(encoded);
      };
      img.onerror = () => resolve(rawDataUrl.slice(0, 750000));
      img.src = rawDataUrl;
    });
  }
};

