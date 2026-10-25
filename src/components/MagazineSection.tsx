import React from 'react';
import { MagazineEditionId, NavTab } from '../types';
import { ArrowRight, BookOpen, Globe2, Award, Landmark } from 'lucide-react';

export interface MagazineEdition {
  id: MagazineEditionId;
  index: string;
  navTitle: string;
  formatLabel: string;
  mainTitle: string;
  subtitle: string;
  editionYear: string;
  coverTheme: {
    jacketBg: string;
    borderAccent: string;
    kickerText: string;
    foilText: string;
    spineBg: string;
  };
  summary: string;
  editorialOverview: string[];
  keyHighlights: {
    label: string;
    detail: string;
  }[];
  featuredThemes: string[];
}

export const MAGAZINE_EDITIONS: MagazineEdition[] = [
  {
    id: 'uniting-indian-diaspora',
    index: '01',
    navTitle: 'Coffee Table Book (Uniting the Indian Diaspora Around the World)',
    formatLabel: 'Commemorative Coffee Table Book · Edition I',
    mainTitle: 'Coffee Table Book',
    subtitle: 'Uniting the Indian Diaspora Around the World',
    editionYear: 'Global Archival Volume',
    coverTheme: {
      jacketBg: 'bg-stone-950',
      borderAccent: 'border-amber-500/50',
      kickerText: 'text-amber-400',
      foilText: 'text-amber-300',
      spineBg: 'bg-gradient-to-b from-amber-600 via-orange-700 to-stone-900',
    },
    summary:
      'A landmark hardcover publication chronicling how People of Indian Origin (PIOs) and Non-Resident Indians (NRIs) across six continents remain united through shared heritage, enterprise, diplomacy, and service.',
    editorialOverview: [
      'Published by Indian Diaspora Club (IDC), Coffee Table Book (Uniting the Indian Diaspora Around the World) brings together voices, journeys, and institutional milestones from the global Indian family.',
      'Spanning North America, Europe, the Gulf, Southeast Asia, Africa, Oceania, and the Caribbean, this collector volume documents how overseas Indians build thriving bridges of commerce, scholarship, and cultural continuity between their host nations and India.',
      'Curated for leaders, diplomatic missions, chambers of commerce, and community institutions, the volume serves as a permanent visual and biographical record of global Indian solidarity.',
    ],
    keyHighlights: [
      { label: 'Format', detail: 'Hardcover Archival Coffee Table Monograph' },
      { label: 'Geographic Scope', detail: 'Global Diaspora Chapters & Bilateral Corridors' },
      { label: 'Curatorial Focus', detail: 'Global Unity, Leadership Profiles & Institutional Partnerships' },
      { label: 'Publisher', detail: 'Indian Diaspora Club (IDC) Editorial Board' },
    ],
    featuredThemes: [
      'Global PIO & NRI Leadership Portraits',
      'Cross-Border Trade & Investment Corridors',
      'Preserving Indian Civilisational Heritage Abroad',
      'Philanthropy, Education & Community Upliftment',
    ],
  },
  {
    id: 'glorious-diaspora-pride-of-india',
    index: '02',
    navTitle: 'Coffee Table Book (Glorious Diaspora Pride of India)',
    formatLabel: 'Commemorative Coffee Table Book · Edition II',
    mainTitle: 'Coffee Table Book',
    subtitle: 'Glorious Diaspora Pride of India',
    editionYear: 'Honours & Felicitations Volume',
    coverTheme: {
      jacketBg: 'bg-[#1B1410]',
      borderAccent: 'border-orange-500/50',
      kickerText: 'text-orange-400',
      foilText: 'text-orange-300',
      spineBg: 'bg-gradient-to-b from-orange-600 via-amber-600 to-stone-950',
    },
    summary:
      'A prestigious tribute volume celebrating accomplished NRIs and PIOs whose pioneering contributions in science, medicine, governance, industry, and social welfare stand as the pride of India on the world stage.',
    editorialOverview: [
      'Coffee Table Book (Glorious Diaspora Pride of India) honours distinguished individuals of Indian origin whose integrity, innovation, and leadership have earned international acclaim while bringing laurels to their motherland.',
      'Each chapter profiles trailblazers who exemplify excellence in multinational enterprise, public service, scientific research, healthcare, arts, and humanitarian outreach—reflecting the timeless values of family, education, and service.',
      'Presented at IDC recognition forums and international leadership gatherings, this coffee table edition stands as a testament to how every accomplished Indian abroad strengthens India’s global standing.',
    ],
    keyHighlights: [
      { label: 'Format', detail: 'Deluxe Illustrated Coffee Table Compendium' },
      { label: 'Recognition Scope', detail: 'Distinguished PIO & NRI Achievers Worldwide' },
      { label: 'Curatorial Focus', detail: 'Excellence, Innovation, Public Service & National Pride' },
      { label: 'Publisher', detail: 'Indian Diaspora Club (IDC) Editorial Board' },
    ],
    featuredThemes: [
      'Icons of Global Enterprise & Innovation',
      'Pioneers in Healthcare, Science & Academia',
      'Statesmanship, Diplomacy & Civic Leadership',
      'Giving Back to Motherland & Social Impact',
    ],
  },
  {
    id: 'special-edition-pbd-2019',
    index: '03',
    navTitle: 'Indian Diaspora Special Edition PBD 2019',
    formatLabel: 'Commemorative Magazine Issue · PBD 2019',
    mainTitle: 'Indian Diaspora Special Edition',
    subtitle: 'PBD 2019 · Pravasi Bharatiya Divas Commemorative Issue',
    editionYear: 'January 2019 · Varanasi',
    coverTheme: {
      jacketBg: 'bg-[#0F241D]',
      borderAccent: 'border-emerald-400/45',
      kickerText: 'text-amber-400',
      foilText: 'text-emerald-300',
      spineBg: 'bg-gradient-to-b from-orange-600 via-white/80 to-emerald-700',
    },
    summary:
      'Special commemorative magazine edition released on the occasion of the 15th Pravasi Bharatiya Divas (PBD 2019) in Varanasi, spotlighting the central theme: "Role of Indian Diaspora in Building New India."',
    editorialOverview: [
      'Indian Diaspora Special Edition PBD 2019 captures the historic spirit of the 15th Pravasi Bharatiya Divas convention held in the sacred cultural capital of Varanasi, Uttar Pradesh, in January 2019.',
      'Featuring policy perspectives, delegation dispatches, diaspora investment dialogues, and cultural reflections surrounding PBD 2019 and spiritual heritage visits, the issue examines how overseas Indians partner in India’s transformation.',
      'This special edition documents milestone deliberations between diaspora delegates, industry stalwarts, and policymakers committed to deepening engagement between Bharat and its global community.',
    ],
    keyHighlights: [
      { label: 'Format', detail: 'Special Commemorative Magazine Edition' },
      { label: 'Occasion', detail: '15th Pravasi Bharatiya Divas (PBD 2019), Varanasi' },
      { label: 'Central Theme', detail: 'Role of Indian Diaspora in Building New India' },
      { label: 'Publisher', detail: 'Indian Diaspora Club (IDC) Publications' },
    ],
    featuredThemes: [
      '15th Pravasi Bharatiya Divas Keynote Perspectives',
      'Role of Overseas Indians in Building New India',
      'Cultural & Spiritual Reconnection in Varanasi',
      'Diaspora Youth, Innovation & Bilateral Cooperation',
    ],
  },
];

