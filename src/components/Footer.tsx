import React, { useState } from 'react';
import { Phone, Mail, ArrowRight, CheckCircle2, MapPin, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() || phone.trim()) {
      setSubscribed(true);
      setEmail('');
      setPhone('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#FEFDF5] dark:bg-[#1A1816] text-[#231F1B] dark:text-[#FEFDF5] pt-16 sm:pt-20 pb-0 border-t border-[#E7DFD3] dark:border-neutral-800 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-16 text-xs sm:text-sm">
          
          {/* Column 1: Brand Logo & Bio */}
          <div className="lg:col-span-1 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center p-0.5 bg-white shadow-xs">
                <img
                  src="/logo.png"
                  alt="Natura Bee Farm Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-widest text-[#231F1B] dark:text-white uppercase leading-none">
                  NATURA <span className="text-[#9C5B23] dark:text-[#E9BE5F]">BEE FARM</span>
                </span>
                <span className="text-[9px] tracking-[0.2em] font-semibold text-[#8C5E2B] dark:text-[#E9BE5F]/80 uppercase mt-0.5">
                  ARTISANAL TRADITION
                </span>
              </div>
            </div>

            <p className="text-[#5C5247] dark:text-[#E6DBCB] text-xs sm:text-sm leading-relaxed mt-4">
              Bringing the wisdom and flavors of Old Bharat to today's tables — that's the Natura Bee Farm promise.
            </p>
          </div>

          {/* Column 2: HELPFUL LINKS */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#231F1B] dark:text-white tracking-widest uppercase mb-4">
              HELPFUL LINKS
            </h4>
            <ul className="space-y-2.5 text-[#5C5247] dark:text-[#E6DBCB] text-xs sm:text-sm font-medium">
              <li><a href="#our-story" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Our Story</a></li>
              <li><a href="#product-catalog" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Recipes</a></li>
              <li><a href="#" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Blog</a></li>
              <li><a href="#our-story" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Quality & Testing</a></li>
              <li><a href="#" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Manufacturer List</a></li>
              <li><a href="#" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Career</a></li>
            </ul>
          </div>

          {/* Column 3: POLICIES */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#231F1B] dark:text-white tracking-widest uppercase mb-4">
              POLICIES
            </h4>
            <ul className="space-y-2.5 text-[#5C5247] dark:text-[#E6DBCB] text-xs sm:text-sm font-medium">
              <li><a href="#" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#9C5B23] dark:hover:text-[#E9BE5F] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Column 4: CONTACT US */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#231F1B] dark:text-white tracking-widest uppercase mb-4">
              CONTACT & LOCATION
            </h4>
            <div className="text-[#5C5247] dark:text-[#E6DBCB] text-xs sm:text-sm space-y-2 leading-relaxed font-normal">
              <div className="font-bold text-[#231F1B] dark:text-white">Natural Honey Farm</div>
              <div>Bahpura - Bihta Rd, Mustafapur, Patna, Bihar 801111</div>
              <div className="text-xs text-[#8C5E2B] dark:text-[#E9BE5F] font-semibold">Plus Code: HWX8+QR Patna, Bihar</div>
              <div className="text-xs font-bold text-[#282823] dark:text-[#FEFDF5]">📞 099390 55989</div>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">🕒 Open Daily: 9:00 AM – 7:00 PM</div>
              <div className="pt-1.5">
                <a
                  href="https://maps.app.goo.gl/wJPC1YirTNqkTF136"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#9C5B23] hover:bg-[#834917] text-white px-3.5 py-1.5 rounded-lg text-xs font-extrabold shadow-sm transition-all transform hover:scale-105"
                >
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  <span>Open Live Google Maps</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: SUBSCRIBE TO OUR NEWSLETTER */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-extrabold text-[#231F1B] dark:text-white tracking-wider uppercase mb-4">
              SUBSCRIBE TO OUR NEWSLETTER
            </h4>

            {subscribed ? (
              <div className="p-3 bg-[#E8F5E9] text-[#1B5E20] border border-[#A5D6A7] rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1B5E20]" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                {/* Phone Input Box */}
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-[#25221D] border border-[#D8C9B5] dark:border-[#40382C] rounded-full text-xs text-[#231F1B] dark:text-white placeholder-[#9C8B77] focus:outline-none focus:border-[#9C5B23] transition-all shadow-2xs"
                  />
                </div>

                {/* Email Input Box with Submit Arrow */}
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-[#25221D] border border-[#D8C9B5] dark:border-[#40382C] rounded-full text-xs text-[#231F1B] dark:text-white placeholder-[#9C8B77] focus:outline-none focus:border-[#9C5B23] transition-all shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-[#9C5B23] dark:text-[#E9BE5F] hover:bg-[#F5EEDD] transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Social Icons (Brown Circles) */}
            <div className="flex items-center space-x-3 pt-2">
              {/* Facebook */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#593E2B] text-white flex items-center justify-center hover:bg-[#9C5B23] transition-colors shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#593E2B] text-white flex items-center justify-center hover:bg-[#9C5B23] transition-colors shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#593E2B] text-white flex items-center justify-center hover:bg-[#9C5B23] transition-colors shadow-sm"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Decorative Organic Wave & Tan Dunes Footer Bottom Strip */}
      <div className="relative w-full overflow-hidden leading-none mt-4">
        
        {/* Organic Wave SVG Shape */}
        <svg
          className="relative block w-full h-16 sm:h-24 text-[#D8B482] dark:text-[#3B3023]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>

        {/* Bottom Bar Content inside Wave Strip */}
        <div className="bg-[#D8B482] dark:bg-[#3B3023] py-4 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#3D2C1A] dark:text-[#F3E5AB]">
            
            {/* Copyright */}
            <div>
              © {new Date().getFullYear()} Natura Bee Farm. All Rights Reserved.
            </div>

            {/* Payment Method Badges (VISA, MasterCard, PayPal, GPay, etc.) */}
            <div className="flex items-center space-x-2 text-[10px] font-extrabold uppercase flex-wrap">
              <span className="px-2 py-0.5 bg-white text-[#1A1F71] rounded shadow-2xs">VISA</span>
              <span className="px-2 py-0.5 bg-white text-[#EB001B] rounded shadow-2xs">MasterCard</span>
              <span className="px-2 py-0.5 bg-white text-[#003087] rounded shadow-2xs">PayPal</span>
              <span className="px-2 py-0.5 bg-white text-[#00AFEE] rounded shadow-2xs">Skrill</span>
              <span className="px-2 py-0.5 bg-white text-[#FF9900] rounded shadow-2xs">Amazon Pay</span>
              <span className="px-2 py-0.5 bg-white text-[#4285F4] rounded shadow-2xs">GPay</span>
            </div>

          </div>
        </div>

      </div>

    </footer>
  );
};
