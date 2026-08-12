import React from 'react';
import { Leaf, Gift, MapPin, Star, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const items = [
    { icon: Leaf, text: '100% Preservative-Free Traditional Foods' },
    { icon: Gift, text: 'Free Shipping on Orders Above ₹500' },
    { icon: MapPin, text: 'Supplying 50+ Marts Across Patna' },
    { icon: Star, text: 'Woman-Led Brand — Founded by Shital Gupta' },
    { icon: ShieldCheck, text: 'Authentic Traditional Foods' },
  ];

  return (
    <div className="bg-[#3b2319] text-[#f4ebd9] text-xs font-semibold py-2.5 overflow-hidden border-b border-[#2d1b13] relative z-50">
      <div className="flex whitespace-nowrap animate-marquee items-center">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center space-x-2 mx-6 text-[#f4ebd9]">
              <Icon className="w-3.5 h-3.5 text-[#e89b7b] shrink-0" />
              <span>{item.text}</span>
              <span className="ml-6 text-[#6d4534] font-bold">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
