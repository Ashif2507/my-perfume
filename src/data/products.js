import floralImg from '../assets/images/perfume_floral.png';
import woodyImg from '../assets/images/perfume_woody.png';
import orientalImg from '../assets/images/perfume_oriental.png';
import freshImg from '../assets/images/perfume_fresh.png';

// ── Shared Standard Products ───────────────────────────────────────────────
export const standardProducts = [
  // From Products.jsx (bestsellers, arrivals, trending) and BestSellers.jsx (Top Rated, Most Popular, Customer Favorites)
  {
    id: 'p1', // Aura Rose D'Or (Products.jsx, BestSellers.jsx)
    name: "Aura Rose D'Or",
    type: 'Eau de Parfum',
    price: 145,
    rating: 4.9,
    reviews: 268,
    image: floralImg,
    badge: '★ 4.9 Editor Award',
    badgeColor: 'bg-purple-950/80 text-purple-200 border border-purple-500/20',
    notes: 'Centifolia Rose, Bulgarian Iris, Warm Musk',
    desc: 'Our signature rose accord — rich, powdery-clean, and utterly timeless.',
    category: 'Floral'
  },
  {
    id: 'p2', // Amber Oud Mystique
    name: 'Amber Oud Mystique',
    type: 'Extrait de Parfum',
    price: 195,
    rating: 5.0,
    reviews: 312,
    image: orientalImg,
    badge: '★ 5.0 Perfect Score',
    badgeColor: 'bg-luxury-gold text-luxury-dark',
    notes: 'Ambergris, Aged Oud, Saffron, Rose Absolute',
    desc: 'The rarest oriental treasure in our vault. Skin-hugging, hypnotic, and universally adored.',
    category: 'Oriental'
  },
  {
    id: 'p3', // Sandalwood Noir
    name: 'Sandalwood Noir',
    type: 'Eau de Parfum',
    price: 160,
    rating: 4.8,
    reviews: 184,
    sold: '2,800+ sold',
    image: woodyImg,
    badge: '🔥 Trending #1',
    badgeColor: 'bg-orange-950/80 text-orange-200 border border-orange-500/20',
    notes: 'Mysore Sandalwood, Black Pepper, Dark Leather, Amber',
    desc: 'Consistently our fastest-selling Eau de Parfum. Rich, approachable, and endlessly wearable.',
    category: 'Woody'
  },
  {
    id: 'p4', // Citrus Splash
    name: 'Citrus Splash',
    type: 'Eau de Cologne',
    price: 115,
    rating: 4.7,
    reviews: 141,
    sold: '2,200+ sold',
    image: freshImg,
    badge: '🔥 Trending #2',
    badgeColor: 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/20',
    notes: 'Italian Bergamot, Green Lime, Sea Accord, White Musk',
    desc: 'The ultimate crowd-pleaser — a sparkling, effortless scent loved by over two thousand happy customers.',
    category: 'Fresh'
  },
  {
    id: 'p5', // Bergamot Horizon
    name: 'Bergamot Horizon',
    type: 'Eau de Toilette',
    price: 125,
    rating: 4.6,
    reviews: 99,
    sold: '1,600+ sold',
    image: freshImg,
    badge: '🔥 Trending #3',
    badgeColor: 'bg-blue-950/80 text-blue-200 border border-blue-500/20',
    notes: 'Bergamot, Cardamom, Driftwood, Vetiver',
    desc: 'Clean, adventurous, and endlessly wearable — made for those who want to leave a lasting impression.',
    category: 'Fresh'
  },
  {
    id: 'p6', // Vanilla Infusion
    name: 'Vanilla Infusion',
    type: 'Extrait de Parfum',
    price: 185,
    rating: 4.9,
    reviews: 224,
    image: orientalImg,
    badge: '★ 4.9 Crowd Darling',
    badgeColor: 'bg-rose-950/80 text-rose-200 border border-rose-500/20',
    notes: 'Tahitian Vanilla, Labdanum, Tonka Bean, Sandalwood',
    desc: 'Irresistibly warm and gourmand — the scent equivalent of a cashmere embrace.',
    category: 'Oriental'
  },
  {
    id: 'p7', // Imperial Vetiver
    name: 'Imperial Vetiver',
    type: 'Eau de Parfum',
    price: 175,
    rating: 4.9,
    reviews: 196,
    image: woodyImg,
    badge: '★ 4.9 Masterwork',
    badgeColor: 'bg-amber-950/80 text-amber-200 border border-amber-500/20',
    notes: 'Haitian Vetiver, Oakmoss, Smoked Birch, Cedar',
    desc: 'A bold, rooty masterwork for those who appreciate the raw poetry of the earth.',
    category: 'Woody'
  },
  {
    id: 'p8', // Peony Velvet
    name: 'Peony Velvet',
    type: 'Eau de Parfum',
    price: 150,
    rating: 4.8,
    reviews: 203,
    repurchaseRate: '74% repurchase rate',
    image: floralImg,
    badge: '❤ Customer #1 Pick',
    badgeColor: 'bg-rose-600 text-white',
    notes: 'Pink Peony, Fresh Violet, White Amber, Skin Musk',
    desc: 'Voted #1 in our annual customer survey — soft, romantic, and perfect for all day wear.',
    quote: '"I\'ve bought this four times. It\'s simply my life scent." — Priya R.',
    category: 'Floral'
  },
  {
    id: 'p9', // Saffron Dusk (BestSellers.jsx + NewArrivals.jsx)
    name: 'Saffron Dusk',
    type: 'Eau de Parfum',
    price: 185,
    rating: 4.8,
    reviews: 178,
    repurchaseRate: '68% repurchase rate',
    image: orientalImg,
    badge: '❤ Most Gifted',
    badgeColor: 'bg-luxury-gold text-luxury-dark',
    notes: 'Saffron, Cedarwood, Warm Amber, Cashmere',
    desc: 'Our single most-gifted fragrance. Rich, warm, and perfect for making someone feel truly special.',
    quote: '"Gifted this to my mother. She cried. Enough said." — James T.',
    category: 'Oriental'
  },
  {
    id: 'p10', // Jasmine Sauvage
    name: 'Jasmine Sauvage',
    type: 'Eau de Parfum',
    price: 190,
    rating: 4.9,
    reviews: 159,
    repurchaseRate: '71% repurchase rate',
    image: floralImg,
    badge: '❤ Most Reviewed',
    badgeColor: 'bg-purple-600 text-white',
    notes: 'Night Jasmine, Clementine, Neroli, White Oud',
    desc: 'The most written-about fragrance on our platform. Complex, feminine-forward, utterly captivating.',
    quote: '"Smells expensive in the best possible way. Heads turn constantly." — Sofia M.',
    category: 'Floral'
  },
  {
    id: 'p11', // L'Élixir Rare
    name: "L'Élixir Rare",
    type: 'Extrait de Parfum',
    price: 210,
    rating: 4.9,
    reviews: 48,
    image: woodyImg,
    badge: 'Trending Scent',
    badgeColor: 'bg-luxury-gold text-luxury-dark',
    notes: 'Oud, Aged Patchouli, Sweet Saffron',
    desc: 'A mesmerizing and intense scent profile featuring aged oud.',
    category: 'Woody'
  },
  {
    id: 'p12', // Valkyrie Mist
    name: 'Valkyrie Mist',
    type: 'Eau de Parfum',
    price: 165,
    rating: 4.7,
    reviews: 21,
    image: freshImg,
    badge: 'Editor Choice',
    badgeColor: 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/20',
    notes: 'Salted Sage, Juniper Berry, Sea Moss',
    desc: 'An oceanic and fresh scent that revitalizes the spirit.',
    category: 'Fresh'
  }
];

