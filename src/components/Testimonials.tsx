import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-warm-bg dark:bg-stone-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="flex items-center justify-center space-x-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            Loved by Thousands Across India
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base">
            Read what our verified buyers say about our raw honey, pickles, and spices.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-stone-800 rounded-3xl p-8 border border-stone-200/80 dark:border-stone-700/80 shadow-md relative flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <Quote className="w-10 h-10 text-amber-400/30 absolute top-6 right-6 pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                {/* Rating */}
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed italic">
                  "{item.comment}"
                </p>

                <div className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-lg w-max">
                  Item: {item.productName}
                </div>
              </div>

              {/* Author Profile */}
              <div className="flex items-center space-x-3 pt-6 mt-6 border-t border-stone-100 dark:border-stone-700">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
                />
                <div>
                  <div className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <span title="Verified Buyer">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500/20" />
                    </span>
                  </div>
                  <div className="text-xs text-stone-400 dark:text-stone-500">
                    {item.location} • {item.date}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Google Business Rating CTA Strip */}
        <div className="mt-16 bg-white dark:bg-stone-800 rounded-2xl p-6 border border-stone-200 dark:border-stone-700 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-sm">
          <div>
            <div className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">Google Business Reviews</div>
            <div className="text-xs text-stone-500 dark:text-stone-400">Rated 4.9/5 stars based on 520+ local buyer reviews in Patna & Bihar</div>
          </div>
          <a
            href="#google-reviews"
            onClick={(e) => {
              e.preventDefault();
              alert('Redirecting to Google Business Reviews page.');
            }}
            className="px-5 py-2.5 bg-stone-900 dark:bg-stone-700 hover:bg-stone-800 text-amber-400 text-xs font-bold rounded-xl whitespace-nowrap transition-colors"
          >
            View Google Reviews
          </a>
        </div>

      </div>
    </section>
  );
};
