import React, { useState, useEffect, useRef } from 'react';
import { Achiever } from '../types';
import { ChevronLeft, ChevronRight, Award, MapPin, Sparkles, Plus, ExternalLink, Play, Pause } from 'lucide-react';

interface AchieversSliderProps {
  achievers: Achiever[];
  onSelectAchiever: (achiever: Achiever) => void;
  onOpenAdminToAdd?: () => void;
}

export const AchieversSlider: React.FC<AchieversSliderProps> = ({
  achievers,
  onSelectAchiever,
  onOpenAdminToAdd
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<any>(null);

  const total = achievers.length;

  // Keep changing automatically as explicitly written on sketch: "Keep changing. It should keep on changing"
  useEffect(() => {
    if (total <= 1 || !isPlaying) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  if (!achievers || achievers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border-2 border-dashed border-orange-200 p-8 text-center my-6">
        <Award className="w-12 h-12 text-orange-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-800">No Diaspora Achievers Yet</h3>
        <p className="text-sm text-gray-500 mb-4">Use the Admin Panel to feature extraordinary global diaspora changemakers.</p>
        <button
          onClick={onOpenAdminToAdd}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achiever</span>
        </button>
      </div>
    );
  }

  const current = achievers[currentIndex];

  return (
    <section className="bg-gradient-to-b from-orange-50/50 via-white to-white py-10 px-4 sm:px-6 lg:px-8 border-b border-orange-100/80">
      <div className="max-w-7xl mx-auto">
        {/* Header with layout matching sketch */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-orange-200">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-600 animate-spin-slow" />
              <span>Global Honors &amp; Pride</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <span>Diaspora Achievers</span>
              <span className="hidden sm:inline-block text-xs font-normal px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200">
                Auto-Rotating Feed
              </span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Celebrating trailblazers of Indian origin excelling in governance, technology, aerospace, economy, and the arts.
            </p>
          </div>

          {/* Controls: Prev / Play-Pause / Next arrows matching sketch: "<- ->" */}
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause auto-rotation" : "Resume auto-rotation"}
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-600 hover:text-orange-600 hover:border-orange-300 transition-colors shadow-xs"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrev}
              aria-label="Previous Achiever"
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:text-orange-600 hover:border-orange-400 hover:bg-orange-50/50 transition-all shadow-xs active:scale-95 flex items-center justify-center group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs font-bold text-gray-500 px-2">
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next Achiever"
              className="p-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:text-orange-600 hover:border-orange-400 hover:bg-orange-50/50 transition-all shadow-xs active:scale-95 flex items-center justify-center group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Main Hero Slider Card */}
        <div
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          className="relative bg-white rounded-3xl shadow-xl shadow-orange-500/5 border border-orange-100 overflow-hidden transition-all duration-500"
        >
          {/* Subtle decorative Indian tricolor / saffron flare */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Achiever Portrait with Country Pill */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[460px] bg-slate-900 overflow-hidden group">
              <img
                key={current.id}
                src={current.imageUrl}
                alt={current.name}
                className="w-full h-full object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden"></div>

              {/* Country Badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 border border-white/20">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{current.country}</span>
              </div>

              {/* Index counter pill */}
              <div className="absolute bottom-4 left-4 bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-black uppercase px-2.5 py-1 rounded-md tracking-wider">
                Achiever #{currentIndex + 1}
              </div>
            </div>

            {/* Achiever Details and Story */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {current.tags && current.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-200/60 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-lg text-xs font-medium flex items-center space-x-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>Diaspora Icon</span>
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
                  {current.name}
                </h3>
                <p className="text-base sm:text-lg font-semibold text-orange-600 mt-1 mb-4">
                  {current.role}
                </p>

                {/* Primary Achievement Box */}
                <div className="bg-orange-50/70 border-l-4 border-orange-500 p-4 rounded-r-xl mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-orange-800 mb-1">
                    Key Global Impact
                  </div>
                  <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed">
                    "{current.achievement}"
                  </p>
                </div>

                {/* Story Paragraph with truncation */}
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-4">
                  {current.story}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={() => onSelectAchiever(current)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-600/20 hover:shadow-orange-600/40 transition-all cursor-pointer"
                >
                  <span>Read Full Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>Auto-advances every 4.5s</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Hover to pause</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="mt-6 flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
          {achievers.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 flex items-center space-x-3 px-3 py-2 rounded-xl border text-left transition-all ${
                idx === currentIndex
                  ? 'border-orange-500 bg-orange-50/80 shadow-xs ring-1 ring-orange-500'
                  : 'border-gray-200 bg-white hover:border-orange-300 opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="max-w-[130px] truncate">
                <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                <p className="text-[10px] text-gray-500 truncate">{item.country}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
