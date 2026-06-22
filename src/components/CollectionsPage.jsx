import { Sparkles } from 'lucide-react';
import floralImg from '../assets/images/perfume_floral.png';
import woodyImg from '../assets/images/perfume_woody.png';
import orientalImg from '../assets/images/perfume_oriental.png';
import freshImg from '../assets/images/perfume_fresh.png';

export default function CollectionsPage() {
  const collections = [
    {
      name: 'Floral Palette',
      image: floralImg,
      description: 'A romantic journey through blooming gardens. Featuring notes of delicate peonies, lush roses, and sweet jasmine blossoms. Perfect for the elegant soul.',
      notes: 'Romantic & Delicate',
      color: 'from-pink-500/20 to-transparent'
    },
    {
      name: 'Woody & Earthy',
      image: woodyImg,
      description: 'Grounding and profound. Experience the warmth of rich sandalwood, majestic cedar, and earthy vetiver. Designed for those who seek depth.',
      notes: 'Warm & Grounding',
      color: 'from-amber-600/20 to-transparent'
    },
    {
      name: 'Oriental Spices',
      image: orientalImg,
      description: 'An exotic allure of intoxicating spices, sweet vanilla, and golden amber. Sensual, mysterious, and unforgettable.',
      notes: 'Sensual & Mysterious',
      color: 'from-purple-500/20 to-transparent'
    },
    {
      name: 'Fresh Citrus',
      image: freshImg,
      description: 'A burst of revitalizing energy. Crisp marine accents blend with zesty citrus and cool mint for a truly refreshing signature scent.',
      notes: 'Crisp & Energizing',
      color: 'from-teal-500/20 to-transparent'
    }
  ];

  return (
    <div className="min-h-screen bg-luxury-dark pt-32 pb-24 relative selection:bg-luxury-gold selection:text-luxury-dark">
      {/* Background glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold animate-fade-in-up">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The Masterpiece</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-wide animate-fade-in-up">
            Curated Collections
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
            Immerse yourself in our distinct olfactory directories. Each collection is a testament to the art of fine perfumery, blending rare ingredients into unforgettable signatures.
          </p>
        </div>

        {/* Collections Stack Layout */}
        <div className="space-y-24">
          {collections.map((col, idx) => (
            <div 
              key={col.name}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5] rounded-3xl overflow-hidden border border-white/5 group">
                  <div className={`absolute inset-0 bg-gradient-to-tr ${col.color} mix-blend-overlay z-10`}></div>
                  <img 
                    src={col.image} 
                    alt={col.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-luxury-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <span className="inline-block border border-luxury-gold/30 bg-luxury-gold/10 text-luxury-gold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold">
                  {col.notes}
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-wide">
                  {col.name}
                </h2>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                  {col.description}
                </p>
                <div className="pt-4">
                  <button className="btn-gold px-8 py-4 rounded-xl text-xs uppercase tracking-widest font-semibold hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all">
                    Explore {col.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
