import React, { useState, useEffect, useCallback } from 'react';
import { DiasporaEvent, NewsDataArticle, NewsDataResponse } from '../types';
import {
  Calendar,
  MapPin,
  ExternalLink,
  Plus,
  Users,
  Radio,
  RefreshCw,
  Globe,
  Clock,
  AlertCircle,
  ChevronDown,
  X,
  Newspaper
} from 'lucide-react';

interface EventsSectionProps {
  events: DiasporaEvent[];
  onSelectEvent?: (event: DiasporaEvent) => void;
  onOpenAdminToAdd?: () => void;
}

type CategoryFilter = 'all' | 'breaking' | 'politics' | 'science' | 'business';
type LanguageFilter = 'en,hi' | 'en' | 'hi';
type ViewMode = 'all' | 'live-feed' | 'conferences';

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'breaking', label: 'Breaking' },
  { value: 'politics', label: 'Politics' },
  { value: 'science', label: 'Science' },
  { value: 'business', label: 'Business' },
];

const LANGUAGE_OPTIONS: { value: LanguageFilter; label: string }[] = [
  { value: 'en,hi', label: 'EN & हिंदी' },
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिंदी' },
];

const FALLBACK_EVENT_IMAGE =
  'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80';

function formatPubDate(raw: string): string {
  if (!raw) return 'Just now';
  const normalized = raw.includes('T') ? raw : `${raw.replace(' ', 'T')}Z`;
  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return raw;
  return parsed.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onSelectEvent,
  onOpenAdminToAdd
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageFilter>('en,hi');

  const [articles, setArticles] = useState<NewsDataArticle[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsDataArticle | null>(null);

  const fetchLiveFeed = useCallback(
    async (opts?: { pageToken?: string; refresh?: boolean }) => {
      const isLoadMore = Boolean(opts?.pageToken);
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
        setError(null);
      }

      try {
        const categoryQuery =
          selectedCategory === 'all'
            ? 'breaking,politics,science,business'
            : selectedCategory;

        const params = new URLSearchParams({
          category: categoryQuery,
          language: selectedLanguage,
        });

        if (opts?.pageToken) {
          params.set('page', opts.pageToken);
        }
        if (opts?.refresh) {
          params.set('refresh', 'true');
        }

        const res = await fetch(`/api/events-feed?${params.toString()}`);
        const data: NewsDataResponse = await res.json();

        if (!res.ok || data.status === 'error') {
          throw new Error(data.message || 'Unable to load live India updates right now.');
        }

        const incoming = Array.isArray(data.results) ? data.results : [];

        if (isLoadMore) {
          setArticles((prev) => {
            const seen = new Set(prev.map((a) => a.article_id));
            const uniqueNew = incoming.filter((a) => !seen.has(a.article_id));
            return [...prev, ...uniqueNew];
          });
        } else {
          setArticles(incoming);
        }

        setNextPage(data.nextPage || null);
        if (typeof data.totalResults === 'number') {
          setTotalResults(data.totalResults);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch live updates.');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [selectedCategory, selectedLanguage]
  );

  useEffect(() => {
    fetchLiveFeed();
  }, [fetchLiveFeed]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
      {/* Top Page Header & View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Calendar className="w-3.5 h-3.5 text-orange-600" />
            <span>India Live Feed &amp; Global Gatherings</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Events &amp; Live India Updates
          </h1>
          <p className="text-sm text-gray-600 mt-1 max-w-2xl">
            Stay connected with real-time breaking developments, politics, science, and business events across India (in English &amp; हिंदी) alongside global diaspora conferences.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'all'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({articles.length + events.length})
            </button>
            <button
              onClick={() => setViewMode('live-feed')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'live-feed'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Live India Feed
            </button>
            <button
              onClick={() => setViewMode('conferences')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                viewMode === 'conferences'
                  ? 'bg-white text-orange-600 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Conferences ({events.length})
            </button>
          </div>

          {onOpenAdminToAdd && (
            <button
              onClick={onOpenAdminToAdd}
              className="inline-flex items-center space-x-1.5 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Event via Admin</span>
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          1. LIVE INDIA EVENTS & UPDATES (NEWSDATA.IO FEED)
         ===================================================================== */}
      {(viewMode === 'all' || viewMode === 'live-feed') && (
        <section className="space-y-6">
          <div className="bg-white rounded-2xl border border-orange-100 p-4 sm:p-5 shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-extrabold text-gray-900">
                    Live India Happenings &amp; Dispatches
                  </h2>
                  {totalResults > 0 && (
                    <span className="hidden sm:inline-block px-2 py-0.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-md text-[11px] font-bold">
                      {totalResults.toLocaleString()} indexed updates
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  Real-time Breaking, Politics, Science &amp; Business coverage from India
                </p>
              </div>
            </div>

            {/* Category + Language Filters + Refresh */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {CATEGORY_OPTIONS.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                      selectedCategory === cat.value
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-50 hover:text-orange-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <span className="hidden sm:inline text-gray-300">|</span>

              {/* Language Switcher */}
              <div className="inline-flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                {LANGUAGE_OPTIONS.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => setSelectedLanguage(lang.value)}
                    className={`px-2.5 py-1 rounded-md text-xs font-bold transition cursor-pointer ${
                      selectedLanguage === lang.value
                        ? 'bg-slate-900 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              {/* Refresh Button */}
              <button
                onClick={() => fetchLiveFeed({ refresh: true })}
                disabled={loading}
                title="Refresh live feed"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-orange-400 text-xs font-bold text-gray-700 hover:text-orange-600 transition cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-orange-600' : ''}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-3 text-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold">Could not load live updates</h4>
                  <p className="text-xs text-red-700 mt-0.5">{error}</p>
                </div>
              </div>
              <button
                onClick={() => fetchLiveFeed({ refresh: true })}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading Skeletons */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-1/3 bg-gray-200 rounded" />
                    <div className="h-5 w-full bg-gray-200 rounded" />
                    <div className="h-5 w-4/5 bg-gray-200 rounded" />
                    <div className="h-12 w-full bg-gray-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : articles.length === 0 && !error ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
              <Newspaper className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-gray-900">No updates matched this filter</h3>
              <p className="text-xs text-gray-500 mt-1">
                Try switching back to All Categories or EN &amp; हिंदी.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => {
                  const isHindi = article.language?.toLowerCase() === 'hindi';
                  const categories = article.category?.length ? article.category : ['india'];

                  return (
                    <article
                      key={article.article_id}
                      onClick={() => setSelectedArticle(article)}
                      className="group bg-white rounded-2xl border border-gray-200 hover:border-orange-400 shadow-xs hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        {/* Cover Image */}
                        <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                          <img
                            src={article.image_url || FALLBACK_EVENT_IMAGE}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = FALLBACK_EVENT_IMAGE;
                            }}
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            {categories.slice(0, 2).map((cat, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-0.5 bg-orange-600/95 backdrop-blur-md text-white text-[11px] font-bold uppercase rounded-md shadow-xs"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-md border border-white/15">
                              {isHindi ? 'हिंदी' : 'EN'}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5">
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-2.5 gap-2">
                            <span className="flex items-center space-x-1.5 truncate font-semibold text-gray-700">
                              {article.source_icon ? (
                                <img
                                  src={article.source_icon}
                                  alt=""
                                  className="w-4 h-4 rounded-sm object-contain shrink-0"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              ) : (
                                <Globe className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                              )}
                              <span className="truncate">{article.source_name || 'India News Desk'}</span>
                            </span>
                            <span className="flex items-center space-x-1 text-[11px] text-gray-400 shrink-0">
                              <Clock className="w-3 h-3" />
                              <span>{formatPubDate(article.pubDate)}</span>
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                            {article.title}
                          </h3>

                          {article.description && (
                            <p className="text-gray-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                              {article.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="px-5 pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500 flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-orange-500" />
                          <span>India</span>
                        </span>

                        <a
                          href={article.link}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center space-x-1 text-xs font-bold text-orange-600 hover:text-orange-700"
                        >
                          <span>Full Story</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Pagination: Load More */}
              {nextPage && (
                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => fetchLiveFeed({ pageToken: nextPage })}
                    disabled={loadingMore}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Loading More Updates...</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Load More India Updates</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* =====================================================================
          2. SCHEDULED DIASPORA GLOBAL CONFERENCES & SUMMITS (FIRESTORE CMS)
         ===================================================================== */}
      {(viewMode === 'all' || viewMode === 'conferences') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Scheduled Diaspora Conferences &amp; Summits
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Upcoming community conclaves, hackathons, and networking gatherings worldwide
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                onClick={() => onSelectEvent?.(event)}
                className={`group bg-white rounded-2xl border border-gray-200 hover:border-orange-400/80 shadow-xs hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  onSelectEvent ? 'cursor-pointer' : ''
                }`}
              >
                <div className="relative h-52 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold rounded-lg border border-white/20">
                      {event.category || 'Event'}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 mb-3">
                      <span className="flex items-center space-x-1 text-orange-600">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{event.location}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span>Public Diaspora Gathering</span>
                    </span>

                    {event.registrationLink ? (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white rounded-lg text-xs font-bold transition-all"
                      >
                        <span>RSVP / Register</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-bold text-orange-600">
                        Open Attendance
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detail Modal for Live Article */}
      {selectedArticle && (
        <div
          onClick={() => setSelectedArticle(null)}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col"
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 w-full bg-slate-900 shrink-0 overflow-hidden">
              <img
                src={selectedArticle.image_url || FALLBACK_EVENT_IMAGE}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_EVENT_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex flex-wrap gap-2 mb-2">
                  {(selectedArticle.category || ['India']).map((cat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-orange-600 text-white text-xs font-bold uppercase rounded-md"
                    >
                      {cat}
                    </span>
                  ))}
                  <span className="px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-md">
                    {selectedArticle.language?.toLowerCase() === 'hindi' ? 'हिंदी' : 'English'}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500 border-b border-gray-100 pb-3">
                <span className="font-bold text-gray-800">
                  Source: {selectedArticle.source_name || 'India News Wire'}
                </span>
                <span>{formatPubDate(selectedArticle.pubDate)}</span>
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedArticle.description || 'Click below to read the full coverage directly from the publisher.'}
              </p>

              {selectedArticle.keywords && selectedArticle.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {selectedArticle.keywords.slice(0, 6).map((kw, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <a
                  href={selectedArticle.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition"
                >
                  <span>Read Full Coverage on {selectedArticle.source_name || 'Source'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
