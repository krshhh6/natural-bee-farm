import React from 'react';
import { Award, ShieldCheck, Heart, Leaf } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const highlights = [
    { icon: Leaf, title: '100% Pure Raw Honey', desc: 'Sourced directly from tribal apiculturists' },
    { icon: ShieldCheck, title: 'Preservative Free', desc: 'No added sugars, colors, or chemicals' },
    { icon: Heart, title: 'Handcrafted with Care', desc: 'Preserving authentic traditional recipes' },
    { icon: Award, title: 'Woman-Led Enterprise', desc: 'Empowering local Bihar women artisans' },
  ];

  return (
    <section className="py-6 bg-[#F5E8B6] dark:bg-[#282823] border-b border-[#595C56]/30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Marquee Scroll Container */}
        <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto custom-scrollbar pb-2">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF3D6] dark:bg-[#1C1C18] border border-[#E9BE5F]/50 shadow-sm rounded-full px-5 py-2.5 flex items-center space-x-2.5 whitespace-nowrap shrink-0 hover:shadow-md hover:border-[#E9BE5F] transition-all cursor-default"
              >
                <div className="w-7 h-7 rounded-full bg-[#282823] flex items-center justify-center text-[#E9BE5F]">
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#282823] dark:text-[#F5E8B6]">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
