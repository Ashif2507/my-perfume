import React from 'react';
import Reviews from './Reviews';
import { Quote } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-luxury-dark pt-32 pb-24 relative selection:bg-luxury-gold selection:text-luxury-dark">
      <div className="absolute top-40 right-10 text-white/5 pointer-events-none">
        <Quote className="h-64 w-64 rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-10">
        <span className="text-luxury-gold text-sm uppercase tracking-[0.3em] font-bold mb-4 block">The Verdict</span>
        <h1 className="font-serif text-4xl md:text-6xl font-semibold text-white tracking-wide mb-6">
          Client Testimonials
        </h1>
        <p className="text-gray-400 text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
          Read what our discerning clientele has to say about their signature scents and the AURA experience.
        </p>
      </div>

      <div className="pt-8">
        <Reviews />
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl mx-auto mt-20 px-4">
        <div className="bg-luxury-card/50 border border-luxury-gold/20 rounded-3xl p-10 text-center glass-card-hover">
          <h3 className="font-serif text-2xl text-white mb-4">Share Your Experience</h3>
          <p className="text-gray-400 font-light mb-8">
            We invite you to share your thoughts on our fragrances. Your feedback helps us continue crafting unparalleled olfactory masterpieces.
          </p>
          <button className="btn-gold px-8 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold">
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}
