import React from 'react';
import { Leaf, Gift, Star, ShieldCheck, Droplets } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const items = [
    { icon: Leaf, text: '100% Raw & Unprocessed Forest Honey' },
    { icon: Gift, text: 'Free Shipping on Honey Orders Above ₹499' },
    { icon: Star, text: '100% Mother-Owned Artisanal Brand' },
    { icon: ShieldCheck, text: 'Lab Tested Pure Honey — Every Batch' },
    { icon: Droplets, text: 'Sourced from Bihar\'s Wild Forests' },
  ];

  return (
    <div className="bg-[#282823] text-[#F5E8B6] text-xs font-semibold py-2.5 overflow-hidden border-b border-[#595C56]/30 relative z-50">
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {[...items, ...items, ...items].map((item, idx) => {
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
