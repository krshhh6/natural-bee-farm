import React from 'react';

export const HeritagePillars: React.FC = () => {
  const pillars = [
    {
      image: '/J5.webp',
      title: 'Source To Table',
      description: 'Direct relationships with wild forest honey harvesters & bee farmers.',
    },
    {
      image: '/J6.webp',
      title: 'Time-Honored Techniques',
      description: 'Slow cold-extraction & unheated filtering to retain raw enzymes.',
    },
    {
      image: '/J7.webp',
      title: 'Unwavering Purity',
      description: 'No artificial syrup, no preservatives—just 100% pure raw honey.',
    },
    {
      image: '/J8.webp',
      title: 'Commitment to Community',
      description: 'Fair trade practices empowering rural mother apiculturists.',
    },
  ];

  return (
    <section className="py-10 sm:py-20 bg-[#FEFDF5] dark:bg-[#1A1816] transition-colors border-t border-[#E8D5B7]/60 dark:border-[#3D372E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Pillars 2x2 Grid on Mobile / 4-Col Grid on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 lg:gap-10 text-center">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group cursor-pointer p-4 sm:p-6 rounded-3xl bg-paper-texture dark:bg-[#201D19] border border-[#E8D5B7] dark:border-[#3D372E] shadow-md hover:shadow-2xl transition-all duration-300 hover-lift"
            >
              {/* Illustration Icon Container scaled for 2x2 mobile grid */}
              <div className="w-20 h-20 sm:w-44 sm:h-44 lg:w-48 lg:h-48 flex items-center justify-center mb-2 sm:mb-6 transform group-hover:scale-108 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-500"
                />
              </div>

              {/* Title */}
              <h3 className="font-serif text-xs sm:text-2xl font-bold text-[#2C1810] dark:text-[#FEFDF5] mb-1 sm:mb-2 group-hover:text-[#9C5B23] dark:group-hover:text-[#E9BE5F] transition-colors duration-300 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[11px] sm:text-sm text-[#5C4033] dark:text-[#D8CFBF] leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
