export const getWeightMultiplier = (baseWeight: string, targetWeight: string): number => {
  if (!baseWeight || !targetWeight || baseWeight === targetWeight) return 1;

  // Base 500g / 500 ML
  if (baseWeight.includes('500')) {
    if (targetWeight.includes('250')) return 0.55;
    if (targetWeight.includes('1kg') || targetWeight.includes('1 kg') || targetWeight.includes('1000')) return 1.8;
  }

  // Base 250g / 250 ML
  if (baseWeight.includes('250')) {
    if (targetWeight.includes('500')) return 1.8;
    if (targetWeight.includes('1kg') || targetWeight.includes('1 kg') || targetWeight.includes('1000')) return 3.5;
  }

  // Base 1kg / 1000 ML
  if (baseWeight.includes('1kg') || baseWeight.includes('1 kg') || baseWeight.includes('1000')) {
    if (targetWeight.includes('250')) return 0.3;
    if (targetWeight.includes('500')) return 0.55;
  }

  return 1;
};
