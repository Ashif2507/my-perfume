import React, { useState, useEffect } from 'react';
import { Percent, Gift, Award, Clock } from 'lucide-react';

export default function OfferBanner() {
  // Set target countdown: 24 hours from current time
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section id="offers" className="py-20 bg-luxury-dark relative overflow-hidden">
      
      {/* Background glow highlights */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-80 h-80 bg-luxury-gold/5 rounded-full filter blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-luxury-bronze/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Card Container */}
        <div className="relative rounded-3xl overflow-hidden border border-luxury-gold/20 bg-gradient-to-r from-luxury-accent/80 via-luxury-card/90 to-luxury-accent/80 p-8 md:p-12 shadow-2xl glow-gold">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Promo Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/25">
                <Percent className="h-4 w-4 text-luxury-gold" />
                <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">
                  Limited Time Exclusive
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-5xl font-semibold text-white leading-tight">
                Summer Solstice Special
              </h3>

              <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed max-w-xl">
                Elevate your fragrance collection. Take an extra <strong className="text-luxury-gold">20% off</strong> all signature collections. Use code <span className="font-mono bg-luxury-accent px-2 py-1 rounded border border-white/10 text-white font-bold">AURA20</span> at checkout.
              </p>

              {/* Perks Highlights */}
              <div className="flex flex-wrap gap-6 pt-2 text-xs uppercase tracking-widest font-semibold text-gray-400">
                <div className="flex items-center space-x-2">
                  <Gift className="h-4 w-4 text-luxury-gold" />
                  <span>Free Gift Wrap</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-luxury-gold" />
                  <span>Complimentary Samples</span>
                </div>
              </div>
            </div>

            {/* Countdown and CTA */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6 bg-luxury-dark/40 border border-white/5 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center space-x-2 text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">
                <Clock className="h-4 w-4 text-luxury-gold" />
                <span>Offer Expires In:</span>
              </div>

              {/* Countdown Numbers */}
              <div className="flex space-x-4">
                <div className="text-center">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-white block bg-luxury-accent/60 border border-luxury-gold/20 rounded-lg px-3 py-2">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1 block">Hours</span>
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-luxury-gold py-2">:</div>
                <div className="text-center">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-white block bg-luxury-accent/60 border border-luxury-gold/20 rounded-lg px-3 py-2">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1 block">Mins</span>
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-luxury-gold py-2">:</div>
                <div className="text-center">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-white block bg-luxury-accent/60 border border-luxury-gold/20 rounded-lg px-3 py-2">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 mt-1 block">Secs</span>
                </div>
              </div>

              {/* CTA */}
              <a 
                href="#products" 
                className="btn-gold w-full text-center py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold block mt-4"
              >
                Claim Offer Now
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
