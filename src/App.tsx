/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, MagazineEditionId, Achiever, NewsItem, ProjectShowcase, BlogPost, DiasporaEvent } from './types';
import { Navbar } from './components/Navbar';
import { HomeIdcIntro } from './components/HomeIdcIntro';
import { AchieversSlider } from './components/AchieversSlider';
import { NewsSlider } from './components/NewsSlider';
import { UpcomingEventsShowcase } from './components/UpcomingEventsShowcase';
import { BlogSection } from './components/BlogSection';
import { AboutUs } from './components/AboutUs';
import { NriPioHub } from './components/NriPioHub';
import { EventsSection } from './components/EventsSection';
import { MagazineSection } from './components/MagazineSection';
import { PublishContact } from './components/PublishContact';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { contentService } from './services/contentService';
import { adminAuthService, DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD, DEFAULT_ADMIN_ALIAS } from './services/adminAuth';
import { auth, onAuthStateChanged, User } from './firebase';
import { Lock, Shield, ArrowLeft, Key, User as UserIcon, Eye, EyeOff, AlertCircle } from 'lucide-react';

function isRouteAdmin(pathname: string, search: string, hash: string): boolean {
  return (
    pathname.toLowerCase().includes('admin') ||
    search.toLowerCase().includes('admin') ||
    hash.toLowerCase().includes('admin')
  );
}

