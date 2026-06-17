import React from 'react';
import { Sparkles, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

// Custom Brand SVGs since Lucide v1.x removed brand icons
const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to the AURA newsletter!');
  };

  return (
    <footer className="bg-luxury-dark border-t border-luxury-gold/10 pt-20 pb-10 relative overflow-hidden">
      
      {/* Footer Top Newsletter Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 text-left">
            <h4 className="font-serif text-2xl md:text-3xl text-white font-medium mb-2">
              Join the Inner Circle
            </h4>
            <p className="text-gray-400 text-sm font-light">
              Subscribe to receive exclusive access to private sales, new arrivals, and scent stories.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-luxury-accent/50 border border-white/10 rounded-full py-4 pl-6 pr-16 text-sm text-white focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 p-2.5 rounded-full bg-luxury-gold hover:bg-luxury-goldlight text-luxury-dark transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Footer Links & Brand Intro Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand Intro Column */}
          <div className="md:col-span-4 space-y-6 text-left">
            <a href="#" className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-luxury-gold" />
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-white">
                AURA
              </span>
            </a>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Crafting sensory identities for individuals who seek sophistication, depth, and the luxury of self-expression.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-luxury-gold hover:border-luxury-gold/30 transition-colors" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className="p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-luxury-gold hover:border-luxury-gold/30 transition-colors" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className="p-2 rounded-full border border-white/5 bg-white/5 text-gray-400 hover:text-luxury-gold hover:border-luxury-gold/30 transition-colors" aria-label="Twitter">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Directory Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left">
            
            <div>
              <h5 className="text-xs uppercase tracking-widest text-luxury-gold font-bold mb-4">Collections</h5>
              <ul className="space-y-2.5 text-sm font-light text-gray-400">
                <li><a href="#categories" className="hover:text-white transition-colors">Floral Palette</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Woody & Earthy</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Oriental Spices</a></li>
                <li><a href="#categories" className="hover:text-white transition-colors">Fresh Citrus</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-luxury-gold font-bold mb-4">Scent Services</h5>
              <ul className="space-y-2.5 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Private Consultation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Virtual Scent Finder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bespoke Gifting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h5 className="text-xs uppercase tracking-widest text-luxury-gold font-bold mb-4">Customer Care</h5>
              <ul className="space-y-2.5 text-sm font-light text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">F.A.Q.</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Footer Bottom Copy Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-light">
        <p>&copy; {currentYear} AURA Fragrances. All Rights Reserved.</p>
        
        {/* Payment symbols placeholder */}
        <div className="flex space-x-3 mt-4 sm:mt-0 items-center">
          <ShieldCheck className="h-4.5 w-4.5 text-luxury-gold" />
          <span className="tracking-widest uppercase text-[10px]">Secure 256-Bit SSL Checkout</span>
        </div>
      </div>

    </footer>
  );
}
