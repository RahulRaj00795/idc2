import React, { useState, useEffect } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { NriPioMember } from '../types';

interface NriPioHubProps {
  members: NriPioMember[];
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

const MemberPhoto: React.FC<{
  src: string;
  name: string;
  className?: string;
}> = ({ src, name, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [src]);

  if (!src || imgError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 via-orange-50/60 to-stone-200 text-stone-700 select-none ${className}`}
      >
        <span className="font-editorial text-2xl font-bold tracking-tight text-orange-800">
          {getInitials(name) || 'IDC'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={className}
    />
  );
};

export const NriPioHub: React.FC<NriPioHubProps> = ({ members }) => {
  const [selectedMember, setSelectedMember] = useState<NriPioMember | null>(null);

  useEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember]);

  return (
    <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-8 pb-4 border-b border-stone-200">
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-stone-900 tracking-tight">
          Our NRI / PIO
        </h1>
      </div>

      {/* Small Cards Grid */}
      {members.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-xl border border-stone-200">
          <p className="text-sm text-stone-500">
            No NRI / PIO profiles added yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <article
              key={member.id}
              onClick={() => setSelectedMember(member)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedMember(member);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View full details for ${member.name}`}
              className="group bg-white rounded-xl border border-stone-200 hover:border-orange-300 transition-colors duration-150 overflow-hidden flex flex-col cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {/* 1. Photo */}
              <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <MemberPhoto
                  src={member.photoUrl}
                  name={member.name}
                  className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-200"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  {/* 2. Name below Photo */}
                  <h2 className="text-base font-bold text-stone-900 leading-snug group-hover:text-orange-700 transition-colors truncate">
                    {member.name}
                  </h2>

                  {/* 3. Awarded below Name */}
                  {member.awarded && (
                    <p
                      className="text-xs font-medium text-orange-700 truncate"
                      title={member.awarded}
                    >
                      {member.awarded}
                    </p>
                  )}
                </div>

                {/* 4. Country on Left | Read More on Right */}
                <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium text-stone-700 truncate">
                    {member.country}
                  </span>

                  <span className="inline-flex items-center gap-0.5 font-semibold text-orange-600 group-hover:text-orange-700 whitespace-nowrap shrink-0">
                    <span>Read More</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Full Details Popup Modal */}
      {selectedMember && (
        <div
          onClick={() => setSelectedMember(null)}
          className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="nri-pio-modal-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col"
          >
            {/* Close Icon */}
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Close details popup"
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-white/90 hover:bg-stone-100 text-stone-600 hover:text-stone-900 border border-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Top Profile Summary */}
            <div className="bg-[#FBF9F5] border-b border-stone-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
              <div className="w-full sm:w-40 aspect-[4/3] sm:aspect-[3/4] rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shrink-0">
                <MemberPhoto
                  src={selectedMember.photoUrl}
                  name={selectedMember.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0 pr-8 sm:pr-6">
                <h2
                  id="nri-pio-modal-title"
                  className="text-2xl sm:text-3xl font-editorial font-bold text-stone-900 leading-tight"
                >
                  {selectedMember.name}
                </h2>

                {selectedMember.designation && (
                  <p className="text-sm font-medium text-stone-600 mt-1.5">
                    {selectedMember.designation}
                  </p>
                )}

                <dl className="mt-4 pt-4 border-t border-stone-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="uppercase tracking-wider text-stone-400 font-semibold">
                      Country
                    </dt>
                    <dd className="text-sm font-semibold text-stone-900 mt-0.5">
                      {selectedMember.country}
                    </dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wider text-stone-400 font-semibold">
                      Awarded
                    </dt>
                    <dd className="text-sm font-semibold text-orange-700 mt-0.5">
                      {selectedMember.awarded}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Scrollable Full Details */}
            <div className="p-6 sm:p-8 overflow-y-auto">
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line">
                {selectedMember.details}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
