import React, { useState } from 'react';
import { NavTab } from '../types';

interface AboutUsProps {
  onSelectTab?: (tab: NavTab) => void;
}

export const AboutUs: React.FC<AboutUsProps> = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <article className="bg-[#FAF7F2] text-stone-900">
      {/* Top Tricolor Hairline */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-700" />

      {/* Section 1: About Indian Diaspora Club */}
      <section className="bg-white border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-stone-950 tracking-tight leading-[1.2] text-balance">
                About Indian Diaspora Club
              </h2>
              <div className="w-12 h-0.5 bg-orange-600 mt-5" />
            </div>

            <div className="lg:col-span-8 space-y-6 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose">
              <p className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:text-orange-700 first-letter:float-left first-letter:mr-3.5 first-letter:mt-1 first-letter:leading-none">
                Indian Diaspora Club (IDC) is a global platform dedicated to connecting, engaging, and honouring People of Indian Origin (PIOs) and Non-Resident Indians (NRIs) who have made significant contributions to their professions, communities, and societies across the world.
              </p>

              <p>
                Founded on the belief that the Indian diaspora represents one of India&apos;s greatest global strengths, IDC works to build meaningful connections between India and its people living abroad. The organisation brings together distinguished leaders, entrepreneurs, policymakers, diplomats, philanthropists, academicians, scientists, professionals, and changemakers who share a common heritage and a commitment to making a positive difference.
              </p>

              <div className="my-8 py-6 px-6 sm:px-8 border-y border-orange-300/80 bg-[#FAF7F2]">
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
      </section>

      {/* Section 2: Celebrating the Strength of the Indian Diaspora */}
      <section className="bg-[#FAF7F2] border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-stone-950 tracking-tight leading-[1.2] text-balance">
                Celebrating the Strength of the Indian Diaspora
              </h2>
              <div className="w-12 h-0.5 bg-emerald-700 mt-5" />
            </div>

            <div className="lg:col-span-8 space-y-6 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose">
              <p>
                The Indian diaspora has emerged as a remarkable force for economic growth, innovation, cultural exchange, and social development across the world.
              </p>

              <p>
                From leading multinational corporations and advancing scientific discoveries to contributing to public policy, education, healthcare, philanthropy, and the arts, people of Indian origin have earned respect and recognition through their achievements, dedication, and leadership.
              </p>

              <div className="my-7 py-6 border-y border-stone-300/90">
                <p className="font-editorial text-xl sm:text-2xl italic text-stone-950 leading-relaxed">
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
      </section>

      {/* Section 3: Building Bridges Between India and the World */}
      <section className="bg-white border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-stone-950 tracking-tight leading-[1.2] text-balance">
                Building Bridges Between India and the World
              </h2>
              <div className="w-12 h-0.5 bg-amber-600 mt-5" />
            </div>

            <div className="lg:col-span-8 space-y-6 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose">
              <p>
                Indian Diaspora Club serves as a bridge between India and the global Indian community, creating opportunities for dialogue, cooperation, and lasting partnerships.
              </p>

              <p>
                Our efforts focus on encouraging international business and investment connections, facilitating engagement with policymakers and institutions, promoting cultural understanding, supporting social initiatives, and providing a platform where accomplished individuals can share their knowledge and experience.
              </p>

              <p>
                Beyond professional networking, IDC recognises the importance of giving back to society. Through initiatives in education, healthcare, community welfare, philanthropy, and social responsibility, the organisation seeks to encourage individuals and institutions to use their success and influence for the greater good.
              </p>

              <div className="my-7 py-6 px-6 sm:px-8 border-y border-stone-300/80 bg-[#FAF7F2]">
                <p className="font-editorial text-lg sm:text-xl italic text-stone-950 leading-relaxed">
                  We believe that the true strength of a global community lies not merely in the achievements of its members, but in what they can accomplish together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Contributing to the Vision of Viksit Bharat 2047 */}
      <section className="bg-[#FAF7F2] border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <h2 className="font-editorial text-2xl sm:text-3xl lg:text-[2.15rem] font-bold text-stone-950 tracking-tight leading-[1.2] text-balance">
                Contributing to the Vision of Viksit Bharat 2047
              </h2>
              <div className="w-14 h-0.5 bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-700 mt-5" />
            </div>

            <div className="lg:col-span-8 space-y-6 text-stone-700 text-base sm:text-[17px] leading-[1.85] max-w-prose">
              <p>
                As India moves towards its vision of becoming a developed nation by 2047, the global Indian diaspora has an important role to play in shaping the country&apos;s future.
              </p>

              <p>
                Indian Diaspora Club is committed to encouraging greater participation by overseas Indians in India&apos;s journey of progress and transformation.
              </p>

              <p>
                By fostering connections across business, technology, education, innovation, investment, governance, and philanthropy, IDC seeks to create avenues through which the global Indian community can contribute its expertise, experience, and international networks towards India&apos;s development.
              </p>

              <p className="font-medium text-stone-950">
                Our aspiration is to see a globally connected Indian community that remains proud of its heritage while actively contributing to a prosperous, inclusive, and forward-looking India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Vision, Mission & Philosophy */}
      <section className="bg-white border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 space-y-8 lg:space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
            {/* Our Vision */}
            <div className="bg-[#FAF7F2] border border-stone-200/90 rounded-2xl p-7 sm:p-10 flex flex-col">
              <div className="pb-4 mb-5 border-b border-stone-200/90">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                  Our Vision
                </h2>
              </div>
              <p className="text-stone-700 text-base sm:text-[17px] leading-[1.85]">
                To build a respected and influential global network that connects the Indian diaspora with its motherland, celebrates outstanding achievements, promotes international cooperation, and inspires individuals to contribute towards a stronger India and a better world.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-[#FAF7F2] border border-stone-200/90 rounded-2xl p-7 sm:p-10 flex flex-col">
              <div className="pb-4 mb-5 border-b border-stone-200/90">
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                  Our Mission
                </h2>
              </div>
              <p className="text-stone-700 text-base sm:text-[17px] leading-[1.85]">
                To strengthen relationships between India and its diaspora by facilitating meaningful connections, recognising excellence, encouraging professional and institutional collaborations, promoting Indian heritage and cultural values, and supporting initiatives that create a positive and lasting impact on society.
              </p>
            </div>
          </div>

          {/* Our Philosophy */}
          <div className="bg-[#FAF7F2] border border-stone-200/90 rounded-2xl p-7 sm:p-10">
            <div className="pb-4 mb-6 border-b border-stone-200/90">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-stone-950 tracking-tight">
                Our Philosophy
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 text-stone-700 text-base sm:text-[17px] leading-[1.85]">
              <p>
                We believe that every successful Indian abroad represents a connection to India, every meaningful relationship creates an opportunity, and every act of service strengthens the bond between our global community and its roots.
              </p>
              <p className="font-medium text-stone-950">
                For Indian Diaspora Club, connecting people is only the beginning. Our greater purpose is to transform those connections into opportunities, partnerships, and contributions that benefit generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Institutional Sign-Off */}
      <footer className="bg-stone-950 text-stone-100 py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-px bg-orange-500 mx-auto mb-8" />

          <h2 className="font-editorial text-2xl sm:text-4xl font-bold tracking-wide text-white">
            INDIAN DIASPORA CLUB
          </h2>

          <p className="mt-3 text-base sm:text-xl font-semibold text-orange-400 tracking-wide text-balance">
            Connecting Roots. Inspiring Excellence. Building Global Bridges.
          </p>

          <p className="font-editorial mt-3 text-base sm:text-xl italic text-stone-300 max-w-2xl mx-auto leading-relaxed text-balance">
            Bringing the Global Indian Community Together for a Shared Purpose and a Better Tomorrow.
          </p>
        </div>
      </footer>
    </article>
  );
};


