import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Brands() {
  const brands = [
    { name: 'CHANEL', desc: 'Paris' },
    { name: 'DIOR', desc: 'Grasse' },
    { name: 'CREED', desc: 'London' },
    { name: 'TOM FORD', desc: 'New York' },
    { name: 'BYREDO', desc: 'Stockholm' },
    { name: 'JO MALONE', desc: 'London' }
  ];

  return (
    <section className="py-24 bg-luxury-accent/10 border-y border-luxury-gold/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Trusted Maisons</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">
            Partner Fragrance Houses
          </h2>
          <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Sourced from the world's most renowned perfumeries and ateliers.
          </p>
        </div>

        {/* Brand Names Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
          {brands.map((brand) => (
            <div 
              key={brand.name} 
              className="text-center group cursor-pointer transition-all duration-300 transform hover:scale-105"
            >
              <span className="font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-gray-400 group-hover:text-luxury-gold transition-colors duration-300">
                {brand.name}
              </span>
              <p className="text-[9px] uppercase tracking-widest text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {brand.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
