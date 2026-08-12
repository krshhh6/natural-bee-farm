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
    <section id="our-story" className="py-16 sm:py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
      
      {/* Decorative Warm Ambient Light Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Bridging <em className="text-amber-400 italic">Tradition</em> & Scale
          </h2>
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-normal">
            Honey Designs was born out of a passion to preserve age-old Indian culinary craftsmanship. From the sunlit courtyards of Bihar to your kitchen table, we bring you traditional recipes made without compromises.
          </p>
        </div>

        {/* 4 Pillars Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-stone-800/60 rounded-3xl p-6 border border-stone-700/60 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-stone-950 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Quote Banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-950/40 via-stone-800/80 to-amber-950/40 rounded-3xl p-8 sm:p-12 border border-amber-900/30 text-center max-w-4xl mx-auto">
          <blockquote className="font-serif text-xl sm:text-2xl text-amber-100 italic font-medium leading-relaxed">
            "Food is not just sustenance; it is our living heritage. When you taste our wild honey or sun-dried badi, you taste generations of love, patience, and purity."
          </blockquote>
          <div className="mt-6 text-xs sm:text-sm text-amber-400 font-bold uppercase tracking-wider">
            — Shital Gupta, Founder & Chief Artisan
          </div>
        </div>

      </div>
    </section>
  );
};
