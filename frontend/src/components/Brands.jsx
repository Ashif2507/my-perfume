import React from 'react';

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
    <section className="py-16 bg-luxury-accent/10 border-y border-luxury-gold/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <p className="text-center text-xs uppercase tracking-[0.3em] text-luxury-gold font-semibold mb-10">
          Partner Fragrance Houses
        </p>

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
