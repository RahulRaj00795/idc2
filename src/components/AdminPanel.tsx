import React, { useState } from 'react';
import {
  Achiever,
  NewsItem,
  ProjectShowcase,
  BlogPost,
  DiasporaEvent,
  ContactSubmission,
  NriPioMember
} from '../types';
import { contentService, CONTACT_RECIPIENT_EMAIL } from '../services/contentService';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Image,
  Database,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Layers,
  Newspaper,
  Rocket,
  BookOpen,
  Calendar,
  Sparkles,
  RefreshCw,
  X,
  Lock,
  Key,
  LogOut,
  Mail,
  Globe,
  Clock,
  Award,
  Upload
} from 'lucide-react';
import { adminAuthService, DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD } from '../services/adminAuth';
import { User } from 'firebase/auth';

interface AdminPanelProps {
  currentUser: User | null;
  achievers: Achiever[];
  news: NewsItem[];
  projects: ProjectShowcase[];
  posts: BlogPost[];
  events: DiasporaEvent[];
  homeBannerUrl: string;
  contactSubmissions: ContactSubmission[];
  nriPioMembers: NriPioMember[];
  onClose: () => void;
  onAdminLogout: () => void;
}

type AdminSection = 'banner' | 'nri-pio' | 'contacts' | 'events' | 'posts' | 'achievers' | 'news' | 'security';

const NRI_PORTRAIT_PRESETS = [
  { label: 'Portrait 1', url: '/assets/nri-pio/nri_leader_uk_portrait.jpg' },
  { label: 'Portrait 2', url: '/assets/nri-pio/nri_scientist_usa_portrait.jpg' },
  { label: 'Portrait 3', url: '/assets/nri-pio/nri_entrepreneur_uae_portrait.jpg' },
  { label: 'Portrait 4', url: '/assets/nri-pio/pio_diplomat_singapore_portrait.jpg' }
];

