import React from 'react';

const items = [
  '✦ 100% Pure Raw Honey',
  '✦ Lab Tested & Certified',
  '✦ No Additives or Adulteration',
  '✦ Cold-Pressed & Unfiltered',
  '✦ Directly From The Hive',
  '✦ 100% Women-Owned Artisanal Brand',
  '✦ Wild Forest Sourced',
  '✦ Bihar\'s Heritage Honey',
  '✦ Single-Origin Nectars',
  '✦ Zero Chemicals. Zero Compromise.',
];

export const TrustMarquee: React.FC = () => {
  const doubled = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-[#2C1810] py-3">
      <div className="flex whitespace-nowrap animate-marquee">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-block px-5 sm:px-6 text-[11px] sm:text-xs tracking-widest uppercase"
            style={{
              fontFamily: "'RosierBodyFont', 'Plus Jakarta Sans', sans-serif",
              color: i % 2 === 0 ? '#E9BE5F' : '#FAF5EB',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
