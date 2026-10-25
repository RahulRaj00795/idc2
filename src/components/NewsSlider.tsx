import React, { useState } from 'react';
import { NewsItem } from '../types';
import { ChevronLeft, ChevronRight, Newspaper, Calendar, Clock, ArrowRight, Plus } from 'lucide-react';

interface NewsSliderProps {
  news: NewsItem[];
  onSelectNews: (item: NewsItem) => void;
  onOpenAdminToAdd?: () => void;
}

export const NewsSlider: React.FC<NewsSliderProps> = ({
  news,
  onSelectNews,
  onOpenAdminToAdd
}) => {
  const [startIndex, setStartIndex] = useState(0);

  // We can show 3 news cards at a time on desktop, 2 on tablet, 1 on mobile
  const itemsPerPage = 3;
  const total = news.length;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(total - 1, prev + 1));
  };

  if (!news || news.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 text-center my-6">
        <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-800">No News Published Yet</h3>
        <p className="text-sm text-gray-500 mb-4">Add your first diaspora news story via the Admin Panel.</p>
        <button
          onClick={onOpenAdminToAdd}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add News Story</span>
        </button>
      </div>
    );
  }

  // Get currently visible items based on startIndex
  const visibleNews = news.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with exact sketch layout: "Diaspora News" and "<- ->" */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5 text-amber-700" />
              <span>Global Dispatch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Diaspora News
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Real-time dispatches, policy updates, cultural breakthroughs, and bilateral milestones.
            </p>
          </div>

          {/* Navigation Arrows matching sketch: "<- ->" */}
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              aria-label="Previous News"
              className={`p-2.5 rounded-xl border transition-all shadow-xs ${
                startIndex === 0
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                  : 'border-gray-300 bg-white text-gray-700 hover:text-orange-600 hover:border-orange-400 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-gray-500">
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, total)} of {total}
            </span>
            <button
              onClick={handleNext}
              disabled={startIndex + itemsPerPage >= total}
              aria-label="Next News"
              className={`p-2.5 rounded-xl border transition-all shadow-xs ${
                startIndex + itemsPerPage >= total
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed bg-gray-50'
                  : 'border-gray-300 bg-white text-gray-700 hover:text-orange-600 hover:border-orange-400 active:scale-95'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* News Cards Grid / Slider */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleNews.map((item) => (
            <article
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="group bg-white rounded-2xl border border-gray-200/80 hover:border-orange-300 shadow-xs hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
            >
              {/* Image & Category Pill */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 bg-orange-600/90 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-xs">
                    {item.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] px-2 py-0.5 rounded-md font-medium">
                  {item.country}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      <span>{item.publishedAt}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{item.readTime || '3 min'}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">
                    Source: {item.source}
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