export default function App() {
  // Routing state based on browser URL (path, search query, or hash)
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);
  const [currentSearch, setCurrentSearch] = useState<string>(() => window.location.search);
  const [currentHash, setCurrentHash] = useState<string>(() => window.location.hash);
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedMagazineId, setSelectedMagazineId] = useState<MagazineEditionId>('uniting-indian-diaspora');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Admin Username & Password Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return adminAuthService.isAuthenticated();
  });

  // Standalone /admin login form state
  const [loginUsername, setLoginUsername] = useState(DEFAULT_ADMIN_USERNAME);
  const [loginPassword, setLoginPassword] = useState(DEFAULT_ADMIN_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dynamic Content Collections synced with Firestore
  const [achievers, setAchievers] = useState<Achiever[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [projects, setProjects] = useState<ProjectShowcase[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [events, setEvents] = useState<DiasporaEvent[]>([]);

  // Modal inspection
  const [activeModalItem, setActiveModalItem] = useState<
    | { type: 'achiever'; data: Achiever }
    | { type: 'news'; data: NewsItem }
    | { type: 'project'; data: ProjectShowcase }
    | { type: 'event'; data: DiasporaEvent }
    | { type: 'post'; data: BlogPost }
    | null
  >(null);

  // Synchronize browser history, popstate and hashchange for /admin route
  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentSearch(window.location.search);
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setCurrentSearch('');
    setCurrentHash('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Initialize auth listener & auto-seeding
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Check if Firestore has records, otherwise auto-seed
    contentService.checkAndAutoSeed();

    // Subscribe to real-time Firestore updates
    const unsubAchievers = contentService.subscribeAchievers(setAchievers);
    const unsubNews = contentService.subscribeNews(setNews);
    const unsubProjects = contentService.subscribeProjects(setProjects);
    const unsubPosts = contentService.subscribePosts(setPosts);
    const unsubEvents = contentService.subscribeEvents(setEvents);

    return () => {
      unsubAuth();
      unsubAchievers();
      unsubNews();
      unsubProjects();
      unsubPosts();
      unsubEvents();
    };
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await adminAuthService.login(loginUsername, loginPassword);
      if (res.success) {
        setIsAdminAuthenticated(true);
      } else {
        setLoginError(res.error || 'Invalid credentials');
      }
    } catch (err: any) {
      setLoginError(err?.message || 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminLogout = () => {
    adminAuthService.logout();
    setIsAdminAuthenticated(false);
    navigateTo('/');
  };

  const isAdminView = isRouteAdmin(currentPath, currentSearch, currentHash);

  // =========================================================================
  // SEPARATE DEDICATED URL ROUTE: /admin
  // =========================================================================
  if (isAdminView) {
    if (isAdminAuthenticated) {
      return (
        <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
          {/* Admin Bar */}
          <div className="bg-slate-950 text-white px-4 py-2 text-xs flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-bold tracking-wide">Indian Diaspora Club Admin Console (/admin)</span>
            </div>
            <button
              onClick={() => navigateTo('/')}
              className="inline-flex items-center space-x-1 text-orange-400 hover:text-orange-300 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website (/)</span>
            </button>
          </div>

          <AdminPanel
            currentUser={currentUser}
            achievers={achievers}
            news={news}
            projects={projects}
            posts={posts}
            events={events}
            onClose={() => navigateTo('/')}
            onAdminLogout={handleAdminLogout}
          />
        </div>
      );
    }

    // Unauthenticated on /admin -> Dedicated Username/Password Login Page
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-4">
        <div className="max-w-md w-full bg-white text-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-100">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center mx-auto mb-3 shadow-sm">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.16.58_AM_66a822ca.jpeg"
                alt="Indian Diaspora Club Logo"
                className="w-full h-full object-contain scale-[1.32]"
              />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-900">
              Indian Diaspora Club
            </h1>
            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mt-0.5">
              Administrator Portal
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Restricted URL (<code className="text-orange-600 font-bold">/admin</code>). Enter credentials to continue.
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-2 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Rahulraj2mar@gmail.com or admin"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Default Credentials Helper */}
            <div className="bg-orange-50 border border-orange-200/80 rounded-xl p-3 text-xs text-gray-700">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-orange-900">Default Admin Credentials:</span>
                <button
                  type="button"
                  onClick={() => {
                    setLoginUsername(DEFAULT_ADMIN_USERNAME);
                    setLoginPassword(DEFAULT_ADMIN_PASSWORD);
                    setLoginError(null);
                  }}
                  className="text-[11px] font-bold text-orange-600 hover:underline cursor-pointer"
                >
                  Auto-Fill
                </button>
              </div>
              <div className="font-mono text-[11px] text-gray-600 space-y-0.5">
                <div>User: <span className="font-bold text-gray-900">{DEFAULT_ADMIN_USERNAME}</span> (or <span className="font-bold text-gray-900">{DEFAULT_ADMIN_ALIAS}</span>)</div>
                <div>Pass: <span className="font-bold text-gray-900">{DEFAULT_ADMIN_PASSWORD}</span></div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-md shadow-orange-600/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Shield className="w-4 h-4" />
              <span>{loginLoading ? 'Verifying...' : 'Sign In to Admin Console'}</span>
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center">
            <button
              onClick={() => navigateTo('/')}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-gray-500 hover:text-orange-600 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // PUBLIC WEBSITE (MATCHING SKETCH WITHOUT ANY ADMIN BUTTONS)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-gray-900 selection:bg-orange-500 selection:text-white">
      {/* Navigation Header matching sketch layout with ZERO admin buttons */}
      <Navbar
        currentTab={currentTab}
        selectedMagazineId={selectedMagazineId}
        onSelectMagazine={(id) => setSelectedMagazineId(id)}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* Official Indian Diaspora Club (IDC) Introduction & About Section */}
            <HomeIdcIntro
              onSelectTab={(tab) => {
                setCurrentTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 1. Diaspora Achievers with auto-rotation and arrows matching sketch */}
            <AchieversSlider
              achievers={achievers}
              onSelectAchiever={(achiever) => setActiveModalItem({ type: 'achiever', data: achiever })}
            />

            {/* 2. Diaspora News with arrows matching sketch */}
            <NewsSlider
              news={news}
              onSelectNews={(item) => setActiveModalItem({ type: 'news', data: item })}
            />

            {/* 3. Upcoming Events (Dynamic & CMS-managed) */}
            <UpcomingEventsShowcase
              events={events}
              onSelectEvent={(ev) => setActiveModalItem({ type: 'event', data: ev })}
              onViewAllEvents={() => {
                setCurrentTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 4. Blog Posts & Articles (Dynamic & CMS-managed) */}
            <BlogSection
              posts={posts}
              onSelectPost={(post) => setActiveModalItem({ type: 'post', data: post })}
            />
          </>
        )}

        {currentTab === 'about' && (
          <AboutUs
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'nri-pio' && <NriPioHub />}

        {currentTab === 'events' && (
          <EventsSection
            events={events}
            onSelectEvent={(ev) => setActiveModalItem({ type: 'event', data: ev })}
          />
        )}

        {currentTab === 'magazine' && (
          <MagazineSection
            selectedEditionId={selectedMagazineId}
            onSelectEdition={(id) => setSelectedMagazineId(id)}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'publish-contact' && <PublishContact />}
      </main>

      {/* Detail Modal for any clicked item */}
      <ItemDetailModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />

      {/* Footer matching sketch: Twitter | Facebook | Instagram | Youtube (No Admin button) */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
