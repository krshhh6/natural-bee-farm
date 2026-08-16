import React, { useState } from 'react';
import {
  Layout,
  Megaphone,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const ContentManager: React.FC = () => {
  const { banners, updateBanners } = useStore();

  const [announcementText, setAnnouncementText] = useState(banners.announcement.text);
  const [announcementBadge, setAnnouncementBadge] = useState(banners.announcement.badge);
  const [announcementHighlight, setAnnouncementHighlight] = useState(banners.announcement.highlightText);
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(banners.announcement.isActive);

  const [heroHeadline, setHeroHeadline] = useState(banners.hero.headline);
  const [heroSubheadline, setHeroSubheadline] = useState(banners.hero.subheadline);
  const [heroTagline, setHeroTagline] = useState(banners.hero.tagline);
  const [heroPrimaryCta, setHeroPrimaryCta] = useState(banners.hero.primaryCtaText);
  const [heroSecondaryCta, setHeroSecondaryCta] = useState(banners.hero.secondaryCtaText);
  const [heroBgImage, setHeroBgImage] = useState(banners.hero.bgImageUrl);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateBanners({
      announcement: {
        text: announcementText,
        badge: announcementBadge,
        highlightText: announcementHighlight,
        isActive: isAnnouncementActive,
      },
      hero: {
        headline: heroHeadline,
        subheadline: heroSubheadline,
        tagline: heroTagline,
        primaryCtaText: heroPrimaryCta,
        secondaryCtaText: heroSecondaryCta,
        bgImageUrl: heroBgImage,
      },
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white">
            Homepage Content & Banner Management (CMS)
          </h2>
          <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-0.5">
            Update storefront announcements, headlines, taglines, hero banner copy & call-to-actions live
          </p>
        </div>
        <button
          onClick={handleSaveContent}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9C5B23] to-[#80481A] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Publish Changes to Live Site</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Homepage content updated successfully! All visitors will now see your new announcements and hero banner.</span>
        </div>
      )}

      <form onSubmit={handleSaveContent} className="space-y-6">
        
        {/* Announcement Bar Settings */}
        <div className="bg-white dark:bg-[#231F1B] p-6 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#E7DFD3] dark:border-neutral-800 pb-3">
            <h3 className="font-serif font-bold text-base text-[#231F1B] dark:text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-[#9C5B23] dark:text-[#E9BE5F]" />
              Top Announcement Bar Editor
            </h3>
            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={isAnnouncementActive}
                onChange={(e) => setIsAnnouncementActive(e.target.checked)}
                className="rounded text-[#9C5B23]"
              />
              <span>Enable Announcement Bar</span>
            </label>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                Announcement Message
              </label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Pill Badge Label
                </label>
                <input
                  type="text"
                  value={announcementBadge}
                  onChange={(e) => setAnnouncementBadge(e.target.value)}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Highlight Offer Code / Text
                </label>
                <input
                  type="text"
                  value={announcementHighlight}
                  onChange={(e) => setAnnouncementHighlight(e.target.value)}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Showcase Section */}
        <div className="bg-white dark:bg-[#231F1B] p-6 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm space-y-4">
          <div className="border-b border-[#E7DFD3] dark:border-neutral-800 pb-3">
            <h3 className="font-serif font-bold text-base text-[#231F1B] dark:text-white flex items-center gap-2">
              <Layout className="w-5 h-5 text-[#9C5B23] dark:text-[#E9BE5F]" />
              Hero Banner Copy & Visuals
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                Top Heritage Tagline
              </label>
              <input
                type="text"
                value={heroTagline}
                onChange={(e) => setHeroTagline(e.target.value)}
                className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                Main Hero Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-bold text-sm text-[#231F1B] dark:text-white"
              />
            </div>

            <div>
              <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                Subheadline Description
              </label>
              <textarea
                rows={3}
                value={heroSubheadline}
                onChange={(e) => setHeroSubheadline(e.target.value)}
                className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={heroPrimaryCta}
                  onChange={(e) => setHeroPrimaryCta(e.target.value)}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={heroSecondaryCta}
                  onChange={(e) => setHeroSecondaryCta(e.target.value)}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                Background Image Asset URL
              </label>
              <input
                type="text"
                value={heroBgImage}
                onChange={(e) => setHeroBgImage(e.target.value)}
                className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
              />
            </div>

          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#9C5B23] to-[#80481A] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Content Updates</span>
          </button>
        </div>

      </form>

    </div>
  );
};
