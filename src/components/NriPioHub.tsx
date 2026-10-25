import React, { useState } from 'react';
import { FileText, Landmark, Shield, HelpCircle, Compass, CheckCircle2, ExternalLink } from 'lucide-react';

export const NriPioHub: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'oci' | 'banking' | 'property' | 'faq'>('oci');

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>Official Resource Center</span>
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">
          NRI &amp; PIO <span className="text-orange-600">Guidance Hub</span>
        </h1>
        <p className="mt-3 text-base text-gray-600">
          Essential legal, financial, property, and consular information for Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs / PIOs).
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex justify-center border-b border-gray-200 mb-10 overflow-x-auto scrollbar-none">
        <div className="flex space-x-3 sm:space-x-8">
          <button
            onClick={() => setActiveSubTab('oci')}
            className={`py-3 px-3 sm:px-4 font-bold text-sm border-b-2 flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeSubTab === 'oci'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>OCI &amp; Visas</span>
          </button>

          <button
            onClick={() => setActiveSubTab('banking')}
            className={`py-3 px-3 sm:px-4 font-bold text-sm border-b-2 flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeSubTab === 'banking'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Landmark className="w-4 h-4" />
            <span>NRE/NRO Banking</span>
          </button>

          <button
            onClick={() => setActiveSubTab('property')}
            className={`py-3 px-3 sm:px-4 font-bold text-sm border-b-2 flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeSubTab === 'property'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Property &amp; Real Estate</span>
          </button>

          <button
            onClick={() => setActiveSubTab('faq')}
            className={`py-3 px-3 sm:px-4 font-bold text-sm border-b-2 flex items-center space-x-2 transition-colors whitespace-nowrap ${
              activeSubTab === 'faq'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ &amp; Rights</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeSubTab === 'oci' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Overseas Citizen of India (OCI) Card Privileges
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              The OCI card grants lifelong multi-entry, multi-purpose visa privileges for visiting India, granting registered cardholders parity with Indian citizens in most economic, educational, and financial spheres.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-orange-50/60 rounded-xl border border-orange-100">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Lifelong Multiple-Entry Visa</h4>
                  <p className="text-xs text-gray-600 mt-1">Exemption from registration with the Foreign Regional Registration Officer (FRRO) for any length of stay in India.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-orange-50/60 rounded-xl border border-orange-100">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Economic &amp; Financial Parity</h4>
                  <p className="text-xs text-gray-600 mt-1">Full equality with NRIs in matters of purchasing non-agricultural immovable property, opening Indian bank accounts, and investment avenues.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-orange-50/60 rounded-xl border border-orange-100">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Professional Pursuits</h4>
                  <p className="text-xs text-gray-600 mt-1">Permission to practice professions in India such as doctors, dentists, architects, and chartered accountants in accordance with relevant statutory provisions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 bg-orange-600 text-white text-[11px] font-bold rounded-md uppercase">
                Consular Checklist
              </span>
              <h3 className="text-xl font-bold mt-4">Applying for OCI Card</h3>
              <ul className="mt-4 space-y-3 text-xs text-slate-300">
                <li>• Proof of Indian origin (Passport/Nativity certificate of self, parents, or grandparents)</li>
                <li>• Current foreign citizenship passport &amp; surrender certificate of previous Indian passport</li>
                <li>• Address proof in country of residence</li>
                <li>• Certified marriage certificate (if applying under spouse category)</li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              <a
                href="https://ociservices.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold text-orange-400 hover:text-orange-300"
              >
                <span>Visit Official OCI Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'banking' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-2">NRE Account (Non-Resident External)</h3>
            <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-4">For Foreign Earnings</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>• Maintained in Indian Rupees (INR) from foreign currency transfers.</li>
              <li>• Principal and interest are 100% tax-free in India.</li>
              <li>• Free and full repatriability of funds back to your overseas account.</li>
              <li>• Can be opened jointly with another NRI or resident Indian relative on former/survivor basis.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-2">NRO Account (Non-Resident Ordinary)</h3>
            <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mb-4">For Income Originating in India</p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>• Best for managing rent, dividends, pensions, or sale proceeds generated in India.</li>
              <li>• Interest earned is subject to Tax Deducted at Source (TDS) under Indian tax laws or DTAA treaties.</li>
              <li>• Repatriable up to USD 1 Million per financial year under RBI guidelines.</li>
              <li>• Enables seamless bill payments, utility settlements, and local transfers inside India.</li>
            </ul>
          </div>
        </div>
      )}

      {activeSubTab === 'property' && (
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xs max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Estate Rules for NRIs &amp; OCIs</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Under general permission from the Reserve Bank of India (RBI) and FEMA, NRIs and OCIs can purchase any residential or commercial property in India without prior approvals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="font-bold text-emerald-900 block mb-1">✓ Allowed:</span>
              <p className="text-emerald-800 text-xs">
                Residential houses, flats, luxury apartments, commercial office spaces, and retail shops. No cap on the number of properties owned.
              </p>
            </div>
            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
              <span className="font-bold text-rose-900 block mb-1">✗ Prohibited (without special RBI nod):</span>
              <p className="text-rose-800 text-xs">
                Agricultural land, farmhouses, and plantation properties cannot be directly acquired or bought by NRIs/OCIs.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'faq' && (
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 text-base mb-1">What is the difference between NRI and PIO / OCI?</h4>
            <p className="text-sm text-gray-600">
              An NRI (Non-Resident Indian) holds an Indian passport and resides outside India for 182 days or more in a financial year. A PIO/OCI holds citizenship of another country but traces ancestry to India.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 text-base mb-1">Can OCIs vote in Indian democratic elections?</h4>
            <p className="text-sm text-gray-600">
              Currently, voting rights are reserved for Indian passport holders (NRIs who register as overseas voters on the National Voters’ Service Portal). Legislative committees are continuously reviewing digital and postal proxy voting avenues.
            </p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 text-base mb-1">How can I participate in Pravasi Bharatiya Divas?</h4>
            <p className="text-sm text-gray-600">
              Pravasi Bharatiya Divas (PBD) is celebrated biennially on January 9 to commemorate the return of Mahatma Gandhi to India from South Africa. Registrations open online through the Ministry of External Affairs portal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
