import React from 'react';
import OfferBanner from './OfferBanner';
import { Gift, Sparkles, Star } from 'lucide-react';

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-luxury-dark pt-32 pb-24 relative selection:bg-luxury-gold selection:text-luxury-dark">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full filter blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold">
          <Gift className="h-3.5 w-3.5" />
          <span>Atelier Promotions</span>
        </div>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white tracking-wide">
          Exclusive Offers
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
          Discover our latest promotions, limited-time sets, and exclusive perks designed to elevate your AURA experience.
        </p>
      </div>

      {/* Main Promo Banner */}
      <OfferBanner />

      {/* Secondary Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h3 className="font-serif text-2xl md:text-3xl text-white mb-10 text-center">More Privileges</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-luxury-card border border-white/5 p-8 rounded-2xl glass-card-hover text-center">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center mx-auto mb-6">
              <Gift className="h-6 w-6 text-luxury-gold" />
            </div>
            <h4 className="text-lg font-medium text-white mb-3">Complimentary Gifting</h4>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Every order includes our signature luxury gift wrapping and a personalized note card.
            </p>
          </div>
          <div className="bg-luxury-card border border-white/5 p-8 rounded-2xl glass-card-hover text-center">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="h-6 w-6 text-luxury-gold" />
            </div>
            <h4 className="text-lg font-medium text-white mb-3">Discovery Set Bonus</h4>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Receive 3 complimentary samples of your choice with any full-size fragrance purchase.
            </p>
          </div>
          <div className="bg-luxury-card border border-white/5 p-8 rounded-2xl glass-card-hover text-center">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center mx-auto mb-6">
              <Star className="h-6 w-6 text-luxury-gold" />
            </div>
            <h4 className="text-lg font-medium text-white mb-3">Aura Society Rewards</h4>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              Join our loyalty program to earn points on every purchase and unlock private sales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
