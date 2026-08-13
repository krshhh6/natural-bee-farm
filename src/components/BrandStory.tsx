import React from 'react';
import { Heart, Sun, Sparkles, Store, ShieldCheck } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Preservative-Free',
      description: 'Zero artificial chemicals, synthetic food colors, or added corn syrup. Pure authentic taste as nature intended.',
    },
    {
      icon: Sun,
      title: 'Sun-Dried & Stone-Ground',
      description: 'Badis are sun-cured naturally on rooftops. Spices are hand-pounded in stone mortar mills to retain volatile essential oils.',
    },
    {
      icon: Heart,
      title: 'Woman-Led Enterprise',
      description: 'Founded by Shital Gupta in Patna, empowering rural female artisans by generating sustainable livelihoods and financial independence.',
    },
    {
      icon: Store,
      title: '50+ Marts & Nationwide Delivery',
      description: 'Supplying over 50 prime supermarket outlets across Bihar and shipping fresh food packages nationwide.',
    },
  ];

  return (
    <section id="our-story" className="py-16 sm:py-24 bg-[#282823] text-[#F5E8B6] relative overflow-hidden">
      
      {/* Decorative Warm Ambient Light Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E9BE5F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1C1C18] border border-[#595C56]/40 text-[#E9BE5F] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Bridging <em className="text-[#E9BE5F] italic">Tradition</em> & Scale
          </h2>
          <p className="text-[#F5E8B6]/90 text-base sm:text-lg leading-relaxed font-normal">
            Natura Bee Farm was born out of a passion to preserve age-old Indian culinary craftsmanship. From the sunlit courtyards of Bihar to your kitchen table, we bring you traditional recipes made without compromises.
          </p>
        </div>

        {/* 4 Pillars Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#1C1C18] rounded-3xl p-6 border border-[#595C56]/40 hover:border-[#E9BE5F] transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#E9BE5F] flex items-center justify-center text-[#282823] mb-6 group-hover:scale-110 transition-all shadow-md">
                  <Icon className="w-6 h-6 text-[#282823]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#F5E8B6]/80 leading-relaxed font-normal">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Quote Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#1C1C18] via-[#363630] to-[#1C1C18] rounded-3xl p-8 sm:p-12 border border-[#595C56]/40 text-center max-w-4xl mx-auto shadow-xl">
          <blockquote className="font-serif text-xl sm:text-2xl text-[#F5E8B6] italic font-medium leading-relaxed">
            "Food is not just sustenance; it is our living heritage. When you taste our wild honey or sun-dried badi, you taste generations of love, patience, and purity."
          </blockquote>
          <div className="mt-6 text-xs sm:text-sm text-[#E9BE5F] font-bold uppercase tracking-wider">
            — Shital Gupta, Founder & Chief Artisan
          </div>
        </div>

      </div>
    </section>
  );
};
