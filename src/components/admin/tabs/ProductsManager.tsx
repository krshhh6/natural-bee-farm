import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Check,
  X,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import type { Product, CategoryType } from '@/types';

export const ProductsManager: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductStatus } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'outofstock'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'honey' as CategoryType,
    categoryName: 'Artisanal Honey',
    price: 499,
    originalPrice: 599,
    weight: '500g',
    weightsAvailableStr: '250g, 500g, 1kg',
    image: '/Glass_jar_filled_with_honey_202608130958.jpeg',
    description: '',
    ingredientsStr: '100% Raw Forest Honey',
    isOrganic: true,
    isBestSeller: false,
    isMustTry: false,
    isTrending: false,
    badgeText: '',
    badgeEmoji: '',
    discountTag: 'Upto 15% OFF',
    inStock: true,
    origin: 'Bihar Apiaries',
  });

  // Filtered List
  const filteredProducts = products.filter((p: Product) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'instock' && p.inStock) ||
      (stockFilter === 'outofstock' && !p.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Sample High-Res Images for Quick Pick
  const sampleImages = [
    { label: 'Honey Jar Wooden Table', url: '/Honey_jar_on_wooden_surface_202608130958.jpeg' },
    { label: 'Raw Wild Honey Jar', url: '/Glass_jar_filled_with_honey_202608130958.jpeg' },
    { label: 'Mustard Oil Glass Jar', url: '/Glass_jar_filled_with_mustard_202608131002.jpeg' },
    { label: 'Tulsi Blossom Honey', url: '/Jar_of_tulsi_honey_on_202608130958.jpeg' },
    { label: 'Cinnamon Infused Honey', url: '/Honey_jar_with_cinnamon_and_202608130958.jpeg' },
    { label: 'Saffron Honey Jar', url: '/Saffron_honey_jar_on_plate_202608130959.jpeg' },
  ];

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'honey',
      categoryName: 'Artisanal Honey',
      price: 499,
      originalPrice: 599,
      weight: '500g',
      weightsAvailableStr: '250g, 500g, 1kg',
      image: '/Glass_jar_filled_with_honey_202608130958.jpeg',
      description: 'Handcrafted pure traditional food item sourced with pristine care.',
      ingredientsStr: '100% Pure Natural Ingredients',
      isOrganic: true,
      isBestSeller: false,
      isMustTry: false,
      isTrending: false,
      badgeText: '',
      badgeEmoji: '',
      discountTag: 'Flat 15% OFF',
      inStock: true,
      origin: 'Organic Apiary, Bihar',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      categoryName: product.categoryName,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      weight: product.weight,
      weightsAvailableStr: product.weightsAvailable ? product.weightsAvailable.join(', ') : '250g, 500g',
      image: product.image,
      description: product.description,
      ingredientsStr: product.ingredients ? product.ingredients.join(', ') : '',
      isOrganic: !!product.isOrganic,
      isBestSeller: !!product.isBestSeller,
      isMustTry: !!product.isMustTry,
      isTrending: !!product.isTrending,
      badgeText: product.badgeText || '',
      badgeEmoji: product.badgeEmoji || '',
      discountTag: product.discountTag || '',
      inStock: product.inStock,
      origin: product.origin,
    });
    setIsModalOpen(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const weightsArr = formData.weightsAvailableStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const ingredientsArr = formData.ingredientsStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      name: formData.name,
      category: formData.category,
      categoryName: formData.categoryName,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      weight: formData.weight,
      weightsAvailable: weightsArr.length > 0 ? weightsArr : [formData.weight],
      image: formData.image,
      description: formData.description,
      ingredients: ingredientsArr,
      isOrganic: formData.isOrganic,
      isBestSeller: formData.isBestSeller,
      isMustTry: formData.isMustTry,
      isTrending: formData.isTrending,
      badgeText: formData.badgeText || undefined,
      badgeEmoji: formData.badgeEmoji || undefined,
      discountTag: formData.discountTag || undefined,
      inStock: formData.inStock,
      origin: formData.origin,
      rating: editingProduct ? editingProduct.rating : 4.9,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 12,
    };

    if (editingProduct) {
      updateProduct({
        ...productPayload,
        id: editingProduct.id,
      });
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#231F1B] p-5 rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white">
            Products & Variants Management
          </h2>
          <p className="text-xs text-[#736B60] dark:text-[#A69C8F] mt-0.5">
            Manage inventory prices, discounts, variants, ingredients, images & status
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9C5B23] to-[#80481A] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C5B23] dark:text-[#E9BE5F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by product name or origin..."
            className="w-full bg-white dark:bg-[#231F1B] border border-[#E7DFD3] dark:border-neutral-800 rounded-xl px-3.5 py-2.5 pl-10 text-xs font-medium text-[#231F1B] dark:text-white placeholder-[#8C7A65] focus:outline-none focus:ring-2 focus:ring-[#9C5B23]"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="w-full bg-white dark:bg-[#231F1B] border border-[#E7DFD3] dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#231F1B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C5B23]"
          >
            <option value="all">All Categories ({products.length})</option>
            <option value="honey">Artisanal Honey</option>
            <option value="ghee">Bilona A2 Ghee</option>
            <option value="oils">Cold Pressed Oils</option>
            <option value="spices">Handcrafted Spices</option>
            <option value="flours">Organic Flours</option>
          </select>
        </div>

        {/* Stock Status Filter */}
        <div className="relative">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as any)}
            className="w-full bg-white dark:bg-[#231F1B] border border-[#E7DFD3] dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs font-medium text-[#231F1B] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#9C5B23]"
          >
            <option value="all">All Stock Statuses</option>
            <option value="instock">In Stock Only</option>
            <option value="outofstock">Disabled / Out of Stock</option>
          </select>
        </div>

      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-[#231F1B] rounded-2xl border border-[#E7DFD3] dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E7DFD3] dark:border-neutral-800 text-[#736B60] dark:text-[#A69C8F] uppercase font-bold text-[10px] tracking-wider bg-[#FEFDF5] dark:bg-[#1C1C18]">
                <th className="py-3.5 px-4">Product Info</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price & Discount</th>
                <th className="py-3.5 px-4">Available Variants</th>
                <th className="py-3.5 px-4">Stock State</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD3] dark:divide-neutral-800 font-medium">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#736B60] dark:text-[#A69C8F]">
                    No products found matching filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product: Product) => (
                  <tr key={product.id} className="hover:bg-[#FEFDF5] dark:hover:bg-[#2A2621] transition-colors">
                    
                    {/* Name & Thumbnail */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-[#E7DFD3] dark:border-neutral-800 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-[#231F1B] dark:text-white flex items-center gap-1.5">
                            <span>{product.name}</span>
                            {product.isOrganic && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-bold">
                                Organic
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#736B60] dark:text-[#A69C8F] truncate max-w-xs">
                            {product.origin}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#9C5B23] dark:text-[#E9BE5F] uppercase text-[10px] tracking-wider">
                        {product.categoryName}
                      </span>
                    </td>

                    {/* Price & Discount */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#231F1B] dark:text-white">
                        ₹{product.price}
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-[#8C7A65] line-through ml-1.5 font-normal">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      {product.discountTag && (
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                          {product.discountTag}
                        </div>
                      )}
                    </td>

                    {/* Variants */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {product.weightsAvailable?.map((w: string) => (
                          <span
                            key={w}
                            className="px-2 py-0.5 rounded bg-[#F5EEDD] dark:bg-[#2F2923] border border-[#E0D0B6] dark:border-[#40372B] text-[10px] font-bold text-[#3D3730] dark:text-[#E6DBCB]"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Stock Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleProductStatus(product.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-colors ${
                          product.inStock
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                      >
                        {product.inStock ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Stock (Active)</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="p-1.5 rounded-lg bg-[#F5EEDD] dark:bg-[#2A2621] hover:bg-[#9C5B23] hover:text-white transition-colors text-[#231F1B] dark:text-white"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-[#FEFDF5] dark:bg-[#1F1C18] border border-[#E7DFD3] dark:border-neutral-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-[#282823] dark:text-[#FEFDF5] max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-serif text-[#231F1B] dark:text-white mb-5">
              {editingProduct ? 'Edit Product & Variant Specs' : 'Create New Product Record'}
            </h2>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Name */}
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Raw Eucalyptus Blossom Honey"
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      const cat = e.target.value as CategoryType;
                      let label = 'Artisanal Delicacy';
                      if (cat === 'honey') label = 'Artisanal Honey';
                      if (cat === 'ghee') label = 'Traditional Bilona Ghee';
                      if (cat === 'oils') label = 'Cold Pressed Oils';
                      if (cat === 'spices') label = 'Handcrafted Spices';
                      if (cat === 'flours') label = 'Stone Ground Flour';
                      setFormData({ ...formData, category: cat, categoryName: label });
                    }}
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  >
                    <option value="honey">Honey</option>
                    <option value="ghee">Ghee</option>
                    <option value="oils">Oils</option>
                    <option value="spices">Spices</option>
                    <option value="flours">Flours</option>
                    <option value="pickles">Pickles</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Price */}
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  />
                </div>

                {/* Original Price */}
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Original Price (MRP ₹)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  />
                </div>

                {/* Discount Tag */}
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Discount Badge Tag
                  </label>
                  <input
                    type="text"
                    value={formData.discountTag}
                    onChange={(e) => setFormData({ ...formData, discountTag: e.target.value })}
                    placeholder="e.g. Upto 15% OFF"
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Primary Weight */}
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Default Unit Weight (e.g. 500g / 1000 ML)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  />
                </div>

                {/* Weights Available (Variants) */}
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Available Variants (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.weightsAvailableStr}
                    onChange={(e) => setFormData({ ...formData, weightsAvailableStr: e.target.value })}
                    placeholder="250g, 500g, 1kg"
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  />
                </div>
              </div>

              {/* Image URL Picker */}
              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Product Image URL
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                />
                
                {/* Sample asset pickers */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="text-[10px] font-bold text-[#736B60] dark:text-[#A69C8F] self-center">Quick Pick:</span>
                  {sampleImages.map((img) => (
                    <button
                      key={img.url}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: img.url })}
                      className="text-[10px] px-2 py-1 rounded bg-[#E9BE5F]/15 hover:bg-[#E9BE5F]/30 text-[#9C5B23] dark:text-[#E9BE5F] font-bold transition-colors"
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                />
              </div>

              {/* Ingredients & Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Ingredients (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={formData.ingredientsStr}
                    onChange={(e) => setFormData({ ...formData, ingredientsStr: e.target.value })}
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#595247] dark:text-[#C5BBAE] uppercase mb-1">
                    Origin / Source Region
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    className="w-full bg-[#F5EEDD] dark:bg-[#2A2621] border border-[#E0D0B6] dark:border-[#40372B] rounded-xl p-2.5 font-semibold text-[#231F1B] dark:text-white"
                  />
                </div>
              </div>

              {/* Checkboxes & Flags */}
              <div className="pt-2 flex flex-wrap gap-4 font-bold text-[#231F1B] dark:text-white">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="rounded text-[#9C5B23]"
                  />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isOrganic}
                    onChange={(e) => setFormData({ ...formData, isOrganic: e.target.checked })}
                    className="rounded text-[#9C5B23]"
                  />
                  <span>100% Organic Certified</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="rounded text-[#9C5B23]"
                  />
                  <span>Best Seller Flag</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isTrending}
                    onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                    className="rounded text-[#9C5B23]"
                  />
                  <span>Trending Flag</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-[#E7DFD3] dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#9C5B23] hover:bg-[#80481A] text-white font-bold shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
