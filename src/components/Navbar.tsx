import React, { useState, useRef, useEffect } from 'react';
import { MagazineEditionId, NavTab } from '../types';
import { MAGAZINE_EDITIONS } from './MagazineSection';
import { Menu, X, ChevronDown, BookOpen } from 'lucide-react';

const IDC_LOGO_PATH = '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.16.58_AM_66a822ca.jpeg';

interface NavbarProps {
  currentTab: NavTab;
  selectedMagazineId?: MagazineEditionId;
  onSelectTab: (tab: NavTab) => void;
  onSelectMagazine?: (id: MagazineEditionId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  selectedMagazineId,
  onSelectTab,
  onSelectMagazine,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [magazineDropdownOpen, setMagazineDropdownOpen] = useState(false);
  const [mobileMagazineOpen, setMobileMagazineOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMagazineDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMagazineDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (tab: NavTab) => {
    setMagazineDropdownOpen(false);
    onSelectTab(tab);
  };

  const handleSelectEdition = (id: MagazineEditionId) => {
    onSelectMagazine?.(id);
    onSelectTab('magazine');
    setMagazineDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-xs transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white text-xs py-1.5 px-4 font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span>Connecting Global Indians | Celebrating Excellence | Building Meaningful Partnerships</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-[11px] opacity-90">
            <span>One Heritage. One Global Community. One Shared Vision.</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22 gap-3">
          {/* Official Indian Diaspora Club Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group shrink-0"
          >
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-xl bg-white border border-stone-200/80 shadow-xs overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={IDC_LOGO_PATH}
                alt="Indian Diaspora Club (IDC) Logo"
                className="w-full h-full object-contain scale-[1.35] group-hover:scale-[1.42] transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl xl:text-2xl tracking-tight text-gray-900 group-hover:text-orange-600 transition-colors">
                  INDIAN DIASPORA
                </span>
                <span className="font-black text-xl xl:text-2xl tracking-tight text-orange-600">
                  CLUB
                </span>
              </div>
              <p className="text-[11px] font-semibold text-gray-500 tracking-wider uppercase">
                Global NRI &amp; PIO Federation
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {/* HOME */}
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3 xl:px-4 py-2.5 rounded-lg text-xs xl:text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 ring-2 ring-orange-500 ring-offset-2'
                  : 'text-orange-700 bg-orange-50 hover:bg-orange-100 hover:text-orange-800'
              }`}
            >
              HOME
            </button>

            {/* ABOUT US */}
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className={`px-3 xl:px-3.5 py-2.5 rounded-lg text-xs xl:text-sm font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              ABOUT US
            </button>

            {/* NRI / PIO */}
            <button
              type="button"
              onClick={() => handleNavClick('nri-pio')}
              className={`px-3 xl:px-3.5 py-2.5 rounded-lg text-xs xl:text-sm font-semibold uppercase tracking-wider transition-all duration-150 flex items-center space-x-1.5 cursor-pointer ${
                currentTab === 'nri-pio'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              <span>NRI / PIO</span>
              <span
                className={`px-1.5 py-0.5 text-[10px] rounded-sm font-bold ${
                  currentTab === 'nri-pio'
                    ? 'bg-white/20 text-white'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                Hub
              </span>
            </button>

            {/* Events */}
            <button
              type="button"
              onClick={() => handleNavClick('events')}
              className={`px-3 xl:px-3.5 py-2.5 rounded-lg text-xs xl:text-sm font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                currentTab === 'events'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              Events
            </button>

            {/* Magazine Dropdown Header (On Click shows 3 Names) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-expanded={magazineDropdownOpen}
                aria-haspopup="menu"
                onClick={() => setMagazineDropdownOpen((prev) => !prev)}
                className={`px-3 xl:px-3.5 py-2.5 rounded-lg text-xs xl:text-sm font-semibold uppercase tracking-wider transition-all duration-150 inline-flex items-center space-x-1.5 cursor-pointer ${
                  currentTab === 'magazine' || magazineDropdownOpen
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/60'
                }`}
              >
                <span>Magazine</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    magazineDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {magazineDropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2.5 w-96 bg-white rounded-xl border border-stone-200 shadow-xl py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 py-2.5 border-b border-stone-100 bg-[#FBF9F5] flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-700 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      IDC Publications &amp; Editions
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                      3 Volumes
                    </span>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {MAGAZINE_EDITIONS.map((edition) => {
                      const isActive =
                        currentTab === 'magazine' && selectedMagazineId === edition.id;
                      return (
                        <button
                          key={edition.id}
                          type="button"
                          role="menuitem"
                          onClick={() => handleSelectEdition(edition.id)}
                          className={`w-full text-left px-4 py-3.5 transition-colors flex items-start gap-3 cursor-pointer ${
                            isActive
                              ? 'bg-orange-50/90 text-orange-950'
                              : 'hover:bg-stone-50 text-stone-800'
                          }`}
                        >
                          <span className="text-xs font-bold tracking-wider text-orange-600 mt-0.5 shrink-0">
                            {edition.index}.
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold leading-snug text-stone-900">
                              {edition.navTitle}
                            </p>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              {edition.editionYear}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Publish / Contact US */}
            <button
              type="button"
              onClick={() => handleNavClick('publish-contact')}
              className={`px-3 xl:px-3.5 py-2.5 rounded-lg text-xs xl:text-sm font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                currentTab === 'publish-contact'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/60'
              }`}
            >
              Publish / Contact US
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 focus:outline-hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-orange-100 px-4 pt-2 pb-6 space-y-2">
          <button
            type="button"
            onClick={() => {
              handleNavClick('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider cursor-pointer ${
              currentTab === 'home'
                ? 'bg-orange-600 text-white'
                : 'text-orange-700 bg-orange-50'
            }`}
          >
            HOME
          </button>

          <button
            type="button"
            onClick={() => {
              handleNavClick('about');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold text-sm uppercase cursor-pointer ${
              currentTab === 'about' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            ABOUT US
          </button>

          <button
            type="button"
            onClick={() => {
              handleNavClick('nri-pio');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold text-sm uppercase cursor-pointer ${
              currentTab === 'nri-pio' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            NRI / PIO HUB
          </button>

          <button
            type="button"
            onClick={() => {
              handleNavClick('events');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold text-sm uppercase cursor-pointer ${
              currentTab === 'events' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Events
          </button>

          {/* Mobile Magazine Accordion Header */}
          <div className="rounded-lg border border-stone-200/80 overflow-hidden">
            <button
              type="button"
              aria-expanded={mobileMagazineOpen}
              onClick={() => setMobileMagazineOpen((prev) => !prev)}
              className={`w-full flex items-center justify-between px-4 py-2.5 font-semibold text-sm uppercase cursor-pointer ${
                currentTab === 'magazine'
                  ? 'bg-orange-600 text-white'
                  : 'text-gray-700 bg-stone-50/70 hover:bg-gray-50'
              }`}
            >
              <span>Magazine</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileMagazineOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {mobileMagazineOpen && (
              <div className="bg-[#FBF9F5] divide-y divide-stone-200/70 border-t border-stone-200/80">
                {MAGAZINE_EDITIONS.map((edition) => {
                  const isActive =
                    currentTab === 'magazine' && selectedMagazineId === edition.id;
                  return (
                    <button
                      key={edition.id}
                      type="button"
                      onClick={() => handleSelectEdition(edition.id)}
                      className={`w-full text-left px-4 py-3 flex items-start gap-2.5 cursor-pointer ${
                        isActive ? 'bg-orange-50 text-orange-950' : 'text-stone-800 hover:bg-stone-100/70'
                      }`}
                    >
                      <span className="text-xs font-bold text-orange-600 mt-0.5 shrink-0">
                        {edition.index}.
                      </span>
                      <span className="text-xs sm:text-sm font-semibold leading-snug">
                        {edition.navTitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              handleNavClick('publish-contact');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold text-sm uppercase cursor-pointer ${
              currentTab === 'publish-contact' ? 'bg-orange-600 text-white' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Publish / Contact US
          </button>
        </div>
      )}
    </header>
  );
};