// ── Gift Sets ─────────────────────────────────────────────────────────────
export const giftSetsData = [
  {
    id: 'g1',
    name: "The Obsidian Gentleman's Suite",
    type: 'Gift Set',
    category: "Men's",
    price: 220,
    valuePrice: 285,
    rating: 4.9,
    reviews: 36,
    image: woodyImg,
    badge: 'Bestseller',
    badgeColor: 'bg-luxury-gold text-luxury-dark',
    contents: ['100ml Sandalwood Noir Extrait', '75ml Scented Aftershave Balm', '10ml Travel Atomizer'],
    notes: 'Oud, Leather, Smoked Cedar, Patchouli',
    desc: 'A deeply masculine, resinous exploration of luxury. Packaged in a velvet-lined matte black lacquer box with gold embossed accents.'
  },
  {
    id: 'g2',
    name: 'Riviera Citrus Voyage Set',
    type: 'Gift Set',
    category: "Men's",
    price: 145,
    valuePrice: 190,
    rating: 4.7,
    reviews: 18,
    image: freshImg,
    badge: 'Fresh Choice',
    badgeColor: 'bg-emerald-950/80 text-emerald-200 border border-emerald-500/20',
    contents: ['100ml Citrus Splash Eau de Cologne', '150ml Hydrating Body Wash', 'Vegan Leather Travel Pouch'],
    notes: 'Bergamot, Lime Leaf, Vetiver, White Amber',
    desc: 'Capturing the vibrant salt air and citrus groves of the French Riviera. A lightweight, refreshing scent layer set perfect for summer.'
  },
  {
    id: 'g3',
    name: 'Jasmine & Rose Velvet Duet',
    type: 'Gift Set',
    category: "Women's",
    price: 240,
    valuePrice: 310,
    rating: 5.0,
    reviews: 42,
    image: floralImg,
    badge: 'Highly Coveted',
    badgeColor: 'bg-purple-950/80 text-purple-200 border border-purple-500/20',
    contents: ['100ml Aura Rose D\'Or Eau de Parfum', '200ml Night-Blooming Jasmine Body Cream', 'Wax-Sealed Scented Candle'],
    notes: 'Centifolia Rose, Neroli, Night Jasmine, Warm Amber',
    desc: 'A romantic floral symphony. Housed in a circular, gold-wrapped hatbox lined with heavy premium silk lining.'
  },
  {
    id: 'g4',
    name: 'Ambre Mystique Luxury Treasure',
    type: 'Gift Set',
    category: "Women's",
    price: 195,
    valuePrice: 250,
    rating: 4.8,
    reviews: 25,
    image: orientalImg,
    badge: 'Limited Run',
    badgeColor: 'bg-amber-950/80 text-amber-200 border border-amber-500/20',
    contents: ['100ml Amber Oud Mystique', '30ml Nourishing Silk Body Oil', 'Collectible Crystal Scent Dipper'],
    notes: 'Black Saffron, Cashmere Wood, Warm Amber, Vetiver',
    desc: 'An opulent, oriental treasure box. Rich, lingering textures designed to leave a sophisticated, velvet trail.'
  },
  {
    id: 'g5',
    name: 'The Sovereign Masterpiece Chest',
    type: 'Gift Set',
    category: 'Luxury',
    price: 550,
    valuePrice: 720,
    rating: 5.0,
    reviews: 14,
    image: orientalImg,
    badge: 'VVIP Exclusive',
    badgeColor: 'bg-rose-950 text-rose-200 border border-rose-500/20',
    contents: ['100ml Aura Absolue Imperial (Gold Flakes)', '100ml Nuit Étoilée Grand Extrait', 'Heavy Crystal Decanter Stopper', 'VIP Boutique Consultation Pass'],
    notes: 'Jasmine Absolute, White Truffle, Mysore Sandalwood, Frankincense',
    desc: 'The pinnacle of olfactory luxury. Hand-assembled walnut wood chest with antique brass hinges. Strictly limited production.'
  },
  {
    id: 'g6',
    name: 'Niche Scent Discovery Vault',
    type: 'Gift Set',
    category: 'Luxury',
    price: 180,
    valuePrice: 220,
    rating: 4.9,
    reviews: 58,
    image: floralImg,
    badge: 'Perfect Gift',
    badgeColor: 'bg-blue-950/85 text-blue-200 border border-blue-500/20',
    contents: ['10 x 3ml Miniature Extrait Vials', 'Handmade Scent Profile Journal', 'Gilded Custom Monogram Pen', '$50 Full-Bottle Credit Card'],
    notes: 'An exhaustive library of all AURA fragrance profiles',
    desc: 'The ultimate interactive gift. Sample ten signature creations at leisure, with a voucher included to purchase their full-size favorite.'
  }
];

