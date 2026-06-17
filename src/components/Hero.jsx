import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroPerfume from '../assets/images/hero_perfume.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-luxury-dark via-luxury-accent to-luxury-dark">
      
      {/* Background glow highlights */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-luxury-gold/5 rounded-full filter blur-[100px] pointer-events-none animate-pulse-subtle"></div>
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-luxury-bronze/5 rounded-full filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content Column */}
          <div className="lg:col-span-7 space-y-8 text-left animate-fade-in-up">
            
            {/* Tagline */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-luxury-gold/10 border border-luxury-gold/20">
              <Sparkles className="h-4 w-4 text-luxury-gold" />
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-luxury-gold">
                The Art of Liquid Emotion
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-tight text-white">
              Scent Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold via-luxury-goldlight to-luxury-bronze">
                Signature Aura
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl max-w-xl font-light leading-relaxed">
              Unveil your identity with our curated gallery of premium, artisanal fragrances. Handcrafted essences imported from Grasse, designed to capture unforgettable memories.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#products" 
                className="btn-gold flex items-center justify-center space-x-2 px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold"
              >
                <span>Shop Bestsellers</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a 
                href="#categories" 
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-full border border-luxury-gold/30 hover:border-luxury-gold text-white text-sm uppercase tracking-widest font-semibold transition-all duration-300 bg-white/5 hover:bg-white/10"
              >
                <span>Explore Scents</span>
              </a>
            </div>

            {/* Stats/Highlights */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-luxury-gold/10">
              <div>
                <p className="font-serif text-3xl font-bold text-luxury-gold">50+</p>
                <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Niche Brands</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-luxury-gold">24h</p>
                <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Long-lasting Wear</p>
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-luxury-gold">100%</p>
                <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Cruelty-Free</p>
              </div>
            </div>

          </div>

          {/* Luxury Image Display Column */}
          <div className="lg:col-span-5 flex justify-center items-center relative animate-fade-in">
            {/* Elegant outer border framing */}
            <div className="absolute inset-0 border border-luxury-gold/15 rounded-3xl transform rotate-3 scale-95 pointer-events-none"></div>
            <div className="absolute inset-0 border border-luxury-gold/10 rounded-3xl transform -rotate-3 scale-95 pointer-events-none"></div>
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl glow-gold border border-luxury-gold/20 max-w-sm sm:max-w-md w-full animate-float bg-luxury-card">
              <img 
                src={heroPerfume} 
                alt="Luxury perfume display representing signature Aura collection" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-luxury-dark/90 to-transparent p-6 text-center">
                <span className="font-serif text-xl italic tracking-wider text-luxury-goldlight">
                  AURA L'Extrême
                </span>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-[0.15em]">
                  Limited Gold Edition
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
