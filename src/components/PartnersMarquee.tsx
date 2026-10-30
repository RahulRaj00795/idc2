import React from 'react';

interface PartnerLogo {
  id: string;
  name: string;
  src: string;
}

const ROW_ONE_PARTNERS: PartnerLogo[] = [
  {
    id: 'mea',
    name: 'Ministry of External Affairs, Government of India',
    src: '/assets/aistudio/External_e509e21c.png',
  },
  {
    id: 'pbd',
    name: 'Pravasi Bharatiya Divas',
    src: '/assets/aistudio/Pravasi_fdf7d5c0.png',
  },
  {
    id: 'haryana-govt',
    name: 'Government of Haryana',
    src: '/assets/aistudio/hr-govt_618ec2a4.png',
  },
  {
    id: 'uttarakhand-govt',
    name: 'Government of Uttarakhand',
    src: '/assets/aistudio/Uk_3de494ac.png',
  },
  {
    id: 'goa-govt',
    name: 'Government of Goa',
    src: '/assets/aistudio/govt_goa_f4947786.png',
  },
  {
    id: 'telangana-tourism',
    name: 'Telangana Tourism',
    src: '/assets/aistudio/telangana_fffa03ff.jpeg',
  },
];

const ROW_TWO_PARTNERS: PartnerLogo[] = [
  {
    id: 'hsiidc',
    name: 'Haryana State Industrial & Infrastructure Development Corporation (HSIIDC)',
    src: '/assets/aistudio/IIDC_5bdacc3c.jpeg',
  },
  {
    id: 'pravasi-haryana',
    name: 'Pravasi Haryana Divas',
    src: '/assets/aistudio/pravasi_hr_79b03e0b.jpeg',
  },
  {
    id: 'iabc',
    name: 'Indian American Business Council',
    src: '/assets/aistudio/IABC_b1b9d31b.png',
  },
  {
    id: 'loomba-foundation',
    name: 'The Loomba Foundation',
    src: '/assets/aistudio/Loomba_0f240590.jpeg',
  },
  {
    id: 'nithm',
    name: 'National Institute of Tourism and Hospitality Management (NITHM)',
    src: '/assets/aistudio/nithm_ca8597ed.jpeg',
  },
  {
    id: 'gopio-guadeloupe',
    name: 'GOPIO Guadeloupe',
    src: '/assets/aistudio/Guadeloupe_59424bdf.jpeg',
  },
];

const PartnerCard: React.FC<{ partner: PartnerLogo }> = ({ partner }) => (
  <div
    title={partner.name}
    className="w-48 sm:w-56 h-28 sm:h-32 bg-white rounded-2xl border border-gray-200/90 shadow-xs hover:border-orange-400 hover:shadow-md transition-all duration-300 px-5 py-3.5 flex items-center justify-center shrink-0"
  >
    <img
      src={partner.src}
      alt={partner.name}
      loading="lazy"
      className="max-h-full max-w-full object-contain select-none"
    />
  </div>
);

export const PartnersMarquee: React.FC = () => {
  // Repeat each 6-item list twice per half so each half exceeds wide viewports for seamless -50% looping
  const rowOneHalf = [...ROW_ONE_PARTNERS, ...ROW_ONE_PARTNERS];
  const rowTwoHalf = [...ROW_TWO_PARTNERS, ...ROW_TWO_PARTNERS];

  return (
    <section className="py-14 bg-white border-b border-gray-200/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="pb-5 border-b border-gray-200 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
            Institutional Collaborations &amp; Global Alliances
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Partners / Supporters
          </h2>
          <p className="text-sm text-gray-600 mt-1.5 max-w-2xl mx-auto">
            Honoured to collaborate with ministries, state governments, chambers of commerce, and global diaspora organisations.
          </p>
        </div>
      </div>

      {/* Dual Opposite-Direction Rotating Rows */}
      <div className="relative space-y-5 marquee-track">
        {/* Subtle edge fade masks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10"
        />

        {/* Line 1: Moves Right -> Left */}
        <div className="flex overflow-hidden">
          <div className="flex w-max animate-marquee-left">
            <div className="flex shrink-0 items-center gap-5 pr-5">
              {rowOneHalf.map((partner, idx) => (
                <PartnerCard key={`r1-a-${partner.id}-${idx}`} partner={partner} />
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center gap-5 pr-5">
              {rowOneHalf.map((partner, idx) => (
                <PartnerCard key={`r1-b-${partner.id}-${idx}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>

        {/* Line 2: Moves Left -> Right (Opposite Direction) */}
        <div className="flex overflow-hidden">
          <div className="flex w-max animate-marquee-right">
            <div className="flex shrink-0 items-center gap-5 pr-5">
              {rowTwoHalf.map((partner, idx) => (
                <PartnerCard key={`r2-a-${partner.id}-${idx}`} partner={partner} />
              ))}
            </div>
            <div aria-hidden="true" className="flex shrink-0 items-center gap-5 pr-5">
              {rowTwoHalf.map((partner, idx) => (
                <PartnerCard key={`r2-b-${partner.id}-${idx}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
