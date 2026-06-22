import { Sparkles } from 'lucide-react';
import floralImg from '../assets/images/perfume_floral.png';
import woodyImg from '../assets/images/perfume_woody.png';
import orientalImg from '../assets/images/perfume_oriental.png';
import freshImg from '../assets/images/perfume_fresh.png';

export default function Categories() {
  const categories = [
    {
      name: 'Floral',
      image: floralImg,
      description: 'Peonies, roses, and sweet jasmine blossoms.',
      notes: 'Romantic & Delicate',
      color: 'from-pink-500/10 to-transparent'
    },
    {
      name: 'Woody',
      image: woodyImg,
      description: 'Warm sandalwood, rich cedar, and earthy vetiver.',
      notes: 'Warm & Grounding',
      color: 'from-amber-600/10 to-transparent'
    },
    {
      name: 'Oriental',
      image: orientalImg,
      description: 'Exotic spices, sweet vanilla, and golden amber.',
      notes: 'Sensual & Mysterious',
      color: 'from-purple-500/10 to-transparent'
    },
    {
      name: 'Fresh',
      image: freshImg,
      description: 'Zesty citrus, cool mint, and marine accents.',
      notes: 'Crisp & Energizing',
      color: 'from-teal-500/10 to-transparent'
    }
  ];

  return (
    <section id="categories" className="py-24 bg-luxury-dark border-t border-luxury-gold/5 relative overflow-hidden">
      
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/3 rounded-full filter blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fragrance Families</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">
            Explore Aromatic Styles
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Select your preferred olfactory profile to discover tailored signature scents.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map(cat => (
            <div 
              key={cat.name}
              className="group relative rounded-2xl overflow-hidden border border-white/5 bg-luxury-card/50 glass-card-hover flex flex-col justify-between"
            >
              
              {/* Image & Background Blend */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} mix-blend-overlay z-10`}></div>
                <img 
                  src={cat.image} 
                  alt={`${cat.name} Fragrance Family`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-luxury-dark/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 z-10"></div>
                
                {/* Notes Tag */}
                <span className="absolute top-4 left-4 z-20 text-[10px] uppercase tracking-widest bg-luxury-gold/90 text-luxury-dark px-3 py-1 rounded-full font-bold">
                  {cat.notes}
                </span>

                {/* Content over image */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="font-serif text-2xl font-semibold text-white mb-2 group-hover:text-luxury-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  
                  {/* Hover discovery action */}
                  <span className="inline-flex items-center text-xs uppercase tracking-widest font-semibold text-luxury-gold hover:text-luxury-goldlight transition-colors cursor-pointer">
                    Discover Collection &rarr;
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
