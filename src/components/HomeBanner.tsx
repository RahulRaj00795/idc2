import React, { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import { contentService } from '../services/contentService';

interface HomeBannerProps {
  bannerUrl: string;
  bannerReady: boolean;
}

const STATIC_BANNER_CANDIDATES = [
  '/banner.png',
  '/assets/aistudio/banner.png',
];

export const HomeBanner: React.FC<HomeBannerProps> = ({ bannerUrl, bannerReady }) => {
  const [staticSrc, setStaticSrc] = useState<string>('');
  const [staticChecked, setStaticChecked] = useState<boolean>(false);
  const [customFailed, setCustomFailed] = useState<boolean>(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    setCustomFailed(false);
  }, [bannerUrl]);

  // Probe static /banner.png and /assets/aistudio/banner.png silently before deciding
  useEffect(() => {
    let cancelled = false;

    const checkCandidates = async () => {
      for (const candidate of STATIC_BANNER_CANDIDATES) {
        const exists = await new Promise<boolean>((resolve) => {
          const probe = new window.Image();
          probe.onload = () => resolve(true);
          probe.onerror = () => resolve(false);
          probe.src = candidate;
        });
        if (cancelled) return;
        if (exists) {
          setStaticSrc(candidate);
          setStaticChecked(true);
          return;
        }
      }
      if (!cancelled) {
        setStaticSrc('');
        setStaticChecked(true);
      }
    };

    checkCandidates();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleFile = async (file?: File | null) => {
    if (!file || !file.type.startsWith('image/')) return;
    const instantUrl = URL.createObjectURL(file);
    setLocalPreviewUrl(instantUrl);
    setUploading(true);
    try {
      await contentService.uploadExactBannerFile(file);
      setStaticSrc(`/banner.png?v=${Date.now()}`);
    } finally {
      setUploading(false);
    }
  };

  const activeCustomUrl = bannerUrl && !customFailed ? bannerUrl : '';
  // Prefer instant local preview, then synced Firestore bannerUrl, then static /banner.png fallback
  const displaySrc = localPreviewUrl || activeCustomUrl || staticSrc;

  if (displaySrc) {
    return (
      <section className="w-full overflow-hidden">
        <a
          href="https://forms.gle/THP59QaERoLBEMuz9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Indian Diaspora Club Viksit Bharat 2047 Form"
          className="block w-full cursor-pointer"
        >
          <img
            src={displaySrc}
            alt="Indian Diaspora Club Banner"
            onError={() => {
              if (localPreviewUrl && displaySrc === localPreviewUrl) {
                setLocalPreviewUrl('');
                return;
              }
              if (staticSrc && displaySrc === staticSrc) {
                setStaticSrc('');
                return;
              }
              if (activeCustomUrl && displaySrc === activeCustomUrl) {
                setCustomFailed(true);
              }
            }}
            className="w-full h-auto block select-none"
          />
        </a>
      </section>
    );
  }

  // Wait until both Firestore & static file check finish to prevent any flash
  if (!bannerReady || !staticChecked) {
    return null;
  }

  // Only shown while no banner.png has been uploaded yet; vanishes permanently once selected
  return (
    <section className="w-full bg-slate-950 border-b border-slate-800">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition cursor-pointer ${
            isDragging
              ? 'border-orange-400 bg-orange-500/10'
              : 'border-slate-700 hover:border-orange-500/80 bg-slate-900/70'
          }`}
        >
          <Upload className="w-7 h-7 text-orange-400 mb-2.5" />
          <span className="text-sm sm:text-base font-semibold text-white">
            {uploading ? 'Saving exact banner.png...' : 'Click or Drop banner.png Here to Set Exact Homepage Banner'}
          </span>
          <span className="text-xs text-slate-400 mt-1">
            Displays your exact original image full-width with nothing else added, and saves it permanently.
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />
        </label>
      </div>
    </section>
  );
};
