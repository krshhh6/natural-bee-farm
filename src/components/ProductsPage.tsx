import React, { useState, useMemo } from 'react';
import type { Product, CategoryType } from '../types';
import { ProductCard } from './ProductCard';
import { Footer } from './Footer';
import {
  Search,
  Home,
  Sparkles,
  SlidersHorizontal,
  RotateCcw,
  Check,
  ShieldCheck,
  Award,
  Truck,
  Leaf,
  Filter,
  X,
} from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onQuickView?: (product: Product) => void;
  onNavigateHome: () => void;
}

const BENEFIT_FILTERS = [
  { id: 'all', label: 'All Health Benefits' },
  { id: 'immunity', label: '🛡️ Daily Immunity & Wellness' },
  { id: 'throat', label: '🌿 Cough & Sore Throat Relief' },
  { id: 'energy', label: '⚡ Energy & Vitality' },
  { id: 'digestion', label: '✨ Digestive & Herbal Health' },
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-450', label: 'Under ₹450' },
  { id: '450-600', label: '₹450 – ₹600' },
  { id: 'above-600', label: '₹600 and above' },
];

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView = () => {},
  onNavigateHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'popular'>('featured');
  const [selectedBenefit, setSelectedBenefit] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [onlyBestSellers, setOnlyBestSellers] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Categories list with counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.categoryName.toLowerCase().includes(q);
        const matchesIng = (item.ingredients || []).some((i) => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesIng) return false;
      }

      // Benefit filter
      if (selectedBenefit === 'immunity') {
        const isImmunity =
          item.name.toLowerCase().includes('tulsi') ||
          item.name.toLowerCase().includes('cinnamon') ||
          item.name.toLowerCase().includes('forest') ||
          item.name.toLowerCase().includes('comb');
        if (!isImmunity) return false;
      } else if (selectedBenefit === 'throat') {
        const isThroat =
          item.name.toLowerCase().includes('tulsi') ||
          item.name.toLowerCase().includes('neem') ||
          item.name.toLowerCase().includes('ginger');
        if (!isThroat) return false;
      } else if (selectedBenefit === 'energy') {
        const isEnergy =
          item.name.toLowerCase().includes('ashwagandha') ||
          item.name.toLowerCase().includes('saffron') ||
          item.name.toLowerCase().includes('acacia');
        if (!isEnergy) return false;
      } else if (selectedBenefit === 'digestion') {
        const isDigestion =
          item.name.toLowerCase().includes('karanj') ||
          item.name.toLowerCase().includes('jamun') ||
          item.name.toLowerCase().includes('neem');
        if (!isDigestion) return false;
      }

      // Price range
      if (selectedPriceRange === 'under-450' && item.price >= 450) return false;
      if (selectedPriceRange === '450-600' && (item.price < 450 || item.price > 600)) return false;
      if (selectedPriceRange === 'above-600' && item.price <= 600) return false;

      // Best sellers
      if (onlyBestSellers && !item.isBestSeller) return false;

      return true;
    });
  }, [products, selectedCategory, searchQuery, selectedBenefit, selectedPriceRange, onlyBestSellers]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'popular') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      return 0; // 'featured'
    });
  }, [filteredProducts, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedBenefit !== 'all' ||
    selectedPriceRange !== 'all' ||
    onlyBestSellers ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    onSelectCategory('all');
    setSelectedBenefit('all');
    setSelectedPriceRange('all');
    setOnlyBestSellers(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#FEFDF5] dark:bg-[#161412] text-[#282823] dark:text-[#FEFDF5] transition-colors duration-200">
      
      {/* 1. TOP BREADCRUMB & HEADER BAR */}
      <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] border-b border-[#E8D5B7] dark:border-[#3D372E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#8C7A65] dark:text-[#A69888]">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <span>/</span>
            <span className="text-[#2C1810] dark:text-[#FEFDF5] font-bold">Shop All Honey</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-[#9C5B23] dark:text-[#E9BE5F] font-bold capitalize">
                  {selectedCategory}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-[#15803D] dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Unprocessed &amp; Lab-Tested Guarantee</span>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED SHOP HERO BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#2C1810] via-[#3E2113] to-[#2C1810] text-white py-10 sm:py-14 border-b border-[#E8D5B7]/40 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(#E9BE5F_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9BE5F]/15 border border-[#E9BE5F]/40 text-[#E9BE5F] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 fill-[#E9BE5F]" />
                <span>Single-Origin Apiary Harvests</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Natural Honey Collection
              </h1>
              <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed font-normal">
                Directly harvested from wild forest blooms across Bihar and Himalayan foothills. Unheated, raw, and bottled without sugar syrups or chemical preservatives.
              </p>
            </div>

            {/* Quick Stats Strip */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <div className="text-[10px] uppercase font-bold text-amber-200/80 tracking-wider">Batches</div>
                <div className="text-base sm:text-lg font-black text-white">{products.length} Varieties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <div className="text-[10px] uppercase font-bold text-amber-200/80 tracking-wider">Rating</div>
                <div className="text-base sm:text-lg font-black text-[#E9BE5F]">4.9 ★★★★★</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 text-center">
                <div className="text-[10px] uppercase font-bold text-amber-200/80 tracking-wider">Shipping</div>
                <div className="text-base sm:text-lg font-black text-emerald-400">Free &gt; ₹500</div>
              </div>
            </div>
          </div>

          {/* Quick Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 mt-6 border-t border-white/10">
            {[
              { id: 'all', label: '🍯 All Honey Harvests' },
              { id: 'honey', label: '✨ Artisanal & Raw' },
              { id: 'pickles', label: '🌶️ Traditional Pickles' },
              { id: 'badis', label: '☀️ Sun-Dried Badis' },
              { id: 'spices', label: '🌿 Native Spices' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as CategoryType)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#E9BE5F] text-[#2C1810] font-black shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                }`}
              >
                {cat.label} ({categoryCounts[cat.id] || 0})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN SHOP AREA (RESPONSIVE 2-COLUMN ARCHITECTURE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ======================================================== */}
          {/* DESKTOP FILTER SIDEBAR (3 Columns)                       */}
          {/* ======================================================== */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
            <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] p-5 rounded-3xl border border-[#E8D5B7] dark:border-[#3D372E] shadow-sm space-y-6">
              
              {/* Filter Header & Reset Button */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E8D5B7] dark:border-[#3D372E]">
                <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#2C1810] dark:text-white">
                  <SlidersHorizontal className="w-4 h-4 text-[#9C5B23]" />
                  <span>Filter Products</span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-black text-[#9C5B23] dark:text-[#E9BE5F] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Filter Section 1: Categories */}
              <div className="space-y-2.5">
                <label className="text-xs font-black text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider block">
                  Category
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Collections' },
                    { id: 'honey', label: 'Pure Raw Honey' },
                    { id: 'pickles', label: 'Traditional Pickles' },
                    { id: 'badis', label: 'Handmade Badis' },
                    { id: 'spices', label: 'Heritage Spices' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => onSelectCategory(cat.id as CategoryType)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        selectedCategory === cat.id
                          ? 'bg-[#9C5B23] text-white shadow-xs'
                          : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-[#E8D5B7] dark:bg-[#3D372E]'
                      }`}>
                        {categoryCounts[cat.id] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Section 2: Health Benefits */}
              <div className="space-y-2.5 pt-3 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                <label className="text-xs font-black text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider block">
                  Health &amp; Wellness Needs
                </label>
                <div className="space-y-1">
                  {BENEFIT_FILTERS.map((bf) => (
                    <button
                      key={bf.id}
                      onClick={() => setSelectedBenefit(bf.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedBenefit === bf.id
                          ? 'bg-[#9C5B23]/15 text-[#9C5B23] dark:text-[#E9BE5F] font-black border border-[#9C5B23]/40'
                          : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                      }`}
                    >
                      <span className="truncate">{bf.label}</span>
                      {selectedBenefit === bf.id && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Section 3: Price Range */}
              <div className="space-y-2.5 pt-3 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                <label className="text-xs font-black text-[#5C4033] dark:text-[#D8CFBF] uppercase tracking-wider block">
                  Price Range
                </label>
                <div className="space-y-1">
                  {PRICE_RANGES.map((pr) => (
                    <button
                      key={pr.id}
                      onClick={() => setSelectedPriceRange(pr.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        selectedPriceRange === pr.id
                          ? 'bg-[#9C5B23]/15 text-[#9C5B23] dark:text-[#E9BE5F] font-black border border-[#9C5B23]/40'
                          : 'text-[#4A3B32] dark:text-[#D8CFBF] hover:bg-[#F3EAD8] dark:hover:bg-[#28241E]'
                      }`}
                    >
                      <span>{pr.label}</span>
                      {selectedPriceRange === pr.id && <Check className="w-3.5 h-3.5 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Section 4: Best Sellers Switch */}
              <div className="pt-3 border-t border-[#E8D5B7] dark:border-[#3D372E]">
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-paper-texture dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] cursor-pointer">
                  <span className="text-xs font-bold text-[#2C1810] dark:text-white flex items-center gap-1.5">
                    <span>🔥</span>
                    <span>Best Sellers Only</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={onlyBestSellers}
                    onChange={(e) => setOnlyBestSellers(e.target.checked)}
                    className="w-4 h-4 text-[#9C5B23] rounded focus:ring-[#9C5B23]"
                  />
                </label>
              </div>

            </div>

            {/* Mother-Owned Trust Badge */}
            <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] p-4 rounded-3xl border border-[#E8D5B7] dark:border-[#3D372E] text-xs space-y-2">
              <div className="flex items-center gap-2 text-[#9C5B23] dark:text-[#E9BE5F] font-bold">
                <Award className="w-4 h-4" />
                <span>Patna Apiary Certified</span>
              </div>
              <p className="text-[11px] text-[#8C7A65] dark:text-[#A69888] leading-relaxed">
                Every harvest is sealed with batch purity certification. No micro-filtration or ultra-pasteurization.
              </p>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* RIGHT PRODUCTS LIST & CONTROLS (9 Columns)               */}
          {/* ======================================================== */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* Top Toolbar: Search, Sort & Active Badges */}
            <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] p-4 sm:p-5 rounded-3xl border border-[#E8D5B7] dark:border-[#3D372E] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by flower, aroma, ingredient (e.g. Acacia, Saffron, Tulsi)..."
                    className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] rounded-2xl text-xs font-semibold text-[#2C1810] dark:text-white placeholder-[#8C7A65] focus:outline-none focus:border-[#9C5B23]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#8C7A65] hover:text-[#2C1810]"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Mobile Filter Toggle Button */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden px-4 py-2.5 bg-white dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] rounded-2xl text-xs font-bold text-[#2C1810] dark:text-white flex items-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Filter className="w-3.5 h-3.5 text-[#9C5B23]" />
                    <span>Filters {hasActiveFilters ? '•' : ''}</span>
                  </button>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8C7A65] font-bold hidden sm:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3.5 py-2.5 bg-white dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] rounded-2xl text-xs font-bold text-[#2C1810] dark:text-white focus:outline-none focus:border-[#9C5B23] cursor-pointer shadow-2xs"
                    >
                      <option value="featured">⭐ Featured &amp; Recommended</option>
                      <option value="popular">🔥 Most Popular</option>
                      <option value="rating">🌟 Highest Rated (5.0 ★)</option>
                      <option value="price-low">💰 Price: Low to High</option>
                      <option value="price-high">💎 Price: High to Low</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Active Filter Pills Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E8D5B7]/60 dark:border-[#3D372E] text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#5C4033] dark:text-[#D8CFBF]">
                    Showing <strong className="text-[#2C1810] dark:text-white">{sortedProducts.length}</strong> harvests
                  </span>

                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#9C5B23] text-white">
                      <span>Category: {selectedCategory}</span>
                      <button onClick={() => onSelectCategory('all')} className="hover:opacity-80">✕</button>
                    </span>
                  )}

                  {selectedBenefit !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E8D5B7] dark:bg-[#3D372E] text-[#2C1810] dark:text-white">
                      <span>Benefit: {selectedBenefit}</span>
                      <button onClick={() => setSelectedBenefit('all')} className="hover:opacity-80">✕</button>
                    </span>
                  )}

                  {selectedPriceRange !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E8D5B7] dark:bg-[#3D372E] text-[#2C1810] dark:text-white">
                      <span>Price: {selectedPriceRange}</span>
                      <button onClick={() => setSelectedPriceRange('all')} className="hover:opacity-80">✕</button>
                    </span>
                  )}

                  {onlyBestSellers && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-200 text-amber-900">
                      <span>🔥 Best Sellers</span>
                      <button onClick={() => setOnlyBestSellers(false)} className="hover:opacity-80">✕</button>
                    </span>
                  )}
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] font-black text-[#9C5B23] dark:text-[#E9BE5F] hover:underline cursor-pointer ml-auto"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </div>

            {/* Product Cards Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] rounded-3xl p-12 text-center border border-dashed border-[#E8D5B7] dark:border-[#3D372E] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8D5B7]/50 dark:bg-[#3D372E] flex items-center justify-center text-3xl mx-auto">
                  🍯
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2C1810] dark:text-white">
                  No Honey Harvests Found
                </h3>
                <p className="text-xs text-[#8C7A65] dark:text-[#A69888] max-w-md mx-auto">
                  We couldn&apos;t find any batches matching your current filter selection or search query.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#9C5B23] hover:bg-[#834917] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

            {/* Bottom Sourcing & Purity Assurance Banner */}
            <div className="bg-gradient-to-r from-[#FAF5EB] via-[#F3EAD8] to-[#FAF5EB] dark:from-[#1E1B17] dark:via-[#25221D] dark:to-[#1E1B17] p-6 rounded-3xl border border-[#E8D5B7] dark:border-[#3D372E] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#9C5B23]/10 dark:bg-[#E9BE5F]/10 text-[#9C5B23] dark:text-[#E9BE5F] rounded-2xl shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#2C1810] dark:text-white">100% Unfiltered &amp; Raw</div>
                  <p className="text-[11px] text-[#8C7A65] dark:text-[#A69888]">Retains natural bee pollen, royal jelly enzymes &amp; trace minerals.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#9C5B23]/10 dark:bg-[#E9BE5F]/10 text-[#9C5B23] dark:text-[#E9BE5F] rounded-2xl shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#2C1810] dark:text-white">Mother-Owned Apiary</div>
                  <p className="text-[11px] text-[#8C7A65] dark:text-[#A69888]">Empowering rural beekeepers and sustainable traditional apiculture.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#9C5B23]/10 dark:bg-[#E9BE5F]/10 text-[#9C5B23] dark:text-[#E9BE5F] rounded-2xl shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-[#2C1810] dark:text-white">Zero Breakage Packaging</div>
                  <p className="text-[11px] text-[#8C7A65] dark:text-[#A69888]">Eco-cushioned glass jar delivery across all Indian pin codes.</p>
                </div>
              </div>
            </div>

          </main>

        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs lg:hidden animate-fadeIn">
          <div className="bg-[#FAF5EB] dark:bg-[#1E1B17] w-full max-h-[85vh] rounded-t-3xl p-6 overflow-y-auto space-y-6 border-t-2 border-[#9C5B23] shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between border-b border-[#E8D5B7] dark:border-[#3D372E] pb-3">
              <div className="flex items-center gap-2 font-serif font-bold text-base text-[#2C1810] dark:text-white">
                <Filter className="w-4 h-4 text-[#9C5B23]" />
                <span>Filter Products</span>
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full hover:bg-[#E8D5B7] cursor-pointer"
              >
                <X className="w-5 h-5 text-[#8C7A65]" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#5C4033] dark:text-[#D8CFBF]">Categories</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'all', label: 'All Collections' },
                  { id: 'honey', label: 'Pure Raw Honey' },
                  { id: 'pickles', label: 'Traditional Pickles' },
                  { id: 'badis', label: 'Handmade Badis' },
                  { id: 'spices', label: 'Heritage Spices' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id as CategoryType)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold text-left truncate transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#9C5B23] text-white shadow-xs'
                        : 'bg-white dark:bg-[#25221D] text-[#4A3B32] dark:text-[#D8CFBF] border border-[#E8D5B7] dark:border-[#423A30]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Benefits */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-[#5C4033] dark:text-[#D8CFBF]">Health Benefits</label>
              <div className="space-y-1">
                {BENEFIT_FILTERS.map((bf) => (
                  <button
                    key={bf.id}
                    onClick={() => setSelectedBenefit(bf.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      selectedBenefit === bf.id
                        ? 'bg-[#9C5B23]/15 text-[#9C5B23] dark:text-[#E9BE5F] border border-[#9C5B23]'
                        : 'bg-white dark:bg-[#25221D] text-[#4A3B32] dark:text-[#D8CFBF]'
                    }`}
                  >
                    <span>{bf.label}</span>
                    {selectedBenefit === bf.id && <Check className="w-4 h-4 text-[#9C5B23]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Reset Buttons */}
            <div className="flex items-center gap-3 pt-3 border-t border-[#E8D5B7] dark:border-[#3D372E]">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 text-xs font-bold text-[#5C4033] dark:text-[#D8CFBF] bg-white dark:bg-[#25221D] rounded-xl border border-[#E8D5B7] dark:border-[#423A30] cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold text-white bg-[#9C5B23] rounded-xl shadow-md cursor-pointer"
              >
                Apply Filters ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. FOOTER */}
      <Footer />

    </div>
  );
};
