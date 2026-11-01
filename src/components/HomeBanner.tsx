import React, { useEffect, useState } from 'react';

interface HomeBannerProps {
  bannerUrl: string;
}

const STATIC_BANNER_CANDIDATES = [
  '/banner.png',
  '/assets/aistudio/banner.png',
];

export const HomeBanner: React.FC<HomeBannerProps> = ({ bannerUrl }) => {
  const [staticSrc, setStaticSrc] = useState<string>('');
  const [customFailed, setCustomFailed] = useState<boolean>(false);

  useEffect(() => {
    setCustomFailed(false);
  }, [bannerUrl]);

  // Silently check if a static /banner.png exists on the server
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
          return;
        }
      }
      if (!cancelled) {
        setStaticSrc('');
      }
    };

    checkCandidates();
    return () => {
      cancelled = true;
    };
  }, []);

  const activeCustomUrl = bannerUrl && !customFailed ? bannerUrl : '';
  const displaySrc = activeCustomUrl || staticSrc;

  // If no banner is present, render nothing at all
  if (!displaySrc) {
    return null;
  }

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
            if (activeCustomUrl && displaySrc === activeCustomUrl) {
              setCustomFailed(true);
              return;
            }
            if (staticSrc && displaySrc === staticSrc) {
              setStaticSrc('');
            }
          }}
          className="w-full h-auto block select-none"
        />
      </a>
    </section>
  );
};