// ── Collections ───────────────────────────────────────────────────────────
export const collectionsData = [
  {
    id: 'c1',
    name: 'The Obsidian Trilogy',
    type: 'Collection',
    subtitle: 'Premium Oud & Wood Cask Trio',
    desc: 'A dark, complex journey exploring the rich, resinous undertones of aged agarwood, leather, and smoked cedar. Features three 30ml extraits.',
    price: 380,
    image: woodyImg,
    contents: ['Oud Absolute', 'Smoked Cedar', 'Leather Accord'],
    badge: 'Signature Box',
    category: 'Collection',
    rating: 4.9,
    reviews: 30
  },
  {
    id: 'c2',
    name: 'Summer in Grasse Trio',
    type: 'Collection',
    subtitle: 'Sun-drenched Florals & Citrus',
    desc: 'Capturing the vibrant energy of the French Riviera. Bright bergamot combined with fresh hand-picked centifolia roses and clean lavender.',
    price: 290,
    image: freshImg,
    contents: ['Centifolia Rose', 'Riviera Bergamot', 'Wild Lavender'],
    badge: 'Limited Run',
    category: 'Collection',
    rating: 4.8,
    reviews: 24
  },
  {
    id: 'c3',
    name: 'Niche Discovery Set',
    type: 'Collection',
    subtitle: 'Curated Scent Explorers Kit',
    desc: 'Unveil your signature scent. An interactive sample suite containing five 2ml glass vials of our most popular new releases, plus a $30 credit.',
    price: 85,
    image: floralImg,
    contents: ['5 Mini Vials', 'Scent Profile Card', '$30 Store Voucher'],
    badge: 'Best Value',
    category: 'Collection',
    rating: 4.9,
    reviews: 120
  }
];

