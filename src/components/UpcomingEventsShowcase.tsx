import React, { useState } from 'react';
import { DiasporaEvent } from '../types';
import { Calendar, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

interface UpcomingEventsShowcaseProps {
  events: DiasporaEvent[];
  onSelectEvent: (event: DiasporaEvent) => void;
  onViewAllEvents?: () => void;
}

const FALLBACK_EVENT_IMAGE =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';

export const UpcomingEventsShowcase: React.FC<UpcomingEventsShowcaseProps> = ({
  events,
  onSelectEvent,
  onViewAllEvents
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = [
    'All',
    ...Array.from(new Set(events.map((e) => e.category || 'Summit').filter(Boolean)))
  ];

  const filtered =
    filterCategory === 'All'
      ? events
      : events.filter((e) => (e.category || 'Summit') === filterCategory);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
              Global Summits, Delegations &amp; Community Conclaves
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Upcoming Events
            </h2>
            <p className="text-sm text-gray-600 mt-1 max-w-2xl">
              Explore upcoming Indian Diaspora Club conferences, bilateral business delegations, cultural exchanges, and global networking forums.
            </p>
          </div>

          {onViewAllEvents && (
            <button
              onClick={onViewAllEvents}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-white border border-gray-300 hover:border-orange-500 text-gray-800 hover:text-orange-600 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer self-start md:self-auto"
            >
              <span>All Events &amp; Live India Feed</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Upcoming Events Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
            <Calendar className="w-10 h-10 text-orange-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-gray-900">No Upcoming Events Found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Check back soon for newly scheduled diaspora conclaves and delegations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-orange-400/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
              >
                {/* Event Banner */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={event.imageUrl || FALLBACK_EVENT_IMAGE}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = FALLBACK_EVENT_IMAGE;
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md text-white text-[11px] font-bold rounded-md border border-white/15 uppercase tracking-wider">
                      {event.category || 'Summit'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 bg-orange-600/95 text-white text-[10px] font-extrabold uppercase rounded-md tracking-wider">
                      Upcoming
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-orange-600">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-xs font-medium text-gray-500">
                        <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 text-sm mt-2.5 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-orange-600 group-hover:underline">
                      View Event Details
                    </span>

                    {event.registrationLink ? (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center space-x-1 px-2.5 py-1 bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white rounded-md text-xs font-bold transition-colors"
                      >
                        <span>RSVP / Register</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-[11px] font-semibold text-gray-500">
                        Open Attendance
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