interface MagazineSectionProps {
  selectedEditionId: MagazineEditionId;
  onSelectEdition: (id: MagazineEditionId) => void;
  onSelectTab: (tab: NavTab) => void;
}

export const MagazineSection: React.FC<MagazineSectionProps> = ({
  selectedEditionId,
  onSelectEdition,
  onSelectTab,
}) => {
  const activeEdition =
    MAGAZINE_EDITIONS.find((item) => item.id === selectedEditionId) || MAGAZINE_EDITIONS[0];

  return (
    <section className="bg-[#FBF9F5] text-stone-900 min-h-[calc(100vh-5rem)]">
      {/* Top Institutional Hairline */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-700" />

      {/* Publications Masthead & Edition Selector */}
      <header className="border-b border-stone-300/80 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-700 mb-2.5">
            IDC Editorial &amp; Archival Publications
          </p>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold tracking-tight text-stone-950">
            Magazine &amp; Coffee Table Editions
          </h1>
          <p className="mt-3 text-base sm:text-lg text-stone-600 max-w-3xl leading-relaxed">
            Explore Indian Diaspora Club&apos;s commemorative coffee table volumes and special Pravasi Bharatiya Divas magazine editions celebrating global Indian achievement and heritage.
          </p>

          {/* 3-Edition Switcher Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {MAGAZINE_EDITIONS.map((edition) => {
              const isSelected = edition.id === activeEdition.id;
              return (
                <button
                  key={edition.id}
                  type="button"
                  onClick={() => onSelectEdition(edition.id)}
                  className={`text-left p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-orange-500 shadow-sm ring-1 ring-orange-500/40'
                      : 'bg-white/70 border-stone-200 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700">
                      Edition {edition.index}
                    </span>
                    <span className="text-[11px] font-medium text-stone-400">
                      {edition.editionYear}
                    </span>
                  </div>
                  <p className="font-editorial text-base sm:text-lg font-bold text-stone-950 leading-snug">
                    {edition.navTitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Active Publication Monograph View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Bespoke Archival Book / Magazine Cover Plate */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-stone-200/60 border border-stone-300/80 rounded-2xl p-6 sm:p-8">
              {/* Hardcover Book / Magazine Jacket Frame */}
              <div
                className={`relative aspect-[3/4] w-full max-w-sm mx-auto rounded-r-xl rounded-l-sm ${activeEdition.coverTheme.jacketBg} text-white shadow-2xl overflow-hidden flex`}
              >
                {/* Book Spine */}
                <div className={`w-3.5 sm:w-4 h-full shrink-0 ${activeEdition.coverTheme.spineBg} opacity-90`} />

                {/* Inner Foil Frame */}
                <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between">
                  <div
                    className={`h-full border ${activeEdition.coverTheme.borderAccent} p-5 sm:p-6 flex flex-col justify-between`}
                  >
                    {/* Top Emblem & Imprint */}
                    <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/15">
                      <div className="w-11 h-11 rounded-lg bg-white p-0.5 overflow-hidden shrink-0 flex items-center justify-center">
                        <img
                          src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.16.58_AM_66a822ca.jpeg"
                          alt="IDC Emblem"
                          className="w-full h-full object-contain scale-[1.28]"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300">
                          Indian Diaspora Club
                        </p>
                        <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] mt-0.5 ${activeEdition.coverTheme.kickerText}`}>
                          Official Publication
                        </p>
                      </div>
                    </div>

                    {/* Center Cover Typography */}
                    <div className="my-auto py-6">
                      <p className={`text-[11px] font-bold uppercase tracking-[0.22em] mb-3 ${activeEdition.coverTheme.kickerText}`}>
                        Edition {activeEdition.index}
                      </p>
                      <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                        {activeEdition.mainTitle}
                      </h2>
                      <div className="w-12 h-px bg-amber-400/70 my-4" />
                      <p className={`font-editorial text-lg sm:text-xl italic leading-snug ${activeEdition.coverTheme.foilText}`}>
                        {activeEdition.subtitle}
                      </p>
                    </div>

                    {/* Footer Colophon on Cover */}
                    <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-stone-300">
                      <span>IDC Archives</span>
                      <span>{activeEdition.editionYear}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs font-editorial italic text-stone-500 text-center mt-4">
                {activeEdition.navTitle} — Indian Diaspora Club Publication Archive
              </p>
            </div>
          </div>

          {/* Right Column: Curatorial Dossier & Publication Details */}
          <div className="lg:col-span-7">
            <div className="pb-6 mb-8 border-b border-stone-300/80">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
                {activeEdition.formatLabel}
              </p>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-stone-950 tracking-tight leading-tight">
                {activeEdition.navTitle}
              </h2>
              <p className="mt-4 text-base sm:text-lg font-medium text-stone-800 leading-relaxed max-w-prose">
                {activeEdition.summary}
              </p>
            </div>

            {/* Accession / Publication Metadata Definition List */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 py-6 mb-8 border-y border-stone-200 bg-white px-6 rounded-xl">
              {activeEdition.keyHighlights.map((item) => (
                <div key={item.label}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-400">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-stone-900">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>

            {/* Editorial Overview Prose */}
            <div className="space-y-5 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose mb-10">
              {activeEdition.editorialOverview.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Editorial Chapters / Themes */}
            <div className="bg-white border border-stone-200/90 rounded-xl p-6 sm:p-7 mb-10">
              <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-stone-200">
                <BookOpen className="w-4 h-4 text-orange-600" />
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-stone-900">
                  Featured Editorial Pillars in This Volume
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeEdition.featuredThemes.map((theme, idx) => (
                  <div key={theme} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-orange-600 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span className="text-sm font-medium text-stone-800 leading-snug">
                      {theme}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutional Inquiry / Feature Nomination Actions */}
            <div className="pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={() => onSelectTab('publish-contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
              >
                <span>Request Edition Copy / Nominate Feature</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('about')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-stone-100 text-stone-800 text-sm font-semibold rounded-lg border border-stone-300 transition-colors cursor-pointer"
              >
                <Landmark className="w-4 h-4 text-stone-500" />
                <span>About IDC Mandate</span>
              </button>
            </div>
          </div>
        </div>

        {/* All Three IDC Publications Quick Directory Strip */}
        <div className="mt-16 pt-12 border-t border-stone-300/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-1.5">
                Complete IDC Catalogue
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950">
                All Three Flagship Publications
              </h3>
            </div>
            <div className="flex items-center gap-5 text-xs font-semibold text-stone-500">
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-orange-600" />
                Global Distribution
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-orange-600" />
                Commemorative Editions
              </span>
            </div>
          </div>

          <div className="divide-y divide-stone-200 border-y border-stone-200 bg-white rounded-xl px-6">
            {MAGAZINE_EDITIONS.map((item) => {
              const isCurrent = item.id === activeEdition.id;
              return (
                <div
                  key={item.id}
                  className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span className="text-xs font-bold tracking-widest text-orange-600 mt-1 sm:mt-0">
                      {item.index}
                    </span>
                    <div>
                      <h4 className="font-editorial text-lg font-bold text-stone-950">
                        {item.navTitle}
                      </h4>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {item.formatLabel} · {item.editionYear}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectEdition(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`self-start sm:self-auto px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-stone-900 text-white'
                        : 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                    }`}
                  >
                    {isCurrent ? 'Viewing Edition' : 'Open Edition'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
