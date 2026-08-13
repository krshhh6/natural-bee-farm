import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#282823] text-[#F5E8B6] pt-16 pb-12 border-t border-[#595C56]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card Section */}
        <div className="bg-gradient-to-r from-[#1C1C18] via-[#363630] to-[#1C1C18] rounded-3xl p-8 sm:p-12 border border-[#595C56]/40 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-xl text-center lg:text-left space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Stay Connected with <span className="text-[#E9BE5F]">Natura Bee Farm</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#F5E8B6]/90">
              Subscribe to get secret seasonal recipes, new batch alerts, and 10% off your first artisanal honey order.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 min-w-[300px] sm:min-w-[400px]">
            {subscribed ? (
              <div className="flex-1 px-4 py-3 bg-[#1C1C18] text-emerald-300 border border-emerald-500/60 rounded-2xl text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Subscribed! Check your inbox for your 10% off code.</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#282823] border border-[#595C56]/40 rounded-2xl text-xs text-white placeholder-[#F5E8B6]/60 focus:outline-none focus:border-[#E9BE5F]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#E9BE5F] hover:bg-[#D4AA4B] text-[#282823] font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-md"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5 text-[#282823]" />
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#595C56]/30 text-xs sm:text-sm">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="Natura Bee Farm Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="font-serif text-2xl font-bold text-white">
                Natura <span className="text-[#E9BE5F]">Bee Farm</span>
              </span>
            </div>
            <p className="text-[#F5E8B6]/80 leading-relaxed max-w-sm">
              Preserving India's rich culinary traditions through 100% natural, preservative-free raw honey, sun-dried badis, and handcrafted pickles.
            </p>
            <div className="text-xs text-[#E9BE5F] font-semibold">
              Woman-Led Enterprise • Founded by Shital Gupta
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Artisanal Shop</h4>
            <ul className="space-y-2 text-[#F5E8B6]/80">
              <li><a href="#shop" className="hover:text-[#E9BE5F] transition-colors">Wildforest Raw Honey</a></li>
              <li><a href="#shop" className="hover:text-[#E9BE5F] transition-colors">Garlic & Amla Pickles</a></li>
              <li><a href="#shop" className="hover:text-[#E9BE5F] transition-colors">Sun-Dried Chana Badis</a></li>
              <li><a href="#shop" className="hover:text-[#E9BE5F] transition-colors">Hand-Pounded Spices</a></li>
              <li><a href="#shop" className="hover:text-[#E9BE5F] transition-colors">Organic Ragi Flour</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Our Brand</h4>
            <ul className="space-y-2 text-[#F5E8B6]/80">
              <li><a href="#our-story" className="hover:text-[#E9BE5F] transition-colors">Our Heritage</a></li>
              <li><a href="#our-story" className="hover:text-[#E9BE5F] transition-colors">Women Artisan Community</a></li>
              <li><a href="#" className="hover:text-[#E9BE5F] transition-colors">Lab Testing & Quality</a></li>
              <li><a href="#" className="hover:text-[#E9BE5F] transition-colors">Bulk & Wholesale Inquiry</a></li>
              <li><a href="#" className="hover:text-[#E9BE5F] transition-colors">Shipping & Returns Policy</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-2.5 text-[#F5E8B6]/80 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E9BE5F] shrink-0 mt-0.5" />
                <span>Natura Bee Farm, Kankarbagh Main Road, Patna, Bihar - 800020</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E9BE5F] shrink-0" />
                <span>+91 98350 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E9BE5F] shrink-0" />
                <span>care@naturabeefarm.in</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Payments */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5E8B6]/70">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Natura Bee Farm Co. Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E9BE5F] fill-[#E9BE5F]" />
            <span>in Patna, India.</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-semibold text-[#F5E8B6]">
            <span className="px-2 py-1 bg-[#1C1C18] border border-[#595C56]/40 rounded">UPI</span>
            <span className="px-2 py-1 bg-[#1C1C18] border border-[#595C56]/40 rounded">Google Pay</span>
            <span className="px-2 py-1 bg-[#1C1C18] border border-[#595C56]/40 rounded">Visa / MasterCard</span>
            <span className="px-2 py-1 bg-[#1C1C18] border border-[#595C56]/40 rounded">Net Banking</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
