import React from 'react';
import { X, Calendar, MapPin, ExternalLink, Globe, Tag, Award, User } from 'lucide-react';
import { Achiever, NewsItem, ProjectShowcase, BlogPost, DiasporaEvent } from '../types';

type ModalItem = 
  | { type: 'achiever'; data: Achiever }
  | { type: 'news'; data: NewsItem }
  | { type: 'project'; data: ProjectShowcase }
  | { type: 'event'; data: DiasporaEvent }
  | { type: 'post'; data: BlogPost };

interface ItemDetailModalProps {
  item: ModalItem | null;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-900 overflow-hidden flex-shrink-0">
          <img
            src={item.data.imageUrl}
            alt={'title' in item.data ? item.data.title : item.data.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="px-2.5 py-1 bg-orange-600 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
              {item.type === 'achiever' && 'Diaspora Achiever'}
              {item.type === 'news' && 'Diaspora News'}
              {item.type === 'project' && 'Project Showcase'}
              {item.type === 'event' && 'Upcoming Event'}
              {item.type === 'post' && 'Blog Article'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
              {'title' in item.data ? item.data.title : item.data.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {item.type === 'achiever' && (
            <>
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
                <span className="text-orange-600 font-bold text-sm">{item.data.role}</span>
                <span className="text-gray-400">•</span>
                <span className="flex items-center space-x-1 text-gray-700">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.data.country}</span>
                </span>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-orange-800 mb-1">
                  Primary Achievement
                </div>
                <p className="text-sm font-medium text-gray-900 leading-relaxed">
                  {item.data.achievement}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Full Story &amp; Biography
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.data.story}
                </p>
              </div>

              {item.data.tags && item.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.data.tags.map((t, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </>
          )}

          {item.type === 'news' && (
            <>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="font-semibold text-orange-600">{item.data.category}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{item.data.publishedAt}</span>
                </span>
                <span>•</span>
                <span>{item.data.country}</span>
              </div>

              <p className="text-base font-semibold text-gray-900 leading-relaxed">
                {item.data.summary}
              </p>

              <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {item.data.content}
              </div>

              <div className="pt-4 border-t border-gray-100 text-xs text-gray-500">
                Published by: <span className="font-semibold text-gray-800">{item.data.source}</span>
              </div>
            </>
          )}

          {item.type === 'project' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-bold text-orange-600 text-sm">{item.data.tagline}</span>
                {item.data.status && (
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">
                    {item.data.status}
                  </span>
                )}
              </div>

              <div className="p-4 bg-gray-50 rounded-xl space-y-2 text-xs text-gray-600">
                <div><span className="font-bold text-gray-800">Founder/Lead:</span> {item.data.founder}</div>
                <div><span className="font-bold text-gray-800">Headquarters / Reach:</span> {item.data.country}</div>
                <div><span className="font-bold text-gray-800">Category:</span> {item.data.category}</div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Project Overview
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.data.description}
                </p>
              </div>

              {item.data.projectUrl && (
                <div className="pt-2">
                  <a
                    href={item.data.projectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition"
                  >
                    <span>Visit Project Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </>
          )}

          {item.type === 'event' && (
            <>
              <div className="p-4 bg-orange-50/60 border border-orange-200/70 rounded-xl space-y-2.5 text-xs sm:text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-orange-600 shrink-0" />
                  <span className="font-bold text-gray-900">Date &amp; Schedule:</span>
                  <span className="text-orange-700 font-semibold">{item.data.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
                  <span className="font-bold text-gray-900">Venue / Mode:</span>
                  <span>{item.data.location}</span>
                </div>
                {item.data.category && (
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-orange-600 shrink-0" />
                    <span className="font-bold text-gray-900">Category:</span>
                    <span>{item.data.category}</span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">
                  Event Overview &amp; Agenda
                </h4>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {item.data.description}
                </p>
              </div>

              {item.data.registrationLink && (
                <div className="pt-2">
                  <a
                    href={item.data.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition"
                  >
                    <span>RSVP / Register for Event</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </>
          )}

          {item.type === 'post' && (
            <>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span className="font-semibold text-orange-600">{item.data.category}</span>
                <span>•</span>
                <span>{item.data.publishedAt}</span>
                <span>•</span>
                <span>{item.data.readTime}</span>
              </div>

              <div className="p-4 bg-orange-50/60 rounded-xl flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center font-bold">
                  {item.data.author[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{item.data.author}</h4>
                  <p className="text-xs text-gray-500">{item.data.authorBio || 'Diaspora Writer'}</p>
                </div>
              </div>

              <div className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {item.data.content}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
