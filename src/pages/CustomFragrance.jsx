import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { standardProducts, giftSetsData } from '../data/products';
import { Link } from 'react-router-dom';
import { Sparkles, Gift, Star, Heart, ShoppingBag, Check, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, MessageSquare, Award, Flame } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../supabaseClient';

export default function CustomFragrance() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Customizer selections state
  const [collection, setCollection] = useState('Signature Perfume');
  const [brand, setBrand] = useState('Aura Signature');
  const [scentFamily, setScentFamily] = useState('Oriental');
  const [selectedNotes, setSelectedNotes] = useState(['White Oud', 'Saffron']);
  const [quantity, setQuantity] = useState(1);
  const [premiumPackaging, setPremiumPackaging] = useState(false);
  const [giftNote, setGiftNote] = useState('');

  // Added to cart feedback state
  const [isAdding, setIsAdding] = useState(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Constants
  const collections = [
    { name: 'Signature Perfume', price: 150, desc: 'A bespoke 100ml fragrance tailored to your personal aesthetic.' },
    { name: 'Luxury Collection', price: 280, desc: 'Two custom 50ml bottles housed in a wax-sealed wood casket.' },
    { name: 'Gift Set', price: 220, desc: 'One bespoke 100ml perfume alongside matching body oil & discovery vials.' },
    { name: 'Exclusive Fragrance Box', price: 350, desc: 'The ultimate bespoke experience. Four 30ml extraits in a velvet chest.' },
  ];

  const brands = ['Aura Signature', 'Grasse Reserve', 'Parisian Oud', 'Royal Nectar'];
  
  const scentFamilies = [
    { name: 'Woody', notes: ['Sandalwood', 'Cedarwood', 'Vetiver', 'Patchouli'] },
    { name: 'Floral', notes: ['Rose Absolute', 'Jasmine Sambac', 'Neroli', 'Bulgarian Iris'] },
    { name: 'Oriental', notes: ['White Oud', 'Saffron', 'Ambergris', 'Vanilla Pod'] },
    { name: 'Fresh', notes: ['Sea Moss', 'Salted Sage', 'Mint Leaves', 'Juniper Berry'] },
    { name: 'Citrus', notes: ['Italian Bergamot', 'Green Lime', 'Mandarin', 'Grapefruit'] }
  ];

  const toggleNote = (note) => {
    if (selectedNotes.includes(note)) {
      if (selectedNotes.length > 1) {
        setSelectedNotes(prev => prev.filter(n => n !== note));
      } else {
        toast.error('Select at least one scent note');
      }
    } else {
      if (selectedNotes.length < 4) {
        setSelectedNotes(prev => [...prev, note]);
      } else {
        toast.error('Maximum of 4 scent notes allowed');
      }
    }
  };

  // Pricing calculations
  const selectedCollectionObj = collections.find(c => c.name === collection);
  const basePrice = selectedCollectionObj ? selectedCollectionObj.price : 150;
  const packagingFee = premiumPackaging ? 15 : 0;
  const unitPrice = basePrice + packagingFee;
  const totalPrice = unitPrice * quantity;

  // Add customized item to cart
  const handleAddToCart = async () => {
    setIsAdding(true);
    
    const customName = `Bespoke ${brand} ${collection}`;
    const customType = `${scentFamily} Blend`;
    const customId = `custom_${encodeURIComponent(customName)}_${encodeURIComponent(customType)}_${unitPrice}_${Date.now()}`;
    
    try {
      const sid = localStorage.getItem('aura_session_id') || 'session_fallback';
      await supabase.from('custom_fragrances').insert({
        id: customId,
        session_id: sid,
        name: customName,
        base_note: scentFamily,
        heart_note: selectedNotes.join(', '),
        top_note: brand,
        intensity: collection,
        price: unitPrice
      });
    } catch (e) {
      console.error('Failed to save to Supabase', e);
    }
    
    addToCart(customId, quantity);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1500);
  };

  // Testimonials list
  const testimonials = [
    { name: 'Sophia Loren', role: 'Connoisseur', text: 'I customized the Exclusive Fragrance Box for my anniversary. The Parisian Oud with Saffron notes smells incredibly luxurious and holds countless compliments.', rating: 5 },
    { name: 'Marcus Aurelius', role: 'Verified Collector', text: 'Being able to customize the notes and the concentration is a game-changer. The Grasse Reserve Woody blend is my new signature scent. Utterly outstanding.', rating: 5 },
    { name: 'Genevieve V.', role: 'Style Director', text: 'The customer service and the bespoke packaging are spectacular. The custom gift sets make the most thoughtful, elegant gifts. 10/10 recommendation.', rating: 5 }
  ];

  // FAQ list
  const faqs = [
    { q: 'How is my custom fragrance formulated?', a: 'Our master perfumers in Grasse, France examine your selected scent family, brand direction, and specific notes. They hand-blend pure essential oils, absolutes, and premium carriers to formulate a beautifully balanced bouquet.' },
    { q: 'How long does maturation and shipping take?', a: 'All bespoke fragrances require a maturation period of 10 to 14 days to allow the scent molecules to bind together. Following maturation, we ship via express delivery, which usually takes 3 to 5 business days.' },
    { q: 'Can I return a custom fragrance?', a: 'Because custom fragrances are formulated specifically to your aesthetic, we cannot offer direct refunds. However, we back our formulas with a Scent Harmony Guarantee—if you are not in love with your blend, return it and we will modify it once for free.' },
    { q: 'Are your notes vegan and cruelty-free?', a: 'Yes. All of our notes are clean, sustainable, completely cruelty-free, and ethically sourced. We do not use real animal derivatives like natural musk or castoreum, replacing them with ultra-luxurious clean synthetics.' }
  ];

  return (
    <div className="pt-20 min-h-screen bg-luxury-dark text-gray-100 font-sans selection:bg-luxury-gold selection:text-luxury-dark">
      
      {/* ── 1. Hero Atelier Section ── */}
      <section className="relative py-20 overflow-hidden border-b border-luxury-gold/10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04)_0%,transparent_70%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 text-luxury-gold border border-luxury-gold/30 px-3 py-1 rounded-full bg-luxury-gold/5 animate-fade-in-up">
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">Bespoke Fragrance Atelier</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight animate-fade-in-up">
            Craft Your <span className="text-luxury-gold">Signature Scent</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 font-light text-sm sm:text-base leading-relaxed animate-fade-in-up">
            Unleash your olfactory identity. Personalize the bottle, brand lineage, packaging, and specific aromatic chords to create an exclusive masterpiece.
          </p>
        </div>
      </section>

      {/* ── 2. Customizer Workspace ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form Selections */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Collection Selection */}
            <div className="bg-luxury-card border border-white/5 rounded-2xl p-6 relative">
              <span className="absolute -top-3 left-6 bg-luxury-gold text-luxury-dark text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded">Step 01</span>
              <h3 className="font-serif text-lg text-white mb-4 mt-2">Select A Collection</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {collections.map(item => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setCollection(item.name)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      collection === item.name
                        ? 'bg-luxury-gold/10 border-luxury-gold'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-white text-sm">{item.name}</span>
                      <span className="font-serif text-luxury-gold text-sm font-bold">${item.price}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Brand Lineage */}
            <div className="bg-luxury-card border border-white/5 rounded-2xl p-6 relative">
              <span className="absolute -top-3 left-6 bg-luxury-gold text-luxury-dark text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded">Step 02</span>
              <h3 className="font-serif text-lg text-white mb-4 mt-2">Select Brand Lineage</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {brands.map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBrand(b)}
                    className={`py-3 px-2 rounded-xl text-xs uppercase tracking-widest border transition-all duration-300 font-medium text-center cursor-pointer ${
                      brand === b
                        ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold shadow-md shadow-luxury-gold/10'
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Scent Family & Top Notes */}
            <div className="bg-luxury-card border border-white/5 rounded-2xl p-6 relative">
              <span className="absolute -top-3 left-6 bg-luxury-gold text-luxury-dark text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded">Step 03</span>
              <h3 className="font-serif text-lg text-white mb-4 mt-2">Personalize Scent Profile</h3>
              
              {/* Scent Family Picker */}
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-medium">Scent Family Base</label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-6">
                {scentFamilies.map(f => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => {
                      setScentFamily(f.name);
                      // Default first notes of new family to reset note choices nicely
                      setSelectedNotes(f.notes.slice(0, 2));
                    }}
                    className={`py-2 px-1 rounded-lg text-[10px] uppercase tracking-widest border transition-all duration-300 font-medium text-center cursor-pointer ${
                      scentFamily === f.name
                        ? 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold'
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>

              {/* Scent Notes Picker */}
              <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-medium">
                Choose Olfactory Notes (Select 1 to 4 chords)
              </label>
              <div className="flex flex-wrap gap-2">
                {scentFamilies.flatMap(f => f.notes).map(note => {
                  const isSelected = selectedNotes.includes(note);
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => toggleNote(note)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 border flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-luxury-gold text-luxury-dark border-luxury-gold font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                      {note}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Quantity & Packaging */}
            <div className="bg-luxury-card border border-white/5 rounded-2xl p-6 relative">
              <span className="absolute -top-3 left-6 bg-luxury-gold text-luxury-dark text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded">Step 04</span>
              <h3 className="font-serif text-lg text-white mb-4 mt-2">Fulfillment Options</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                {/* Quantity */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2.5 font-medium">Quantity</label>
                  <div className="flex items-center justify-between bg-luxury-accent/50 border border-white/10 rounded-xl p-2.5 max-w-[140px] text-white">
                    <button 
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 hover:text-luxury-gold text-lg cursor-pointer"
                    >
                      -
                    </button>
                    <span className="font-semibold text-sm">{quantity}</span>
                    <button 
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-1 hover:text-luxury-gold text-lg cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Packaging Checkbox */}
                <button
                  type="button"
                  onClick={() => setPremiumPackaging(!premiumPackaging)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 cursor-pointer ${
                    premiumPackaging
                      ? 'bg-luxury-gold/10 border-luxury-gold'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${premiumPackaging ? 'bg-luxury-gold border-luxury-gold text-luxury-dark' : 'border-white/20'}`}>
                    {premiumPackaging && <Check className="h-3.5 w-3.5 font-bold" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-xs">Premium Gift Wrapping</span>
                      <span className="text-[10px] text-luxury-gold font-bold font-serif">+$15</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-light mt-0.5">Wax-sealed wood box & gold ribboning.</p>
                  </div>
                </button>
              </div>

              {/* Gift Message */}
              <div className="mt-6">
                <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-medium">Custom Gift Note or Message</label>
                <div className="relative">
                  <textarea
                    rows="3"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Write a custom narrative note or dedicated gift wishes..."
                    className="w-full bg-luxury-accent/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all resize-none"
                  />
                  <MessageSquare className="absolute right-3.5 bottom-3.5 h-4.5 w-4.5 text-gray-600" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-luxury-card border border-luxury-gold/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle gold decoration */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-luxury-gold/10 to-transparent rounded-bl-full pointer-events-none" />
              
              <h3 className="font-serif text-2xl text-white mb-6 flex items-center gap-2">
                <Gift className="h-5 w-5 text-luxury-gold" />
                Bespoke Summary
              </h3>

              <div className="space-y-6 text-sm divide-y divide-white/5">
                {/* Configuration Specs */}
                <div className="space-y-3 pb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs">Collection Selection</span>
                    <span className="text-white font-medium text-xs">{collection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs">Brand Lineage</span>
                    <span className="text-white font-medium text-xs">{brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-xs">Scent Profile Base</span>
                    <span className="text-white font-medium text-xs">{scentFamily}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs block mb-1.5">Olfactory Notes</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedNotes.map(note => (
                        <span key={note} className="px-2 py-0.5 text-[10px] rounded bg-white/5 border border-white/10 text-gray-300">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  {giftNote.trim() && (
                    <div>
                      <span className="text-gray-400 text-xs block mb-1">Gift Message</span>
                      <p className="text-[11px] text-gray-300 italic font-light max-h-16 overflow-y-auto bg-luxury-dark/40 border border-white/5 p-2 rounded leading-relaxed">
                        "{giftNote}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Calculations */}
                <div className="space-y-3 pt-6 pb-6 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Base Price ({collection})</span>
                    <span>${basePrice}.00</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Premium Gift Packaging</span>
                    <span>{premiumPackaging ? '+$15.00' : '—'}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Quantity</span>
                    <span>{quantity} unit{quantity > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Estimated Shipping</span>
                    <span className="text-luxury-gold uppercase tracking-wider font-bold">Complimentary</span>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-6 flex justify-between items-center text-lg font-serif">
                  <span className="text-white font-medium">Estimated Total</span>
                  <span className="text-luxury-gold font-bold text-2xl">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Add To Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="btn-gold w-full mt-8 flex justify-center items-center gap-2 py-4 rounded-lg text-xs uppercase tracking-widest font-semibold cursor-pointer disabled:opacity-80"
              >
                {isAdding ? (
                  <>
                    <Check className="h-4.5 w-4.5" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4.5 w-4.5" />
                    <span>Add Custom Scent to Cart</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[10px] text-gray-500 uppercase tracking-widest font-medium">
                <ShieldCheck className="h-4 w-4 text-luxury-gold" />
                Scent Harmony Guarantee Included
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 3. Best-Selling Perfumes Section ── */}
      <section className="py-24 border-t border-white/5 bg-luxury-accent/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left space-y-3">
              <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max text-[10px] uppercase tracking-[0.25em] font-semibold">
                <Flame className="h-3.5 w-3.5 animate-pulse" />
                <span>Exquisite Selection</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">Best-Selling Perfumes</h2>
              <p className="text-gray-400 font-light text-sm max-w-xl leading-relaxed">
                Hand-picked by thousands of discerning customers, rated and re-purchased consistently.
              </p>
            </div>
            <Link 
              to="/best-sellers" 
              className="text-luxury-gold hover:text-luxury-goldlight tracking-widest uppercase text-xs font-semibold underline underline-offset-4 mt-4 md:mt-0 self-start md:self-end animate-pulse-subtle"
            >
              View Full Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {standardProducts.slice(0, 4).map(item => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-luxury-card border border-white/5 flex flex-col p-4 glass-card-hover justify-between">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-luxury-accent/50 mb-5">
                  <Link to={`/product/${item.id}`} className="block w-full h-full">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                  {item.badge && (
                    <span className={`absolute top-3 left-3 z-10 text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-bold shadow-md ${item.badgeColor || 'bg-luxury-gold text-luxury-dark'}`}>
                      {item.badge}
                    </span>
                  )}
                  <button 
                    onClick={() => toggleWishlist(item.id)}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
                      isInWishlist(item.id) ? 'bg-rose-600 border-rose-500 text-white' : 'bg-luxury-dark/60 border-white/10 text-gray-300 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(item.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="text-left space-y-1">
                  <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold">{item.type}</p>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-serif text-base font-semibold text-white group-hover:text-luxury-goldlight transition-colors">{item.name}</h3>
                  </Link>
                  <div className="flex items-center space-x-1 text-luxury-gold pt-1">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="text-[10px] text-gray-400">{item.rating} ({item.reviews} reviews)</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-white/5 mt-4">
                    <span className="text-lg font-serif font-bold text-white">${item.price}.00</span>
                    <button 
                      onClick={() => addToCart(item.id)}
                      className="text-xs uppercase tracking-widest text-luxury-gold hover:text-white transition-colors"
                    >
                      Add To Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. Personalized Gift Sets Section ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left space-y-3">
              <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max text-[10px] uppercase tracking-[0.25em] font-semibold">
                <Gift className="h-3.5 w-3.5" />
                <span>Exquisite Packaging</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-white tracking-wide">Personalized Gift Sets</h2>
              <p className="text-gray-400 font-light text-sm max-w-xl leading-relaxed">
                The ultimate gesture of appreciation, curated in custom hand-pressed wax-sealed cases.
              </p>
            </div>
            <Link 
              to="/gift-sets" 
              className="text-luxury-gold hover:text-luxury-goldlight tracking-widest uppercase text-xs font-semibold underline underline-offset-4 mt-4 md:mt-0 self-start md:self-end animate-pulse-subtle"
            >
              Explore Gift Sets
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {giftSetsData.slice(0, 2).map(set => (
              <div key={set.id} className="group rounded-2xl overflow-hidden bg-luxury-card border border-white/5 p-6 glass-card-hover flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-44 aspect-square bg-luxury-accent/50 rounded-xl overflow-hidden flex-shrink-0 relative">
                  <Link to={`/product/${set.id}`} className="block w-full h-full">
                    <img src={set.image} alt={set.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </Link>
                </div>
                <div className="flex-grow text-left flex flex-col justify-between h-full space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">{set.category} Set</span>
                    <Link to={`/product/${set.id}`}>
                      <h3 className="font-serif text-xl font-semibold text-white mt-1 group-hover:text-luxury-goldlight transition-colors">{set.name}</h3>
                    </Link>
                    <p className="text-xs text-gray-400 mt-2 font-light line-clamp-2">{set.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-2xl font-serif font-bold text-white">${set.price}.00</span>
                    <button 
                      onClick={() => addToCart(set.id)}
                      className="btn-gold px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold cursor-pointer"
                    >
                      Add Set
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 5. Testimonials Section ── */}
      <section className="py-24 bg-luxury-accent/15 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold">
              <Award className="h-3.5 w-3.5" />
              <span>Client Acclaims</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">Testimonials</h2>
            <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Read real stories and insights from clients who designed their custom formulations with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-luxury-card border border-white/5 rounded-2xl p-6 relative flex flex-col justify-between text-left shadow-xl">
                <div className="space-y-4">
                  <div className="flex text-luxury-gold">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 font-light text-sm italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/5">
                  <p className="font-serif text-white font-medium text-sm">{t.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-gold font-semibold mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ Accordion Section ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-16">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 text-luxury-gold px-3 py-1 rounded-full border border-luxury-gold/20 bg-luxury-gold/5 w-max mx-auto text-[10px] uppercase tracking-[0.25em] font-semibold">
              <HelpCircle className="h-3.5 w-3.5" />
              <span>Common Queries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">FAQ</h2>
            <p className="text-gray-400 font-light text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Have questions about our formulation processes, raw ingredients, or deliveries? Learn more below.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-luxury-card border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-serif text-white font-medium sm:text-lg">{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-5 w-5 text-luxury-gold" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 border-t border-white/5">
                      <p className="text-gray-400 font-light text-sm leading-relaxed mt-4">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
