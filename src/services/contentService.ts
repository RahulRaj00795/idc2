import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Achiever, NewsItem, ProjectShowcase, BlogPost, DiasporaEvent } from '../types';
import {
  INITIAL_ACHIEVERS,
  INITIAL_NEWS,
  INITIAL_PROJECTS,
  INITIAL_POSTS,
  INITIAL_EVENTS
} from '../data/initialData';

// Storage keys for offline/fast fallback cache
const STORAGE_PREFIX = 'diaspora_portal_';

function getCached<T>(key: string, fallback: T): T {
  try {
    const val = localStorage.getItem(STORAGE_PREFIX + key);
    if (val) return JSON.parse(val);
  } catch (e) {
    console.error('Local cache read error', e);
  }
  return fallback;
}

function setCached<T>(key: string, data: T) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error('Local cache write error', e);
  }
}

/**
 * Service to manage all Diaspora portal content with Firestore
 */
export const contentService = {
  // --- Seed Data into Firestore ---
  async seedInitialData(): Promise<void> {
    try {
      // Seed Achievers
      for (const item of INITIAL_ACHIEVERS) {
        await setDoc(doc(db, 'achievers', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      // Seed News
      for (const item of INITIAL_NEWS) {
        await setDoc(doc(db, 'news', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      // Seed Projects
      for (const item of INITIAL_PROJECTS) {
        await setDoc(doc(db, 'projects', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      // Seed Posts
      for (const item of INITIAL_POSTS) {
        await setDoc(doc(db, 'posts', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      // Seed Events
      for (const item of INITIAL_EVENTS) {
        await setDoc(doc(db, 'events', item.id), {
          ...item,
          updatedAt: serverTimestamp()
        }, { merge: true });
      }

      console.log('Initial diaspora data successfully seeded into Firestore');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'seed');
    }
  },

  // --- Check if DB is empty and auto-seed if needed ---
  async checkAndAutoSeed(): Promise<void> {
    try {
      const snap = await getDocs(collection(db, 'achievers'));
      if (snap.empty) {
        console.log('No achievers found in Firestore, auto-seeding initial database...');
        await this.seedInitialData();
      }
    } catch (error) {
      console.warn('Auto-seed check encountered non-blocking error:', error);
    }
  },

  // --- Achievers ---
  subscribeAchievers(callback: (achievers: Achiever[]) => void): () => void {
    const cached = getCached<Achiever[]>('achievers', INITIAL_ACHIEVERS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'achievers'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Achiever[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
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
            list.sort((a, b) => (a.order || 99) - (b.order || 99));
            setCached('achievers', list);
            callback(list);
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
    const payload = {
      ...item,
      id,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: serverTimestamp()
    };
    try {
      await setDoc(doc(db, 'achievers', id), payload, { merge: true });
      // update cache
      const list = getCached<Achiever[]>('achievers', INITIAL_ACHIEVERS);
      const idx = list.findIndex(i => i.id === id);
      if (idx >= 0) list[idx] = payload;
      else list.unshift(payload);
      setCached('achievers', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `achievers/${id}`);
    }
  },

  async deleteAchiever(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'achievers', id));
      const list = getCached<Achiever[]>('achievers', INITIAL_ACHIEVERS).filter(i => i.id !== id);
      setCached('achievers', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `achievers/${id}`);
    }
  },

  // --- News ---
  subscribeNews(callback: (news: NewsItem[]) => void): () => void {
    const cached = getCached<NewsItem[]>('news', INITIAL_NEWS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'news'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: NewsItem[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
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
            setCached('news', list);
            callback(list);
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
    const payload = {
      ...item,
      id,
      publishedAt: item.publishedAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: serverTimestamp()
    };
    try {
      await setDoc(doc(db, 'news', id), payload, { merge: true });
      const list = getCached<NewsItem[]>('news', INITIAL_NEWS);
      const idx = list.findIndex(i => i.id === id);
      if (idx >= 0) list[idx] = payload;
      else list.unshift(payload);
      setCached('news', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `news/${id}`);
    }
  },

  async deleteNews(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'news', id));
      const list = getCached<NewsItem[]>('news', INITIAL_NEWS).filter(i => i.id !== id);
      setCached('news', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `news/${id}`);
    }
  },

  // --- Projects ---
  subscribeProjects(callback: (projects: ProjectShowcase[]) => void): () => void {
    const cached = getCached<ProjectShowcase[]>('projects', INITIAL_PROJECTS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'projects'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: ProjectShowcase[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
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
            setCached('projects', list);
            callback(list);
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
    const payload = {
      ...item,
      id,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: serverTimestamp()
    };
    try {
      await setDoc(doc(db, 'projects', id), payload, { merge: true });
      const list = getCached<ProjectShowcase[]>('projects', INITIAL_PROJECTS);
      const idx = list.findIndex(i => i.id === id);
      if (idx >= 0) list[idx] = payload;
      else list.unshift(payload);
      setCached('projects', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `projects/${id}`);
    }
  },

  async deleteProject(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'projects', id));
      const list = getCached<ProjectShowcase[]>('projects', INITIAL_PROJECTS).filter(i => i.id !== id);
      setCached('projects', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  },

  // --- Blog Posts ---
  subscribePosts(callback: (posts: BlogPost[]) => void): () => void {
    const cached = getCached<BlogPost[]>('posts', INITIAL_POSTS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'posts'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: BlogPost[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
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
            setCached('posts', list);
            callback(list);
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
    const payload = {
      ...item,
      id,
      publishedAt: item.publishedAt || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: serverTimestamp()
    };
    try {
      await setDoc(doc(db, 'posts', id), payload, { merge: true });
      const list = getCached<BlogPost[]>('posts', INITIAL_POSTS);
      const idx = list.findIndex(i => i.id === id);
      if (idx >= 0) list[idx] = payload;
      else list.unshift(payload);
      setCached('posts', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `posts/${id}`);
    }
  },

  async deletePost(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'posts', id));
      const list = getCached<BlogPost[]>('posts', INITIAL_POSTS).filter(i => i.id !== id);
      setCached('posts', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    }
  },

  // --- Events ---
  subscribeEvents(callback: (events: DiasporaEvent[]) => void): () => void {
    const cached = getCached<DiasporaEvent[]>('events', INITIAL_EVENTS);
    callback(cached);

    try {
      const unsub = onSnapshot(
        collection(db, 'events'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: DiasporaEvent[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
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
            setCached('events', list);
            callback(list);
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
    const payload = {
      ...item,
      id,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: serverTimestamp()
    };
    try {
      await setDoc(doc(db, 'events', id), payload, { merge: true });
      const list = getCached<DiasporaEvent[]>('events', INITIAL_EVENTS);
      const idx = list.findIndex(i => i.id === id);
      if (idx >= 0) list[idx] = payload;
      else list.unshift(payload);
      setCached('events', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `events/${id}`);
    }
  },

  async deleteEvent(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'events', id));
      const list = getCached<DiasporaEvent[]>('events', INITIAL_EVENTS).filter(i => i.id !== id);
      setCached('events', list);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `events/${id}`);
    }
  }
};
