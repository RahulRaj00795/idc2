import React from 'react';
import { NavTab } from '../types';
import { ArrowRight, Globe2, Handshake, Landmark, Compass } from 'lucide-react';

interface HomeIdcIntroProps {
  onSelectTab: (tab: NavTab) => void;
}

export const HomeIdcIntro: React.FC<HomeIdcIntroProps> = ({ onSelectTab }) => {
  return (
    <section className="bg-[#FBF9F5] border-b border-stone-200/90 text-stone-900">
      {/* Subtle Top Institutional Hairline */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-700" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Flagship Institutional Masthead */}
        <div className="pb-10 sm:pb-12 border-b border-stone-300/80 flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-stone-200/90 shadow-xs overflow-hidden shrink-0 flex items-center justify-center">
            <img
              src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.16.58_AM_66a822ca.jpeg"
              alt="Indian Diaspora Club (IDC) Official Emblem"
              className="w-full h-full object-contain scale-[1.28]"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-700 mb-2.5">
              Global NRI &amp; PIO Institutional Platform
            </p>

            <h1 className="font-editorial text-3xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-stone-950 leading-[1.1]">
              INDIAN DIASPORA CLUB <span className="text-orange-600">(IDC)</span>
            </h1>

            {/* Three Pillars Subtitle */}
            <p className="mt-4 text-sm sm:text-base lg:text-lg font-semibold text-stone-800 tracking-wide">
              Connecting Global Indians <span className="text-orange-500 mx-1.5">|</span> Celebrating Excellence <span className="text-orange-500 mx-1.5">|</span> Building Meaningful Partnerships
            </p>

            {/* Shared Vision Tagline */}
            <p className="font-editorial mt-2 text-lg sm:text-xl lg:text-2xl italic text-stone-700">
              One Heritage. One Global Community. One Shared Vision.
            </p>
          </div>
        </div>

        {/* Asymmetric Two-Column Editorial Narrative & Engagement Directory */}
        <div className="pt-10 sm:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: About Indian Diaspora Club (Full Verbatim Prose) */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                About Indian Diaspora Club
              </h2>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400 hidden sm:inline">
                Charter &amp; Mandate
              </span>
            </div>

            <div className="space-y-5 text-stone-700 text-base sm:text-[17px] leading-[1.8] max-w-prose">
              <p>
                Indian Diaspora Club (IDC) is a global platform dedicated to connecting, engaging, and honouring People of Indian Origin (PIOs) and Non-Resident Indians (NRIs) who have made significant contributions to their professions, communities, and societies across the world.
              </p>

              <p>
                Founded on the belief that the Indian diaspora represents one of India&apos;s greatest global strengths, IDC works to build meaningful connections between India and its people living abroad. The organisation brings together distinguished leaders, entrepreneurs, policymakers, diplomats, philanthropists, academicians, scientists, professionals, and changemakers who share a common heritage and a commitment to making a positive difference.
              </p>

              {/* Editorial Pull-Highlight with Top & Bottom Hairlines */}
              <div className="my-7 py-5 border-y border-orange-300/70 bg-orange-50/40 px-5 sm:px-6">
                <p className="font-editorial text-lg sm:text-xl font-semibold text-stone-900 leading-relaxed">
                  At the heart of IDC&apos;s mission is a simple yet powerful objective: to connect the right people with the right opportunities for the right purpose, both in India and internationally.
                </p>
              </div>

              <p>
                IDC facilitates professional engagements, business collaborations, institutional partnerships, cultural exchanges, and purposeful visits to India for members of the diaspora. Whether an individual wishes to explore investment opportunities, establish professional relationships, contribute to philanthropic initiatives, reconnect with their roots, or engage with government and industry leaders, IDC strives to provide a trusted platform for meaningful engagement.
              </p>
            </div>
          </div>

          {/* Right Column: Institutional Pathways & Direct Actions */}
          <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="pb-4 mb-5 border-b border-stone-200">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                Strategic Pillars of Engagement
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mt-1">
                Bridging Global Indians &amp; India
              </h3>
            </div>

            <div className="divide-y divide-stone-200/80">
              <div className="py-4 first:pt-0 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-200/70 flex items-center justify-center text-orange-700 shrink-0 mt-0.5">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Global Leadership &amp; Recognition
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    Honouring distinguished PIOs and NRIs across science, diplomacy, enterprise, academia, and public service.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
                  <Handshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Business &amp; Institutional Partnerships
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    Connecting diaspora investors, founders, and institutions with bilateral trade and collaborative ventures.
                  </p>
                </div>
              </div>

              <div className="py-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Policy, Industry &amp; Philanthropy
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    Facilitating trusted dialogue with government and industry leaders alongside high-impact social initiatives.
                  </p>
                </div>
              </div>

              <div className="py-4 last:pb-0 flex items-start gap-4">
                <div className="w-9 h-9 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-700 shrink-0 mt-0.5">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Heritage &amp; Purposeful Visits to India
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                    Curating cultural exchanges and purposeful delegations for global Indians reconnecting with their roots.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Navigation Actions */}
            <div className="mt-7 pt-6 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectTab('publish-contact')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer"
              >
                <span>Engage With IDC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectTab('nri-pio')}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold rounded-lg border border-stone-200 transition-colors cursor-pointer"
              >
                NRI / PIO Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
