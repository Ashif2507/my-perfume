import { Star, ShieldCheck, Quote, Award } from 'lucide-react';
import { useSupabaseData } from '../hooks/useSupabaseData';

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: 'Victoria Vance',
      initials: 'VV',
      rating: 5,
      scent: "Aura Rose D'Or",
      text: "It feels like walking through a private French garden after a morning rain. The rose notes are incredibly fresh and not overly sweet. I get complimented every single time I wear it.",
      date: 'Verified Buyer • 2 weeks ago'
    },
    {
      id: 2,
      name: 'Julian Sterling',
      initials: 'JS',
      rating: 5,
      scent: 'Amber Oud Mystique',
      text: "A masterpiece of sensory depth. The rich blend of smoky oud and warm amber develops beautifully throughout the day. It has incredible longevity—lasting easily over 12 hours.",
      date: 'Verified Buyer • 1 month ago'
    },
    {
      id: 3,
      name: 'Elena Rostova',
      initials: 'ER',
      rating: 5,
      scent: 'Sandalwood Noir',
      text: "Sophisticated, warm, and comforting. The sandalwood is creamy and elegant. It wraps you in a cozy, mysterious cloud. This has officially become my signature autumn fragrance.",
      date: 'Verified Buyer • 3 days ago'
    }
  ];

  const { data: fetchedReviews } = useSupabaseData('reviews', reviews);

  return (
    <section id="reviews" className="py-24 bg-luxury-dark border-t border-luxury-gold/5 relative overflow-hidden">
      
      {/* Decorative layout elements */}
      <div className="absolute top-10 left-10 text-white/5 pointer-events-none">
        <Quote className="h-48 w-48 rotate-180" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold">
            <Award className="h-3.5 w-3.5" />
            <span>Verified Reviews</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">
            Whispers of Satisfaction
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover honest impressions from verified fragrance connoisseurs in our community.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fetchedReviews.map((review) => (
            <div 
              key={review.id}
              className="group relative rounded-2xl p-8 bg-luxury-card border border-white/5 flex flex-col justify-between glass-card-hover"
            >
              
              {/* Star rating and verified badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex text-luxury-gold">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-300 text-sm italic font-light leading-relaxed mb-6 flex-grow">
                "{review.text}"
              </p>

              {/* Reviewer Details */}
              <div className="flex items-center space-x-4 pt-6 border-t border-white/5">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-luxury-gold to-luxury-bronze flex items-center justify-center text-luxury-dark font-bold text-sm">
                  {review.initials}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-white">{review.name}</h4>
                  <p className="text-[11px] text-luxury-goldlight mt-0.5">
                    Purchased: <span className="font-serif">{review.scent}</span>
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    {review.date}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