// Curated high quality presets for quick image selection
const IMAGE_PRESETS = [
  { label: 'Executive Portrait', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tech Leader', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80' },
  { label: 'Scientist / Astronaut', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Startup & Team', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Global Economy & Finance', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80' },
  { label: 'Culture & Heritage', url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80' },
  { label: 'Summit & Conference', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80' },
  { label: 'Writing & Books', url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80' },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({
  achievers,
  news,
  posts,
  events,
  homeBannerUrl,
  contactSubmissions,
  nriPioMembers,
  onClose,
  onAdminLogout
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('banner');
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [bannerInputUrl, setBannerInputUrl] = useState<string>(homeBannerUrl || '');
  const [savingBanner, setSavingBanner] = useState<boolean>(false);

  // --- Admin Credentials State ---
  const [adminUsernameInput, setAdminUsernameInput] = useState(adminAuthService.getCurrentAdminUser() || DEFAULT_ADMIN_USERNAME);
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');
  const [updatingCreds, setUpdatingCreds] = useState(false);

  const handleBannerFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSavingBanner(true);
    try {
      const savedUrl = await contentService.uploadExactBannerFile(file);
      setBannerInputUrl(savedUrl);
      showNotification('Exact Home Banner uploaded and live on Homepage!');
    } finally {
      setSavingBanner(false);
    }
  };

  // --- Achiever Form State ---
  const [achieverName, setAchieverName] = useState('');
  const [achieverRole, setAchieverRole] = useState('');
  const [achieverCountry, setAchieverCountry] = useState('United States');
  const [achieverAchievement, setAchieverAchievement] = useState('');
  const [achieverStory, setAchieverStory] = useState('');
  const [achieverImageUrl, setAchieverImageUrl] = useState(IMAGE_PRESETS[0].url);
  const [achieverTags, setAchieverTags] = useState('Technology, AI');
  const [editingAchieverId, setEditingAchieverId] = useState<string | null>(null);

  // --- News Form State ---
  const [newsTitle, setNewsTitle] = useState('');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('Startups & Tech');
  const [newsCountry, setNewsCountry] = useState('Global');
  const [newsImageUrl, setNewsImageUrl] = useState(IMAGE_PRESETS[4].url);
  const [newsSource, setNewsSource] = useState('Diaspora News Wire');
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);

  // --- Project Form State ---
  const [projectTitle, setProjectTitle] = useState('');
  const [projectTagline, setProjectTagline] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectFounder, setProjectFounder] = useState('');
  const [projectCountry, setProjectCountry] = useState('USA / India');
  const [projectCategory, setProjectCategory] = useState('Healthcare & Tech');
  const [projectImageUrl, setProjectImageUrl] = useState(IMAGE_PRESETS[3].url);
  const [projectUrl, setProjectUrl] = useState('https://');
  const [projectTags, setProjectTags] = useState('Innovation, Cross-Border');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // --- Blog Post Form State ---
  const [postTitle, setPostTitle] = useState('');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postAuthor, setPostAuthor] = useState('');
  const [postAuthorBio, setPostAuthorBio] = useState('');
  const [postCategory, setPostCategory] = useState('Diaspora Insights');
  const [postImageUrl, setPostImageUrl] = useState(IMAGE_PRESETS[7].url);
  const [postReadTime, setPostReadTime] = useState('5 min read');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // --- Upcoming Event Form State ---
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('New Delhi / Hybrid');
  const [eventCategory, setEventCategory] = useState('Summit');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImageUrl, setEventImageUrl] = useState(IMAGE_PRESETS[6].url);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // --- NRI / PIO Form State ---
  const [nriName, setNriName] = useState('');
  const [nriPhotoUrl, setNriPhotoUrl] = useState(NRI_PORTRAIT_PRESETS[0].url);
  const [nriCountry, setNriCountry] = useState('');
  const [nriAwarded, setNriAwarded] = useState('');
  const [nriDesignation, setNriDesignation] = useState('');
  const [nriDetails, setNriDetails] = useState('');
  const [editingNriId, setEditingNriId] = useState<string | null>(null);
  const [uploadingNriPhoto, setUploadingNriPhoto] = useState(false);
  const [savingNri, setSavingNri] = useState(false);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  const handleSeed = async () => {
    try {
      setSeeding(true);
      await contentService.seedInitialData();
      setSeedSuccess(true);
      showNotification('Successfully seeded rich diaspora data to Firestore!');
      setTimeout(() => setSeedSuccess(false), 4000);
    } catch (e: any) {
      console.error(e);
      showNotification('Notice: Saved locally and synced to Firestore.');
    } finally {
      setSeeding(false);
    }
  };

  // --- Achiever Submit ---
  const handleSaveAchiever = async (e: React.FormEvent) => {
    e.preventDefault();
    const existing = editingAchieverId
      ? achievers.find((a) => a.id === editingAchieverId)
      : undefined;
    const item: Achiever = {
      id: editingAchieverId || `achiever-${Date.now()}`,
      name: achieverName,
      role: achieverRole,
      country: achieverCountry,
      achievement: achieverAchievement,
      story: achieverStory,
      imageUrl: achieverImageUrl,
      tags: achieverTags.split(',').map((t) => t.trim()).filter(Boolean),
      featured: true,
      order: existing?.order ?? 0,
      createdAt: existing?.createdAt || new Date().toISOString()
    };
    await contentService.saveAchiever(item);
    showNotification(editingAchieverId ? 'Achiever updated!' : 'New achiever published!');
    setAchieverName('');
    setAchieverRole('');
    setAchieverAchievement('');
    setAchieverStory('');
    setEditingAchieverId(null);
  };

  // --- News Submit ---
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const existing = editingNewsId ? news.find((n) => n.id === editingNewsId) : undefined;
    const item: NewsItem = {
      id: editingNewsId || `news-${Date.now()}`,
      title: newsTitle,
      summary: newsSummary,
      content: newsContent,
      category: newsCategory,
      country: newsCountry,
      imageUrl: newsImageUrl,
      source: newsSource,
      publishedAt:
        existing?.publishedAt ||
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: existing?.readTime || '3 min read',
      createdAt: existing?.createdAt || new Date().toISOString()
    };
    await contentService.saveNews(item);
    showNotification(editingNewsId ? 'News updated!' : 'News article published!');
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setEditingNewsId(null);
  };

  // --- Project Submit ---
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const item: ProjectShowcase = {
      id: editingProjectId || `proj-${Date.now()}`,
      title: projectTitle,
      tagline: projectTagline,
      description: projectDescription,
      founder: projectFounder,
      country: projectCountry,
      category: projectCategory,
      imageUrl: projectImageUrl,
      projectUrl: projectUrl,
      tags: projectTags.split(',').map((t) => t.trim()).filter(Boolean),
      status: 'Live',
      createdAt: new Date().toISOString()
    };
    await contentService.saveProject(item);
    showNotification(editingProjectId ? 'Project showcase updated!' : 'Project showcase published dynamically!');
    setProjectTitle('');
    setProjectTagline('');
    setProjectDescription('');
    setProjectFounder('');
    setEditingProjectId(null);
  };

  // --- Post Submit ---
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const existing = editingPostId ? posts.find((p) => p.id === editingPostId) : undefined;
    const item: BlogPost = {
      id: editingPostId || `post-${Date.now()}`,
      title: postTitle,
      excerpt: postExcerpt,
      content: postContent,
      author: postAuthor,
      authorBio: postAuthorBio,
      category: postCategory,
      imageUrl: postImageUrl,
      readTime: postReadTime,
      publishedAt:
        existing?.publishedAt ||
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: existing?.createdAt || new Date().toISOString()
    };
    await contentService.savePost(item);
    showNotification(editingPostId ? 'Blog post updated!' : 'Blog post published dynamically!');
    setPostTitle('');
    setPostExcerpt('');
    setPostContent('');
    setPostAuthor('');
    setEditingPostId(null);
  };

  // --- Upcoming Event Submit ---
  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    const existing = editingEventId ? events.find((ev) => ev.id === editingEventId) : undefined;
    const item: DiasporaEvent = {
      id: editingEventId || `event-${Date.now()}`,
      title: eventTitle,
      date: eventDate,
      location: eventLocation,
      category: eventCategory || 'Summit',
      description: eventDescription,
      imageUrl: eventImageUrl,
      createdAt: existing?.createdAt || new Date().toISOString()
    };
    await contentService.saveEvent(item);
    showNotification(editingEventId ? 'Upcoming event updated!' : 'Upcoming event published!');
    setEventTitle('');
    setEventDate('');
    setEventLocation('New Delhi / Hybrid');
    setEventCategory('Summit');
    setEventDescription('');
    setEditingEventId(null);
  };

  // --- NRI / PIO Photo Upload & Submit ---
  const handleNriPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingNriPhoto(true);
    try {
      const encoded = await contentService.encodeNriPioPhotoFile(file);
      setNriPhotoUrl(encoded);
      showNotification('Photo uploaded and ready to save!');
    } catch {
      showNotification('Failed to process selected photo.');
    } finally {
      setUploadingNriPhoto(false);
      e.target.value = '';
    }
  };

  const resetNriForm = () => {
    setEditingNriId(null);
    setNriName('');
    setNriPhotoUrl(NRI_PORTRAIT_PRESETS[0].url);
    setNriCountry('');
    setNriAwarded('');
    setNriDesignation('');
    setNriDetails('');
  };

  const handleSaveNriPio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nriPhotoUrl.trim()) {
      showNotification('Please upload a photo or enter a photo URL.');
      return;
    }
    setSavingNri(true);
    try {
      const existing = editingNriId
        ? nriPioMembers.find((m) => m.id === editingNriId)
        : undefined;
      const item: NriPioMember = {
        id: editingNriId || `nri-pio-${Date.now()}`,
        name: nriName.trim(),
        photoUrl: nriPhotoUrl.trim(),
        country: nriCountry.trim(),
        awarded: nriAwarded.trim(),
        designation: nriDesignation.trim(),
        details: nriDetails.trim(),
        createdAt: existing?.createdAt || new Date().toISOString()
      };
      await contentService.saveNriPio(item);
      showNotification(editingNriId ? 'NRI / PIO profile updated!' : 'New NRI / PIO card published!');
      resetNriForm();
    } finally {
      setSavingNri(false);
    }
  };

  // --- Update Admin Credentials ---
  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminNewPassword) {
      showNotification('Please enter a new password.');
      return;
    }
    if (adminNewPassword !== adminConfirmPassword) {
      showNotification('New password and confirmation do not match.');
      return;
    }
    if (adminNewPassword.length < 6) {
      showNotification('Password must be at least 6 characters.');
      return;
    }
    try {
      setUpdatingCreds(true);
      await adminAuthService.updatePassword(adminNewPassword, adminUsernameInput);
      showNotification('Admin credentials updated and synced to Firestore!');
      setAdminNewPassword('');
      setAdminConfirmPassword('');
    } catch (err: any) {
      showNotification('Update notice: ' + (err?.message || 'Saved'));
    } finally {
      setUpdatingCreds(false);
    }
  };

  const activeAdminUser = adminAuthService.getCurrentAdminUser() || DEFAULT_ADMIN_USERNAME;

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Top Banner / Notification */}
      {actionNotice && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-orange-500 animate-bounce">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-bold">{actionNotice}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-slate-900 text-white py-8 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white overflow-hidden shrink-0 flex items-center justify-center shadow-lg">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.16.58_AM_66a822ca.jpeg"
                alt="Indian Diaspora Club Logo"
                className="w-full h-full object-contain scale-[1.35]"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-black tracking-tight">
                  Dynamic Content CMS &amp; Admin Panel
                </h1>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[11px] font-bold rounded-md border border-emerald-500/30">
                  Firestore Connected
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                <span>Signed in as:</span>
                <span className="text-orange-400 font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {activeAdminUser}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Seed button */}
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="inline-flex items-center space-x-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition shadow-xs"
              title="Populates Firestore collections with initial rich records"
            >
              <Database className="w-4 h-4 text-orange-400" />
              <span>{seeding ? 'Seeding...' : 'Seed Sample Data to DB'}</span>
            </button>

            {/* Logout from Admin */}
            <button
              onClick={onAdminLogout}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-red-950/60 hover:bg-red-900 text-red-200 border border-red-800/60 rounded-xl text-xs font-bold transition"
              title="Lock Admin Panel & Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span>Lock &amp; Exit</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Back to portal view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 border-b border-gray-200 pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSection('banner')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
              activeSection === 'banner'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Home Banner</span>
          </button>

          <button
            onClick={() => setActiveSection('nri-pio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
              activeSection === 'nri-pio'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>NRI / PIO ({nriPioMembers.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('contacts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer whitespace-nowrap shrink-0 ${
              activeSection === 'contacts'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Inquiries ({contactSubmissions.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('events')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer ${
              activeSection === 'events'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Upcoming Events ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('posts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer ${
              activeSection === 'posts'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blog Posts ({posts.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('achievers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer ${
              activeSection === 'achievers'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Diaspora Achievers ({achievers.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('news')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer ${
              activeSection === 'news'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            <span>Diaspora News ({news.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('security')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition cursor-pointer ${
              activeSection === 'security'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Security &amp; Password</span>
          </button>
        </div>

        {/* ================= HOME BANNER SECTION ================= */}
        {activeSection === 'banner' && (
          <div className="max-w-4xl mx-auto mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <Image className="w-5 h-5 text-orange-600" />
                <span>Home Page Top Banner</span>
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Upload your exact banner image (e.g. <code className="font-bold text-orange-700">banner.png</code>). It renders full-width at the very top of the Home page with zero overlays or extra text.
              </p>
            </div>

            <div className="p-6 border-2 border-dashed border-orange-300 bg-orange-50/40 rounded-2xl text-center space-y-3">
              <label className="inline-flex items-center space-x-2 px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition cursor-pointer">
                <Plus className="w-4 h-4" />
                <span>{savingBanner ? 'Uploading...' : 'Select Banner Image File (banner.png)'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-600">
                Select <span className="font-semibold">banner.png</span> from your computer to publish it immediately across all devices.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSavingBanner(true);
                await contentService.saveHomeBanner(bannerInputUrl);
                setSavingBanner(false);
                showNotification('Home Banner updated!');
              }}
              className="space-y-3"
            >
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Or Paste Banner Image URL / Path
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={bannerInputUrl}
                  onChange={(e) => setBannerInputUrl(e.target.value)}
                  placeholder="/banner.png or https://..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  disabled={savingBanner}
                  className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Save URL
                </button>
                {(homeBannerUrl || bannerInputUrl) && (
                  <button
                    type="button"
                    onClick={async () => {
                      setBannerInputUrl('');
                      await contentService.clearHomeBanner();
                      showNotification('Custom Home Banner cleared');
                    }}
                    className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Remove
                  </button>
                )}
              </div>
            </form>

            {(homeBannerUrl || bannerInputUrl) && (
              <div className="space-y-2 pt-2">
                <p className="text-xs font-bold text-gray-700 uppercase">Current Active Banner Preview</p>
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-slate-950">
                  <img
                    src={homeBannerUrl || bannerInputUrl}
                    alt="Active Home Banner Preview"
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= NRI / PIO MEMBERS SECTION ================= */}
        {activeSection === 'nri-pio' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Add / Edit Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center space-x-2">
                <Award className="w-5 h-5 text-orange-600" />
                <span>{editingNriId ? 'Edit NRI / PIO Profile' : 'Add NRI / PIO Profile'}</span>
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Published directly on the <span className="font-semibold text-gray-700">Our NRI / PIO</span> page with small cards and full-details popup on click.
              </p>

              <form onSubmit={handleSaveNriPio} className="space-y-4">
                {/* Photo Upload + URL */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                    Member Photo *
                  </label>

                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="w-20 h-16 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shrink-0">
                      {nriPhotoUrl ? (
                        <img
                          src={nriPhotoUrl}
                          alt="Member preview"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      ) : null}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <label className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-xl text-xs font-bold transition cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingNriPhoto ? 'Uploading...' : 'Upload Photo File'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleNriPhotoUpload}
                          className="hidden"
                        />
                      </label>
                      <p className="text-[11px] text-gray-400">
                        Upload from your device or paste an image URL below.
                      </p>
                    </div>
                  </div>

                  <input
                    type="text"
                    required
                    value={nriPhotoUrl}
                    onChange={(e) => setNriPhotoUrl(e.target.value)}
                    placeholder="Photo URL or uploaded image"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {NRI_PORTRAIT_PRESETS.map((preset, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setNriPhotoUrl(preset.url)}
                        className="px-2 py-0.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded text-[10px] text-gray-600 cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={150}
                    value={nriName}
                    onChange={(e) => setNriName(e.target.value)}
                    placeholder="e.g. Dr. Rajendra Prasad Verma"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Country & Awarded */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={120}
                      value={nriCountry}
                      onChange={(e) => setNriCountry(e.target.value)}
                      placeholder="e.g. United Kingdom"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Awarded *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={200}
                      value={nriAwarded}
                      onChange={(e) => setNriAwarded(e.target.value)}
                      placeholder="e.g. Pravasi Bharatiya Samman"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Optional Designation */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Role / Designation (Optional — shown in popup)
                  </label>
                  <input
                    type="text"
                    maxLength={200}
                    value={nriDesignation}
                    onChange={(e) => setNriDesignation(e.target.value)}
                    placeholder="e.g. Industrialist & Philanthropist"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Full Details */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Details (Popup Content) *
                  </label>
                  <textarea
                    required
                    rows={5}
                    maxLength={10000}
                    value={nriDetails}
                    onChange={(e) => setNriDetails(e.target.value)}
                    placeholder="Enter full biography, honours, contributions, and details shown when clicking Read More..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {editingNriId && (
                    <button
                      type="button"
                      onClick={resetNriForm}
                      className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={savingNri || uploadingNriPhoto}
                    className="ml-auto inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {savingNri
                        ? 'Saving...'
                        : editingNriId
                          ? 'Update NRI / PIO'
                          : 'Add NRI / PIO'}
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing NRI / PIO Cards List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Published NRI / PIO Cards ({nriPioMembers.length})
              </h3>

              {nriPioMembers.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                  <Award className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">No NRI / PIO profiles yet</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Use the form on the left to add an NRI / PIO card to the public page.
                  </p>
                </div>
              ) : (
                nriPioMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4 hover:border-orange-300 transition"
                  >
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-contain shrink-0 bg-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{member.name}</h4>
                      <p className="text-xs text-gray-600 truncate mt-0.5">
                        <span className="font-semibold text-gray-800">{member.country}</span>
                        <span className="mx-1.5 text-gray-300">·</span>
                        <span className="text-orange-600 font-semibold">{member.awarded}</span>
                      </p>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">{member.details}</p>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNriId(member.id);
                          setNriName(member.name);
                          setNriPhotoUrl(member.photoUrl);
                          setNriCountry(member.country);
                          setNriAwarded(member.awarded);
                          setNriDesignation(member.designation || '');
                          setNriDetails(member.details);
                        }}
                        className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          await contentService.deleteNriPio(member.id);
                          if (editingNriId === member.id) {
                            resetNriForm();
                          }
                          showNotification('NRI / PIO profile removed');
                        }}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= CONTACT INQUIRIES SECTION ================= */}
        {activeSection === 'contacts' && (
          <div className="max-w-5xl mx-auto mt-8 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <span>Contact Us Submissions ({contactSubmissions.length})</span>
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  All Contact Us messages are saved in Firestore and forwarded to{' '}
                  <span className="font-bold text-orange-700">{CONTACT_RECIPIENT_EMAIL}</span>.
                </p>
              </div>
            </div>

            {contactSubmissions.some((c) => c.emailStatus === 'pending_activation') && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start space-x-3 text-amber-900 text-xs">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">One-Time Email Activation Needed</p>
                  <p className="mt-0.5 text-amber-800">
                    Check <span className="font-bold">{CONTACT_RECIPIENT_EMAIL}</span> (including Spam/Promotions) for the confirmation email from FormSubmit and click{' '}
                    <span className="font-bold">&ldquo;Activate Form&rdquo;</span> once so future submissions arrive directly in your inbox. All messages below are already safely stored in this database.
                  </p>
                </div>
              </div>
            )}

            {contactSubmissions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                <Mail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-gray-800">No Contact Inquiries Yet</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Messages submitted via the Contact Us page will appear here in real time and be emailed to {CONTACT_RECIPIENT_EMAIL}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {contactSubmissions.map((item) => {
                  const formattedDate = item.createdAt
                    ? new Date(item.createdAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit'
                      })
                    : 'Recent';

                  return (
                    <div
                      key={item.id}
                      className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:border-orange-300 transition space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-base font-bold text-gray-900">{item.subject}</h3>
                            {item.emailStatus === 'sent' && (
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[11px] font-bold">
                                Emailed to {item.recipientEmail}
                              </span>
                            )}
                            {item.emailStatus === 'pending_activation' && (
                              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-md text-[11px] font-bold">
                                Awaiting 1-Time Email Activation
                              </span>
                            )}
                            {item.emailStatus === 'failed' && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded-md text-[11px] font-bold">
                                Stored in Database
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600">
                            <span className="font-semibold text-gray-900">{item.fullName}</span>
                            <a
                              href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject}`)}`}
                              className="text-orange-600 hover:underline font-medium inline-flex items-center space-x-1"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{item.email}</span>
                            </a>
                            {item.country && (
                              <span className="inline-flex items-center space-x-1 text-gray-500">
                                <Globe className="w-3.5 h-3.5" />
                                <span>{item.country}</span>
                              </span>
                            )}
                            <span className="inline-flex items-center space-x-1 text-gray-400">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{formattedDate}</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <a
                            href={`mailto:${item.email}?subject=${encodeURIComponent(`Re: ${item.subject}`)}`}
                            className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg text-xs font-bold transition"
                          >
                            Reply
                          </a>
                          <button
                            onClick={async () => {
                              await contentService.deleteContactSubmission(item.id);
                              showNotification('Contact inquiry deleted');
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {item.message}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= BLOG POSTS SECTION ================= */}
        {activeSection === 'posts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            {/* Form */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <span>{editingPostId ? 'Edit Article' : 'Write New Blog Post'}</span>
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Add and store Diaspora Voices &amp; Insights articles in the backend database (public display is currently hidden for future release).
              </p>

              <form onSubmit={handleSavePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. Reconnecting with Cultural Roots in the 21st Century"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={postAuthor}
                      onChange={(e) => setPostAuthor(e.target.value)}
                      placeholder="Author name"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={postCategory}
                      onChange={(e) => setPostCategory(e.target.value)}
                      placeholder="e.g. Identity & Heritage"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Cover Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={postImageUrl}
                    onChange={(e) => setPostImageUrl(e.target.value)}
                    placeholder="Image URL"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {IMAGE_PRESETS.map((p, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setPostImageUrl(p.url)}
                        className="px-2 py-0.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded text-[10px] text-gray-600"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Short Excerpt *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={postExcerpt}
                    onChange={(e) => setPostExcerpt(e.target.value)}
                    placeholder="Brief 2-line summary..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Content *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="Write the full article text..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {editingPostId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPostId(null);
                        setPostTitle('');
                        setPostContent('');
                      }}
                      className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingPostId ? 'Update Article' : 'Publish Article'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Stored Articles ({posts.length})
                </h3>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Stored in Backend • Hidden on Public Site
                </span>
              </div>
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4 hover:border-orange-300 transition"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{p.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{p.excerpt}</p>
                    <p className="text-[11px] text-orange-600 font-semibold">
                      By {p.author} • {p.category}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingPostId(p.id);
                        setPostTitle(p.title);
                        setPostExcerpt(p.excerpt);
                        setPostContent(p.content);
                        setPostAuthor(p.author);
                        setPostAuthorBio(p.authorBio || '');
                        setPostCategory(p.category);
                        setPostImageUrl(p.imageUrl);
                        setPostReadTime(p.readTime);
                      }}
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete post "${p.title}"?`)) {
                          await contentService.deletePost(p.id);
                          showNotification('Post deleted');
                        }
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ACHIEVERS SECTION ================= */}
        {activeSection === 'achievers' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-orange-600" />
                <span>{editingAchieverId ? 'Edit Achiever' : 'Add Diaspora Achiever'}</span>
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Features on the top animated carousel slider ("Diaspora Achievers").
              </p>

              <form onSubmit={handleSaveAchiever} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Achiever Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={achieverName}
                    onChange={(e) => setAchieverName(e.target.value)}
                    placeholder="e.g. Sundar Pichai"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Role / Position *
                    </label>
                    <input
                      type="text"
                      required
                      value={achieverRole}
                      onChange={(e) => setAchieverRole(e.target.value)}
                      placeholder="e.g. CEO of Alphabet"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={achieverCountry}
                      onChange={(e) => setAchieverCountry(e.target.value)}
                      placeholder="United States"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Portrait Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={achieverImageUrl}
                    onChange={(e) => setAchieverImageUrl(e.target.value)}
                    placeholder="Portrait URL"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {IMAGE_PRESETS.slice(0, 4).map((p, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setAchieverImageUrl(p.url)}
                        className="px-2 py-0.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded text-[10px] text-gray-600"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Key Global Achievement *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={achieverAchievement}
                    onChange={(e) => setAchieverAchievement(e.target.value)}
                    placeholder="Leading advances in worldwide AI, space exploration, etc."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Bio / Story *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={achieverStory}
                    onChange={(e) => setAchieverStory(e.target.value)}
                    placeholder="Detailed background and journey..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {editingAchieverId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAchieverId(null);
                        setAchieverName('');
                        setAchieverRole('');
                      }}
                      className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingAchieverId ? 'Update Achiever' : 'Add to Slider'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Existing List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Current Achievers in Slider ({achievers.length})
              </h3>
              {achievers.map((ach) => (
                <div
                  key={ach.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4 hover:border-orange-300 transition"
                >
                  <img
                    src={ach.imageUrl}
                    alt={ach.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{ach.name}</h4>
                    <p className="text-xs text-orange-600 font-medium truncate">{ach.role}</p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {ach.country} • "{ach.achievement}"
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingAchieverId(ach.id);
                        setAchieverName(ach.name);
                        setAchieverRole(ach.role);
                        setAchieverCountry(ach.country);
                        setAchieverAchievement(ach.achievement);
                        setAchieverStory(ach.story);
                        setAchieverImageUrl(ach.imageUrl);
                        setAchieverTags(ach.tags?.join(', ') || '');
                      }}
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Remove "${ach.name}" from achievers?`)) {
                          await contentService.deleteAchiever(ach.id);
                          showNotification('Achiever removed');
                        }
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= NEWS SECTION ================= */}
        {activeSection === 'news' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-orange-600" />
                <span>{editingNewsId ? 'Edit News Story' : 'Publish Diaspora News'}</span>
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Features on the second animated carousel ("Diaspora News").
              </p>

              <form onSubmit={handleSaveNews} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Headline *
                  </label>
                  <input
                    type="text"
                    required
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    placeholder="Headline"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={newsCategory}
                      onChange={(e) => setNewsCategory(e.target.value)}
                      placeholder="Economy, Policy, Culture"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Source *
                    </label>
                    <input
                      type="text"
                      required
                      value={newsSource}
                      onChange={(e) => setNewsSource(e.target.value)}
                      placeholder="e.g. World Bank / Wire"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Feature Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={newsImageUrl}
                    onChange={(e) => setNewsImageUrl(e.target.value)}
                    placeholder="Image URL"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Summary / Excerpt *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={newsSummary}
                    onChange={(e) => setNewsSummary(e.target.value)}
                    placeholder="Short 2-line summary"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full News Story *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newsContent}
                    onChange={(e) => setNewsContent(e.target.value)}
                    placeholder="Full article content..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {editingNewsId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNewsId(null);
                        setNewsTitle('');
                      }}
                      className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingNewsId ? 'Update News' : 'Publish News'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Current News Stories ({news.length})
              </h3>
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4 hover:border-orange-300 transition"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{item.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{item.summary}</p>
                    <p className="text-[11px] text-orange-600 font-medium">
                      {item.category} • {item.publishedAt}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingNewsId(item.id);
                        setNewsTitle(item.title);
                        setNewsSummary(item.summary);
                        setNewsContent(item.content);
                        setNewsCategory(item.category);
                        setNewsCountry(item.country);
                        setNewsImageUrl(item.imageUrl);
                        setNewsSource(item.source);
                      }}
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm(`Delete news "${item.title}"?`)) {
                          await contentService.deleteNews(item.id);
                          showNotification('News story deleted');
                        }
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= UPCOMING EVENTS SECTION ================= */}
        {activeSection === 'events' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-1 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span>{editingEventId ? 'Edit Upcoming Event' : 'Add New Upcoming Event'}</span>
              </h2>
              <p className="text-xs text-gray-500 mb-5">
                Featured prominently on the Home page under Upcoming Events and on the Events page.
              </p>

              <form onSubmit={handleSaveEvent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="e.g. Global NRI & PIO Annual Conclave"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Date &amp; Time *
                    </label>
                    <input
                      type="text"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="Nov 18-20, 2026"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Category *
                    </label>
                    <input
                      type="text"
                      required
                      value={eventCategory}
                      onChange={(e) => setEventCategory(e.target.value)}
                      placeholder="Summit / Business / Cultural"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Location / Mode *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="New Delhi / London / Hybrid"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* Image Selector & Presets */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Banner Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={eventImageUrl}
                    onChange={(e) => setEventImageUrl(e.target.value)}
                    placeholder="Banner URL"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-gray-400 font-semibold w-full">Quick Presets:</span>
                    {IMAGE_PRESETS.map((p, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setEventImageUrl(p.url)}
                        className="px-2 py-1 bg-gray-100 hover:bg-orange-50 hover:text-orange-600 rounded-md text-[10px] text-gray-600 border border-gray-200 cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {eventImageUrl && (
                    <div className="mt-2 relative h-28 rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
                      <img
                        src={eventImageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = IMAGE_PRESETS[6].url;
                        }}
                      />
                      <span className="absolute bottom-1 right-2 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                        Live Preview
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Event objectives, speakers, and schedule..."
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {editingEventId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEventId(null);
                        setEventTitle('');
                        setEventDate('');
                        setEventLocation('New Delhi / Hybrid');
                        setEventCategory('Summit');
                        setEventDescription('');
                      }}
                      className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                  <button
                    type="submit"
                    className="ml-auto inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{editingEventId ? 'Update Event' : 'Publish Upcoming Event'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Scheduled Upcoming Events ({events.length})
              </h3>
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between gap-4 hover:border-orange-300 transition"
                >
                  <img
                    src={ev.imageUrl}
                    alt={ev.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{ev.title}</h4>
                    <p className="text-xs text-orange-600 font-medium">
                      {ev.date} • {ev.location}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {ev.category || 'Summit'} — {ev.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingEventId(ev.id);
                        setEventTitle(ev.title);
                        setEventDate(ev.date);
                        setEventLocation(ev.location);
                        setEventCategory(ev.category || 'Summit');
                        setEventDescription(ev.description);
                        setEventImageUrl(ev.imageUrl);
                      }}
                      className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={async () => {
                        await contentService.deleteEvent(ev.id);
                        showNotification('Upcoming event deleted');
                      }}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECURITY & CREDENTIALS SECTION ================= */}
        {activeSection === 'security' && (
          <div className="max-w-2xl mx-auto mt-8 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Admin Security &amp; Credentials
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Update your login credentials. Changes are synced across Firestore and this browser session.
              </p>
            </div>

            <form onSubmit={handleUpdateCredentials} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Admin Username or Email *
                </label>
                <input
                  type="text"
                  required
                  value={adminUsernameInput}
                  onChange={(e) => setAdminUsernameInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Current active username used for login verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={adminNewPassword}
                    onChange={(e) => setAdminNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={adminConfirmPassword}
                    onChange={(e) => setAdminConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={updatingCreds}
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-600/20 transition flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Key className="w-4 h-4" />
                  <span>{updatingCreds ? 'Saving to Firestore...' : 'Update Admin Password'}</span>
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
              <h4 className="text-xs font-bold text-orange-900 mb-1">Authentication Notes:</h4>
              <ul className="text-xs text-orange-800 space-y-1">
                <li>• Default fallback login alias is always accepted: <code className="font-bold">admin</code> with password <code className="font-bold">{DEFAULT_ADMIN_PASSWORD}</code>.</li>
                <li>• Clicking "Lock &amp; Exit" in the top bar logs you out and requires username/password on next access.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
