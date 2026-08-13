import React from 'react';

export const HeritagePillars: React.FC = () => {
  const pillars = [
    {
      image: '/J5.webp',
      title: 'Source To Table',
      description: 'Direct relationships with heritage grain farmers, ensuring sustainable sourcing.',
    },
    {
      image: '/J6.webp',
      title: 'Time-Honored Techniques',
      description: 'Slow Bilona churning, traditional stone-milling, and authentic methods.',
    },
    {
      image: '/J7.webp',
      title: 'Unwavering Purity',
      description: 'No refined oils, no additives—just pure, wholesome ingredients.',
    },
    {
      image: '/J8.webp',
      title: 'Commitment to Community',
      description: 'Fair trade practices and direct support to rural farming families.',
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#FEFDF5] dark:bg-[#1A1816] transition-colors border-t border-[#E7DFD3] dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Pillars Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 text-center">
          {pillars.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              {/* Larger Prominent Illustration Icon */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 flex items-center justify-center mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#231F1B] dark:text-[#FEFDF5] mb-2 group-hover:text-[#9C5B23] dark:group-hover:text-[#E9BE5F] transition-colors leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5C5247] dark:text-[#E6DBCB] leading-relaxed max-w-xs font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
