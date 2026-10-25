import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Exact Layout from Sketch: "Twitter | Facebook | Instagram | Youtube" */}
        <div className="flex flex-col items-center justify-center pb-12 border-b border-slate-800">
          <div className="text-xs uppercase font-bold tracking-widest text-orange-400 mb-4">
            Connect Across Social Platforms
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 text-sm sm:text-base font-semibold text-slate-200">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-orange-600 text-slate-200 hover:text-white transition-all border border-slate-800 hover:border-orange-500 flex items-center space-x-1.5"
            >
              <span>Twitter</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-orange-600 text-slate-200 hover:text-white transition-all border border-slate-800 hover:border-orange-500 flex items-center space-x-1.5"
            >
              <span>Facebook</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-orange-600 text-slate-200 hover:text-white transition-all border border-slate-800 hover:border-orange-500 flex items-center space-x-1.5"
            >
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-orange-600 text-slate-200 hover:text-white transition-all border border-slate-800 hover:border-orange-500 flex items-center space-x-1.5"
            >
              <span>Youtube</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Navigation & Branding Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-b border-slate-800 text-sm">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-xl bg-white overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.16.58_AM_66a822ca.jpeg"
                  alt="Indian Diaspora Club Logo"
                  className="w-full h-full object-contain scale-[1.35]"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                INDIAN DIASPORA <span className="text-orange-500">CLUB</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Serving the 32+ million strong Indian diaspora across North America, Europe, Gulf Cooperation Council, Southeast Asia, Oceania, and Africa.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Explore Sections
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectTab('home')} className="hover:text-orange-400 transition cursor-pointer">
                  Home (Diaspora Achievers)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('about')} className="hover:text-orange-400 transition cursor-pointer">
                  About Us &amp; Pravasi Pillars
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('nri-pio')} className="hover:text-orange-400 transition cursor-pointer">
                  NRI / PIO Legal &amp; Banking Hub
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('events')} className="hover:text-orange-400 transition cursor-pointer">
                  Global Events Calendar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('magazine')} className="hover:text-orange-400 transition cursor-pointer">
                  Magazine &amp; Coffee Table Editions
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
              Contribution &amp; Support
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectTab('publish-contact')} className="hover:text-orange-400 transition cursor-pointer">
                  Submit Story for Publication
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('publish-contact')} className="hover:text-orange-400 transition cursor-pointer">
                  Contact Editorial Bureau
                </button>
              </li>
              <li>
                <a href="https://mea.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                  Ministry of External Affairs
                </a>
              </li>
              <li>
                <a href="https://ociservices.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                  Official OCI Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Indian Diaspora Club. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>One Heritage. One Global Community. One Shared Vision.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
