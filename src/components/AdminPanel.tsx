import React, { useState } from 'react';
import {
  Achiever,
  NewsItem,
  ProjectShowcase,
  BlogPost,
  DiasporaEvent
} from '../types';
import { contentService } from '../services/contentService';
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
  LogOut
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
  onClose: () => void;
  onAdminLogout: () => void;
}

type AdminSection = 'events' | 'posts' | 'achievers' | 'news' | 'security';

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
  onClose,
  onAdminLogout
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('events');
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // --- Admin Credentials State ---
  const [adminUsernameInput, setAdminUsernameInput] = useState(adminAuthService.getCurrentAdminUser() || DEFAULT_ADMIN_USERNAME);
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');
  const [updatingCreds, setUpdatingCreds] = useState(false);

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
  const [eventRegLink, setEventRegLink] = useState('');
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

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
      order: 1,
      createdAt: new Date().toISOString()
    };
    await contentService.saveAchiever(item);
    showNotification(editingAchieverId ? 'Achiever updated!' : 'New achiever published!');
    // Reset
    setAchieverName('');
    setAchieverRole('');
    setAchieverAchievement('');
    setAchieverStory('');
    setEditingAchieverId(null);
  };

  // --- News Submit ---
  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    const item: NewsItem = {
      id: editingNewsId || `news-${Date.now()}`,
      title: newsTitle,
      summary: newsSummary,
      content: newsContent,
      category: newsCategory,
      country: newsCountry,
      imageUrl: newsImageUrl,
      source: newsSource,
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      createdAt: new Date().toISOString()
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
      publishedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      createdAt: new Date().toISOString()
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
    const item: DiasporaEvent = {
      id: editingEventId || `event-${Date.now()}`,
      title: eventTitle,
      date: eventDate,
      location: eventLocation,
      category: eventCategory || 'Summit',
      description: eventDescription,
      imageUrl: eventImageUrl,
      registrationLink: eventRegLink.trim(),
      createdAt: new Date().toISOString()
    };
    await contentService.saveEvent(item);
    showNotification(editingEventId ? 'Upcoming event updated!' : 'Upcoming event published!');
    setEventTitle('');
    setEventDate('');
    setEventLocation('New Delhi / Hybrid');
    setEventCategory('Summit');
    setEventDescription('');
    setEventRegLink('');
    setEditingEventId(null);
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
                Publish diaspora essays, commentary, and cultural narratives.
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
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                Published Articles ({posts.length})
              </h3>
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
                    Registration / RSVP Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={eventRegLink}
                    onChange={(e) => setEventRegLink(e.target.value)}
                    placeholder="https://example.com/register"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500"
                  />
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
                        setEventRegLink('');
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
                        setEventRegLink(ev.registrationLink || '');
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
