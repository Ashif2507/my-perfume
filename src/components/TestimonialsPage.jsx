import { Quote } from 'lucide-react';
import Reviews from './Reviews';


export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-luxury-dark pt-32 pb-24 relative selection:bg-luxury-gold selection:text-luxury-dark">
      <div className="absolute top-40 right-10 text-white/5 pointer-events-none">
        <Quote className="h-64 w-64 rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-10 space-y-4">
        <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold animate-fade-in-up">
          <Quote className="h-3.5 w-3.5" />
          <span>The Verdict</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-wide animate-fade-in-up">
          Client Testimonials
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
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
