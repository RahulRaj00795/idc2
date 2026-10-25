import React from 'react';
import { NavTab } from '../types';
import { ArrowRight, Compass, Eye, Sparkles } from 'lucide-react';

interface AboutUsProps {
  onSelectTab?: (tab: NavTab) => void;
}

const CHAPTERS = [
  { id: 'about-idc', index: '01', label: 'About IDC' },
  { id: 'diaspora-strength', index: '02', label: 'Strength of the Diaspora' },
  { id: 'building-bridges', index: '03', label: 'Building Global Bridges' },
  { id: 'viksit-bharat-2047', index: '04', label: 'Viksit Bharat 2047' },
  { id: 'guiding-principles', index: '05', label: 'Vision, Mission & Philosophy' },
];

export const AboutUs: React.FC<AboutUsProps> = ({ onSelectTab }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="bg-[#FBF9F5] text-stone-900">
      {/* Top Institutional Hairline */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-700" />

      {/* Flagship Institutional Masthead */}
      <header className="border-b border-stone-300/80 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-9">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.16.58_AM_66a822ca.jpeg"
                alt="Indian Diaspora Club (IDC) Official Emblem"
                className="w-full h-full object-contain scale-[1.28]"
              />
            </div>

            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-700 mb-3">
                Institutional Charter &amp; Global Mandate
              </p>

              <h1 className="font-editorial text-3xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-stone-950 leading-[1.08]">
                INDIAN DIASPORA CLUB <span className="text-orange-600">(IDC)</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base lg:text-lg font-semibold text-stone-800 tracking-wide">
                Connecting Global Indians <span className="text-orange-500 mx-1.5">|</span> Celebrating Excellence <span className="text-orange-500 mx-1.5">|</span> Building Meaningful Partnerships
              </p>

              <p className="font-editorial mt-2.5 text-lg sm:text-2xl italic text-stone-700">
                One Heritage. One Global Community. One Shared Vision.
              </p>
            </div>
          </div>
        </div>

        {/* Chapter Index Navigation Rail */}
        <div className="border-t border-stone-200/90 bg-white/80 backdrop-blur-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
            <nav aria-label="About Us Chapters" className="flex items-center gap-2 sm:gap-6 min-w-max">
              {CHAPTERS.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToSection(ch.id)}
                  className="group inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <span className="text-[11px] font-bold tracking-widest text-orange-600">
                    {ch.index}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-stone-700 group-hover:text-stone-950 transition-colors">
                    {ch.label}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* CHAPTER 01: ABOUT INDIAN DIASPORA CLUB                                */}
      {/* ===================================================================== */}
      <section id="about-idc" className="bg-white border-b border-stone-200/90 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
                01 / Identity &amp; Purpose
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight leading-tight">
                About Indian Diaspora Club
              </h2>
              <div className="mt-5 pt-5 border-t border-stone-200 hidden lg:block">
                <p className="text-xs uppercase tracking-[0.16em] text-stone-400 font-semibold">
                  Constituency
                </p>
                <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                  People of Indian Origin (PIOs) &amp; Non-Resident Indians (NRIs) across leadership, enterprise, diplomacy, science, academia, and philanthropy.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-6 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose">
                <p className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:text-stone-950 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  Indian Diaspora Club (IDC) is a global platform dedicated to connecting, engaging, and honouring People of Indian Origin (PIOs) and Non-Resident Indians (NRIs) who have made significant contributions to their professions, communities, and societies across the world.
                </p>

                <p>
                  Founded on the belief that the Indian diaspora represents one of India&apos;s greatest global strengths, IDC works to build meaningful connections between India and its people living abroad. The organisation brings together distinguished leaders, entrepreneurs, policymakers, diplomats, philanthropists, academicians, scientists, professionals, and changemakers who share a common heritage and a commitment to making a positive difference.
                </p>

                {/* Editorial Pull Highlight — Top & Bottom Hairlines */}
                <div className="my-8 py-6 border-y border-orange-300/80 bg-[#FBF9F5] px-5 sm:px-7">
                  <p className="font-editorial text-lg sm:text-xl font-semibold text-stone-950 leading-relaxed">
                    At the heart of IDC&apos;s mission is a simple yet powerful objective: to connect the right people with the right opportunities for the right purpose, both in India and internationally.
                  </p>
                </div>

                <p>
                  IDC facilitates professional engagements, business collaborations, institutional partnerships, cultural exchanges, and purposeful visits to India for members of the diaspora. Whether an individual wishes to explore investment opportunities, establish professional relationships, contribute to philanthropic initiatives, reconnect with their roots, or engage with government and industry leaders, IDC strives to provide a trusted platform for meaningful engagement.
                </p>

                <p>
                  A central part of IDC&apos;s work is recognising and felicitating accomplished PIOs and NRIs whose achievements have brought distinction to India and the global Indian community. Through recognition programmes, international gatherings, leadership forums, and networking initiatives, IDC celebrates individuals who have demonstrated excellence, integrity, innovation, and service to society.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CHAPTER 02: CELEBRATING THE STRENGTH OF THE INDIAN DIASPORA           */}
      {/* ===================================================================== */}
      <section id="diaspora-strength" className="bg-[#FBF9F5] border-b border-stone-200/90 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
                02 / Global Excellence &amp; Heritage
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight leading-tight">
                Celebrating the Strength of the Indian Diaspora
              </h2>
              <div className="mt-5 pt-5 border-t border-stone-300/70 hidden lg:block">
                <p className="text-xs uppercase tracking-[0.16em] text-stone-400 font-semibold">
                  Enduring Values
                </p>
                <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                  Family · Education · Community · Service
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-6 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose">
                <p>
                  The Indian diaspora has emerged as a remarkable force for economic growth, innovation, cultural exchange, and social development across the world.
                </p>

                <p>
                  From leading multinational corporations and advancing scientific discoveries to contributing to public policy, education, healthcare, philanthropy, and the arts, people of Indian origin have earned respect and recognition through their achievements, dedication, and leadership.
                </p>

                <div className="my-7 py-5 border-y border-stone-300">
                  <p className="font-editorial text-xl sm:text-2xl italic text-stone-900 leading-relaxed">
                    What makes the Indian diaspora truly exceptional is not only its professional success but also its enduring connection to India.
                  </p>
                </div>

                <p>
                  Despite living across different continents and embracing diverse cultures, generations of overseas Indians have continued to preserve the values, traditions, and cultural heritage that define their Indian identity. Their respect for family, education, community, and service reflects the timeless strength of Indian civilisation.
                </p>

                <p>
                  IDC believes that this unique combination of global achievement and deep-rooted cultural identity creates an extraordinary opportunity to strengthen India&apos;s relationships with the world.
                </p>

                <p>
                  By bringing together the experience, influence, knowledge, and resources of the diaspora, IDC seeks to encourage collaboration that benefits individuals, institutions, communities, and nations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CHAPTER 03: BUILDING BRIDGES BETWEEN INDIA AND THE WORLD              */}
      {/* ===================================================================== */}
      <section id="building-bridges" className="bg-white border-b border-stone-200/90 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
                03 / Dialogue &amp; Cooperation
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight leading-tight">
                Building Bridges Between India and the World
              </h2>
              <div className="mt-5 pt-5 border-t border-stone-200 hidden lg:block">
                <p className="text-xs uppercase tracking-[0.16em] text-stone-400 font-semibold">
                  Focus Areas
                </p>
                <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                  International Investment · Policy Engagement · Cultural Understanding · Social Responsibility
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-6 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose">
                <p>
                  Indian Diaspora Club serves as a bridge between India and the global Indian community, creating opportunities for dialogue, cooperation, and lasting partnerships.
                </p>

                <p>
                  Our efforts focus on encouraging international business and investment connections, facilitating engagement with policymakers and institutions, promoting cultural understanding, supporting social initiatives, and providing a platform where accomplished individuals can share their knowledge and experience.
                </p>

                <p>
                  Beyond professional networking, IDC recognises the importance of giving back to society. Through initiatives in education, healthcare, community welfare, philanthropy, and social responsibility, the organisation seeks to encourage individuals and institutions to use their success and influence for the greater good.
                </p>

                <div className="my-7 py-5 border-y border-stone-300 bg-[#FBF9F5] px-5 sm:px-7">
                  <p className="font-editorial text-lg sm:text-xl italic text-stone-900 leading-relaxed">
                    We believe that the true strength of a global community lies not merely in the achievements of its members, but in what they can accomplish together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CHAPTER 04: CONTRIBUTING TO THE VISION OF VIKSIT BHARAT 2047          */}
      {/* ===================================================================== */}
      <section id="viksit-bharat-2047" className="bg-[#FBF9F5] border-b border-stone-200/90 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-800 mb-2">
                04 / National Horizon · 2047
              </p>
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-950 tracking-tight leading-tight">
                Contributing to the Vision of Viksit Bharat 2047
              </h2>
              <div className="mt-5 pt-5 border-t border-stone-300/70 hidden lg:block">
                <p className="text-xs uppercase tracking-[0.16em] text-stone-400 font-semibold">
                  Strategic Corridors
                </p>
                <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                  Business · Technology · Education · Innovation · Investment · Governance · Philanthropy
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-6 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose">
                <p>
                  As India moves towards its vision of becoming a developed nation by 2047, the global Indian diaspora has an important role to play in shaping the country&apos;s future.
                </p>

                <p>
                  Indian Diaspora Club is committed to encouraging greater participation by overseas Indians in India&apos;s journey of progress and transformation.
                </p>

                <p>
                  By fostering connections across business, technology, education, innovation, investment, governance, and philanthropy, IDC seeks to create avenues through which the global Indian community can contribute its expertise, experience, and international networks towards India&apos;s development.
                </p>

                <p className="font-medium text-stone-900">
                  Our aspiration is to see a globally connected Indian community that remains proud of its heritage while actively contributing to a prosperous, inclusive, and forward-looking India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CHAPTER 05: OUR VISION, OUR MISSION & OUR PHILOSOPHY                  */}
      {/* ===================================================================== */}
      <section id="guiding-principles" className="bg-white border-b border-stone-200/90 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="pb-8 mb-10 border-b border-stone-200">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-700 mb-2">
              05 / Guiding Principles
            </p>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-stone-950 tracking-tight">
              Vision, Mission &amp; Philosophy
            </h2>
          </div>

          {/* Vision & Mission Two-Column Architectural Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-10">
            {/* Our Vision */}
            <div className="bg-[#FBF9F5] border border-stone-200/90 rounded-2xl p-7 sm:p-9 flex flex-col">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/80 flex items-center justify-center text-orange-700">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-stone-950">
                    Our Vision
                  </h3>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">
                  I
                </span>
              </div>
              <p className="text-stone-700 text-base sm:text-[17px] leading-[1.8]">
                To build a respected and influential global network that connects the Indian diaspora with its motherland, celebrates outstanding achievements, promotes international cooperation, and inspires individuals to contribute towards a stronger India and a better world.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-[#FBF9F5] border border-stone-200/90 rounded-2xl p-7 sm:p-9 flex flex-col">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial text-2xl font-bold text-stone-950">
                    Our Mission
                  </h3>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">
                  II
                </span>
              </div>
              <p className="text-stone-700 text-base sm:text-[17px] leading-[1.8]">
                To strengthen relationships between India and its diaspora by facilitating meaningful connections, recognising excellence, encouraging professional and institutional collaborations, promoting Indian heritage and cultural values, and supporting initiatives that create a positive and lasting impact on society.
              </p>
            </div>
          </div>

          {/* Our Philosophy — Full-Width Institutional Statement */}
          <div className="bg-[#FBF9F5] border border-stone-200/90 rounded-2xl p-7 sm:p-10">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950">
                  Our Philosophy
                </h3>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone-400">
                III
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 text-stone-700 text-base sm:text-[17px] leading-[1.85]">
              <p>
                We believe that every successful Indian abroad represents a connection to India, every meaningful relationship creates an opportunity, and every act of service strengthens the bond between our global community and its roots.
              </p>
              <p className="font-medium text-stone-900">
                For Indian Diaspora Club, connecting people is only the beginning. Our greater purpose is to transform those connections into opportunities, partnerships, and contributions that benefit generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* CLOSING INSTITUTIONAL SIGN-OFF                                        */}
      {/* ===================================================================== */}
      <footer className="bg-stone-950 text-stone-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-px bg-orange-500 mx-auto mb-8" />

          <h2 className="font-editorial text-2xl sm:text-4xl font-bold tracking-wide text-white">
            INDIAN DIASPORA CLUB
          </h2>

          <p className="mt-3 text-base sm:text-xl font-semibold text-orange-400 tracking-wide">
            Connecting Roots. Inspiring Excellence. Building Global Bridges.
          </p>

          <p className="font-editorial mt-3 text-base sm:text-xl italic text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Bringing the Global Indian Community Together for a Shared Purpose and a Better Tomorrow.
          </p>

          {onSelectTab && (
            <div className="mt-9 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                type="button"
                onClick={() => onSelectTab('publish-contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
              >
                <span>Engage With IDC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('events')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-200 text-sm font-semibold rounded-lg border border-stone-700 transition-colors cursor-pointer"
              >
                Explore Upcoming Events
              </button>
            </div>
          )}
        </div>
      </footer>
    </article>
  );
};
