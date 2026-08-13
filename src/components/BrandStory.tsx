import React from 'react';
import { Heart, Sun, Sparkles, Store, ShieldCheck, Award, Quote } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Preservative-Free',
      description: 'Zero artificial chemicals, synthetic food colors, or added corn syrup. Pure authentic taste as nature intended.',
      highlight: 'Pure & Unadulterated',
    },
    {
      icon: Sun,
      title: 'Sun-Dried & Stone-Ground',
      description: 'Badis are sun-cured naturally on rooftops. Spices are hand-pounded in stone mortar mills to retain volatile essential oils.',
      highlight: 'Artisanal Craft',
    },
    {
      icon: Heart,
      title: 'Woman-Led Enterprise',
      description: 'Founded by Shital Gupta in Patna, empowering rural female artisans by generating sustainable livelihoods and financial independence.',
      highlight: 'Empowering Communities',
    },
    {
      icon: Store,
      title: '50+ Marts & Nationwide Delivery',
      description: 'Supplying over 50 prime supermarket outlets across Bihar and shipping fresh food packages nationwide.',
      highlight: 'Verified Distribution',
    },
  ];

  return (
    <section id="our-story" className="py-20 sm:py-28 bg-[#181715] text-[#F5E8B6] relative overflow-hidden border-y border-[#3D372E]">
      
      {/* Decorative Gold Ambient Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#B8661B]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#24211B] border border-[#D4AF37]/40 text-[#E5C158] text-xs font-bold uppercase tracking-[0.2em] shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Our Living Heritage</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Bridging <span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent italic">Tradition</span> & Scale
          </h2>

          <p className="text-[#D8CFBF] text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            Natura Bee Farm was born out of a passion to preserve age-old Indian culinary craftsmanship. From the sunlit courtyards of Bihar to your kitchen table, we bring you traditional recipes made without compromises.
          </p>
        </div>

        {/* 4 Pillars Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#201D19]/90 backdrop-blur-md rounded-2xl p-7 border border-[#3D372E] hover:border-[#D4AF37] transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/10 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top gold accent bar on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Luxury Icon Box */}
                  <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-[#F5E6B3] via-[#D4AF37] to-[#997314] flex items-center justify-center text-[#1C1810] shadow-md group-hover:scale-105 transition-transform duration-300 mb-6">
                    <Icon className="w-6 h-6 text-[#1C1810]" />
                  </div>

                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                    {item.highlight}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-[#F3E5AB] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#D8CFBF] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#332E27] flex items-center text-[11px] font-semibold text-[#D4AF37]">
                  <Award className="w-3.5 h-3.5 mr-1.5 text-[#D4AF37]" />
                  <span>Guaranteed Quality</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formal Quote Banner */}
        <div className="mt-20 bg-gradient-to-r from-[#1E1C18] via-[#2A2620] to-[#1E1C18] rounded-3xl p-8 sm:p-14 border border-[#D4AF37]/35 text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          
          {/* Subtle Quote Background Icon Watermark */}
          <Quote className="w-32 h-32 text-[#D4AF37]/5 absolute -top-4 -left-4 pointer-events-none rotate-12" />
          
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#F3E5AB] italic font-medium leading-relaxed relative z-10">
            "Food is not just sustenance; it is our living heritage. When you taste our wild honey or sun-dried badi, you taste generations of love, patience, and purity."
          </blockquote>

          <div className="mt-8 flex flex-col items-center justify-center gap-1 relative z-10">
            <div className="text-xs sm:text-sm text-[#D4AF37] font-extrabold uppercase tracking-[0.2em]">
              — Shital Gupta
            </div>
            <div className="text-[11px] text-[#D8CFBF] font-semibold tracking-wider">
              Founder & Chief Artisan, Natura Bee Farm
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