// ── Limited Editions ──────────────────────────────────────────────────────
export const limitedEditionsData = [
  {
    id: 'le1',
    name: 'Aura Absolue Imperial',
    type: 'Grand Extrait',
    price: 450,
    batch: 'Batch No. 08 / 150',
    desc: 'Matured for 36 months, featuring pure edible gold leaf flakes floating in rich jasmine sambac absolute and rare white truffle oil. Housed in a hand-cut lead crystal decanter.',
    image: orientalImg,
    rarity: 'Only 150 bottles worldwide',
    notes: 'White Truffle, Gold Jasmine, Aged Mysore Sandalwood',
    category: 'Limited Edition',
    rating: 5.0,
    reviews: 12
  },
  {
    id: 'le2',
    name: 'Nuit Étoilée Extrait',
    type: 'Concentrated Nectar',
    price: 520,
    batch: 'Batch No. 42 / 200',
    desc: 'An ethereal nocturnal blend utilizing night-blooming cereus flowers that only open once a year, blended with dark frankincense and rich Madagascar vanilla beans.',
    image: floralImg,
    rarity: 'Only 200 bottles worldwide',
    notes: 'Queen of the Night, Royal Frankincense, Pure Vanilla Pod',
    category: 'Limited Edition',
    rating: 5.0,
    reviews: 8
  }
];

// ── All Products Aggregation ──────────────────────────────────────────────
export const allProductsData = [
  ...standardProducts,
  ...giftSetsData,
  ...collectionsData,
  ...limitedEditionsData
];

export function getProductById(id) {
  if (id && id.startsWith('custom_')) {
    const parts = id.split('_');
    const name = parts[1] ? decodeURIComponent(parts[1]) : 'Bespoke Blend';
    const type = parts[2] ? decodeURIComponent(parts[2]) : 'Custom Fragrance';
    const price = Number(parts[3]) || 150;
    return {
      id,
      name,
      type,
      price,
      image: freshImg,
      category: 'Bespoke',
      rating: 5.0,
      reviews: 1,
      notes: 'Bespoke Scent Formulation',
      desc: 'A uniquely crafted fragrance tailored to your personal olfactory preferences.'
    };
  }
  return allProductsData.find((p) => p.id === id);
}
