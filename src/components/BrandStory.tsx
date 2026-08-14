import React from 'react';
import { Heart, Sun, Sparkles, Store, ShieldCheck, Award, Quote } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from './ui/ScrollStack';

export const BrandStory: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '100% Preservative-Free',
      description: 'Zero artificial chemicals, synthetic food colors, or added corn syrup. Pure raw honey as nature intended.',
      highlight: 'Pure & Unadulterated',
    },
    {
      icon: Sun,
      title: 'Sun-Harvested & Unfiltered',
      description: 'Harvested from wild hives and single-origin floral blossoms, extracted slowly to retain natural pollen, propolis, and enzymes.',
      highlight: 'Artisanal Craft',
    },
    {
      icon: Heart,
      title: 'Mother-Owned Enterprise',
      description: '100% Mother-Owned artisanal enterprise, empowering rural mothers and female artisans with financial independence.',
      highlight: 'Empowering Communities',
    },
    {
      icon: Store,
      title: '50+ Marts & Direct Shipping',
      description: 'Supplying over 50 prime outlets across Bihar and delivering pure raw honey nationwide directly to your doorstep.',
      highlight: 'Verified Distribution',
    },
  ];

  return (
    <section id="our-story" className="py-16 sm:py-28 bg-transparent dark:bg-[#181715] text-[#2C1810] dark:text-[#F5E8B6] relative overflow-hidden border-y border-[#E8D5B7] dark:border-[#3D372E] transition-colors">
      
      {/* Decorative Warm Ambient Radial Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#E9BE5F]/20 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#9C5B23]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#9C5B23]/10 dark:bg-[#24211B] border border-[#9C5B23]/30 dark:border-[#D4AF37]/40 text-[#9C5B23] dark:text-[#E5C158] text-xs font-extrabold uppercase tracking-[0.2em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9C5B23] dark:text-[#D4AF37]" />
            <span>Our Living Heritage</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#2C1810] dark:text-white tracking-tight leading-tight">
            Bridging <span className="text-[#9C5B23] dark:text-[#E9BE5F] italic">Tradition</span> & Pure Artisanal Honey
          </h2>

          <p className="text-[#5C4033] dark:text-[#D8CFBF] text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            Natura Bee Farm was born out of a passion to preserve age-old Indian apiculture craftsmanship. From the wild forests of Bihar to your morning tea, we bring you 100% pure raw honey prepared without compromises.
          </p>
        </div>

        {/* Mobile Only: Natural Window Scroll Integrated <ScrollStack /> */}
        <div className="block md:hidden my-4">
          <ScrollStack
            itemDistance={24}
            itemScale={0.04}
            itemStackDistance={16}
            stackPosition="110px"
            baseScale={0.88}
            useWindowScroll={true}
          >
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <ScrollStackItem key={idx}>
                  <div className="bg-paper-texture dark:bg-[#201D19] rounded-2xl p-6 border-2 border-[#E8D5B7] dark:border-[#3D372E] shadow-xl flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#9C5B23] dark:via-[#D4AF37] to-transparent" />

                    <div>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FAF5EB] via-[#F3E5AB] to-[#E9BE5F] text-[#2C1810] flex items-center justify-center shadow-sm mb-4 border border-[#E8D5B7]">
                        <Icon className="w-6 h-6 text-[#9C5B23]" />
                      </div>

                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#9C5B23] dark:text-[#D4AF37] mb-1">
                        {item.highlight}
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#2C1810] dark:text-white mb-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-[#5C4033] dark:text-[#D8CFBF] leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E8D5B7]/60 dark:border-[#332E27] flex items-center text-[11px] font-semibold text-[#9C5B23] dark:text-[#D4AF37]">
                      <Award className="w-3.5 h-3.5 mr-1.5 text-[#9C5B23] dark:text-[#D4AF37]" />
                      <span>Guaranteed Purity</span>
                    </div>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>

        {/* Desktop & Tablet: 4 Pillars Feature Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-paper-texture dark:bg-[#201D19]/90 backdrop-blur-md rounded-2xl p-7 border border-[#E8D5B7] dark:border-[#3D372E] hover:border-[#9C5B23] dark:hover:border-[#D4AF37] transition-all duration-300 hover-lift shadow-md hover:shadow-2xl flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top gold accent bar on hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#9C5B23] dark:via-[#D4AF37] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Luxury Icon Box */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FAF5EB] via-[#F3E5AB] to-[#E9BE5F] text-[#2C1810] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 mb-6 border border-[#E8D5B7]">
                    <Icon className="w-6 h-6 text-[#9C5B23]" />
                  </div>

                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#9C5B23] dark:text-[#D4AF37] mb-1">
                    {item.highlight}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#2C1810] dark:text-white mb-3 group-hover:text-[#9C5B23] dark:group-hover:text-[#F3E5AB] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C4033] dark:text-[#D8CFBF] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8D5B7]/60 dark:border-[#332E27] flex items-center text-[11px] font-semibold text-[#9C5B23] dark:text-[#D4AF37]">
                  <Award className="w-3.5 h-3.5 mr-1.5 text-[#9C5B23] dark:text-[#D4AF37]" />
                  <span>Guaranteed Purity</span>
                </div>
              </div>
            );
          })}
        </div>
        {/* From Flower to Honey Infographic Process Card */}
        <div className="mt-14 sm:mt-18 relative overflow-hidden rounded-3xl bg-paper-texture dark:bg-[#1C1C18] border-2 border-[#E8D5B7] dark:border-[#3D372E] p-6 sm:p-8 shadow-xl max-w-4xl mx-auto text-center group transition-all hover:shadow-2xl">
          <div className="mb-4">
            <span className="text-[10px] sm:text-xs font-black text-[#9C5B23] dark:text-[#E9BE5F] uppercase tracking-[0.2em]">OUR ARTISANAL CRAFT</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2C1810] dark:text-white mt-1">From Flower to Pure Honey Process</h3>
          </div>
          <div className="bg-white/80 dark:bg-[#181715]/80 p-3 sm:p-5 rounded-2xl border border-[#E8D5B7]/60 dark:border-[#3D372E]">
            <img
              src="/flower-to-honey.png"
              alt="From Flower to Honey - Artisanal Honey Making Process"
              className="w-full max-w-2xl max-h-[260px] sm:max-h-[300px] object-contain mx-auto transform group-hover:scale-[1.01] transition-transform duration-500"
            />
          </div>
        </div>

        {/* Formal Quote Banner */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#FFFDF9] via-[#FAF5EB] to-[#FFFDF9] dark:from-[#1E1C18] dark:via-[#2A2620] dark:to-[#1E1C18] rounded-3xl p-8 sm:p-14 border-2 border-[#E8D5B7] dark:border-[#D4AF37]/35 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          
          {/* Subtle Quote Background Icon Watermark */}
          <Quote className="w-32 h-32 text-[#9C5B23]/5 dark:text-[#D4AF37]/5 absolute -top-4 -left-4 pointer-events-none rotate-12" />
          
          <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-[#2C1810] dark:text-[#F3E5AB] italic font-semibold leading-relaxed relative z-10">
            &quot;Honey is not just sweet nectar; it is nature&apos;s living heritage. When you taste our raw forest honey, you taste generations of care, wild blooms, and unadulterated purity.&quot;
          </blockquote>

          <div className="mt-8 flex flex-col items-center justify-center gap-1 relative z-10">
            <div className="text-xs sm:text-sm text-[#9C5B23] dark:text-[#D4AF37] font-extrabold uppercase tracking-[0.2em]">
              — 100% Mother-Owned Brand
            </div>
            <div className="text-[11px] text-[#5C4033] dark:text-[#D8CFBF] font-semibold tracking-wider">
              Empowering Rural Artisans & Mothers, Natura Bee Farm
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
