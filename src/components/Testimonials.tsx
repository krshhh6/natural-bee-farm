import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-[#F5E8B6] dark:bg-[#1C1C18] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="flex items-center justify-center space-x-1 text-[#E9BE5F]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#E9BE5F] text-[#E9BE5F]" />
            ))}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#282823] dark:text-[#F5E8B6]">
            Loved by Thousands Across India
          </h2>
          <p className="text-[#595C56] dark:text-[#F5E8B6]/80 text-sm sm:text-base">
            Read what our verified buyers say about our raw honey, pickles, and spices.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF3D6] dark:bg-[#282823] rounded-3xl p-8 border border-[#595C56]/40 shadow-md relative flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <Quote className="w-10 h-10 text-[#E9BE5F]/30 absolute top-6 right-6 pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                {/* Rating */}
                <div className="flex items-center space-x-1 text-[#E9BE5F]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E9BE5F] text-[#E9BE5F]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[#282823] dark:text-[#F5E8B6] text-sm leading-relaxed italic">
                  "{item.comment}"
                </p>

                <div className="text-xs font-bold text-[#282823] bg-[#E9BE5F] px-3 py-1.5 rounded-lg w-max shadow-sm">
                  Item: {item.productName}
                </div>
              </div>

              {/* Author Profile */}
              <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-[#595C56]/30">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#E9BE5F]"
                />
                <div>
                  <div className="font-serif font-bold text-sm text-[#282823] dark:text-[#F5E8B6] flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <span title="Verified Buyer">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                    </span>
                  </div>
                  <div className="text-xs text-[#595C56] dark:text-[#F5E8B6]/60">
                    {item.location} • {item.date}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Google Business Rating CTA Strip */}
        <div className="mt-16 bg-[#FAF3D6] dark:bg-[#282823] rounded-2xl p-6 border border-[#595C56]/40 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <div className="font-serif font-bold text-lg text-[#282823] dark:text-[#F5E8B6]">Google Business Reviews</div>
            <div className="text-xs text-[#595C56] dark:text-[#F5E8B6]/70">Rated 4.9/5 stars based on 520+ local buyer reviews in Patna & Bihar</div>
          </div>
          <a
            href="#google-reviews"
            onClick={(e) => {
              e.preventDefault();
              alert('Redirecting to Google Business Reviews page.');
            }}
            className="px-5 py-2.5 bg-[#282823] hover:bg-[#1C1C18] text-[#E9BE5F] text-xs font-bold rounded-xl whitespace-nowrap transition-colors shadow-sm"
          >
            View Google Reviews
          </a>
        </div>

      </div>
    </section>
  );
};
