import React from 'react';
import { Leaf, Gift, Star, ShieldCheck, Droplets, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { banners } = useStore();
  const ann = banners.announcement;

  const items = [
    { icon: Leaf, text: '100% Raw & Unprocessed Forest Honey' },
    { icon: Gift, text: 'Free Shipping on Honey Orders Above ₹499' },
    { icon: Star, text: '100% Mother-Owned Artisanal Brand' },
    { icon: ShieldCheck, text: 'Lab Tested Pure Honey — Every Batch' },
    { icon: Droplets, text: 'Sourced from Bihar\'s Wild Forests' },
  ];

  if (!ann.isActive) return null;

  return (
    <div className="bg-[#282823] text-[#F5E8B6] text-xs font-semibold py-2.5 overflow-hidden border-b border-[#595C56]/30 relative z-50">
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {/* Live Admin Announcement Highlight */}
        <div className="flex items-center space-x-2 mx-6 text-[#F5E8B6] font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#E9BE5F] shrink-0 animate-spin" />
          <span className="bg-[#E9BE5F] text-[#282823] px-2 py-0.5 rounded text-[10px] uppercase font-extrabold">
            {ann.badge}
          </span>
          <span>{ann.text}</span>
          {ann.highlightText && (
            <span className="text-[#E9BE5F] underline font-extrabold ml-1">
              {ann.highlightText}
            </span>
          )}
          <span className="ml-6 text-[#595C56] font-bold">•</span>
        </div>

        {[...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-2 mx-6 text-[#F5E8B6]">
              <Icon className="w-3.5 h-3.5 text-[#E9BE5F] shrink-0" />
              <span>{item.text}</span>
              <span className="ml-6 text-[#595C56] font-bold">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnnouncementBar;
