import React, { useState, useMemo } from 'react';

interface Product {
  id: string;
  name: string;
  aliexpressPrice: number;
  shippingCost: number;
  suggestedEtsyPrice: number;
  category: string;
  tags: string[];
  imageKeywords: string;
  description: string;
  competitionLevel: 'Low' | 'Medium' | 'High';
  estimatedMonthlySales: string;
  rating: number;
  orders: string;
}

const ETSY_LISTING_FEE = 0.20;
const ETSY_TRANSACTION_FEE_RATE = 0.065;
const ETSY_PAYMENT_PROCESSING_RATE = 0.03;
const ETSY_PAYMENT_PROCESSING_FIXED = 0.25;

const BOHEMIAN_LIGHT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Rattan Woven Pendant Light Shade',
    aliexpressPrice: 8.50,
    shippingCost: 0,
    suggestedEtsyPrice: 38.99,
    category: 'Bohemian Pendant Lights',
    tags: ['rattan pendant light', 'boho ceiling light', 'woven light shade', 'bohemian decor', 'natural fiber lamp', 'farmhouse pendant', 'rattan lampshade', 'boho nursery light', 'coastal pendant', 'wicker light fixture', 'handwoven lamp', 'boho living room', 'eco friendly light'],
    imageKeywords: 'rattan woven pendant lamp bohemian',
    description: 'Handwoven rattan pendant light shade that brings warm, bohemian charm to any space. Natural fiber construction creates beautiful shadow patterns when lit. Perfect for living rooms, bedrooms, nurseries, and dining areas.',
    competitionLevel: 'Medium',
    estimatedMonthlySales: '50-120',
    rating: 4.7,
    orders: '2,400+'
  },
  {
    id: '2',
    name: 'Macrame Woven Lamp Shade Cover',
    aliexpressPrice: 5.80,
    shippingCost: 0,
    suggestedEtsyPrice: 29.99,
    category: 'Bohemian Lamp Shades',
    tags: ['macrame lamp shade', 'boho light cover', 'woven lampshade', 'bohemian bedroom light', 'macrame home decor', 'handmade lamp cover', 'boho nursery decor', 'cotton rope lamp', 'hippie light shade', 'macrame pendant', 'boho gift for her', 'textile lamp shade', 'artisan light'],
    imageKeywords: 'macrame lamp shade boho woven',
    description: 'Beautifully handcrafted macrame lamp shade cover made from natural cotton rope. Creates a warm, cozy ambiance with intricate woven patterns. Easily slips over existing lamp shades for an instant bohemian upgrade.',
    competitionLevel: 'Low',
    estimatedMonthlySales: '30-80',
    rating: 4.6,
    orders: '1,100+'
  },
  {
    id: '3',
    name: 'Moroccan Turkish Mosaic Table Lamp',
    aliexpressPrice: 12.90,
    shippingCost: 2.50,
    suggestedEtsyPrice: 54.99,
    category: 'Bohemian Table Lamps',
    tags: ['moroccan table lamp', 'turkish mosaic lamp', 'bohemian desk light', 'colorful glass lamp', 'mosaic night light', 'boho bedside lamp', 'handmade mosaic light', 'turkish lamp', 'ethnic table lamp', 'stained glass lamp', 'boho gift', 'meditation room light', 'eclectic decor'],
    imageKeywords: 'moroccan mosaic table lamp colorful bohemian',
    description: 'Stunning handcrafted Moroccan-style mosaic table lamp with vibrant colored glass pieces. Each lamp is unique with beautiful light patterns that transform any room into a bohemian sanctuary. Perfect for bedside tables, meditation corners, or as accent lighting.',
    competitionLevel: 'Medium',
    estimatedMonthlySales: '80-200',
    rating: 4.8,
    orders: '5,600+'
  },
  {
    id: '4',
    name: 'Bamboo Wicker Lantern Pendant Light',
    aliexpressPrice: 6.20,
    shippingCost: 0,
    suggestedEtsyPrice: 32.99,
    category: 'Bohemian Pendant Lights',
    tags: ['bamboo pendant light', 'wicker lantern', 'boho hanging lamp', 'natural bamboo light', 'japanese style lamp', 'zen pendant light', 'beach house decor', 'tropical lamp shade', 'boho kitchen light', 'sustainable lighting', 'bamboo lampshade', 'organic home decor', 'minimalist boho'],
    imageKeywords: 'bamboo wicker lantern pendant light bohemian',
    description: 'Elegant bamboo and wicker lantern-style pendant light that blends bohemian warmth with minimalist design. Sustainable, lightweight, and creates gorgeous ambient lighting. Ideal for kitchens, entryways, and covered patios.',
    competitionLevel: 'Low',
    estimatedMonthlySales: '40-90',
    rating: 4.5,
    orders: '1,800+'
  },
  {
    id: '5',
    name: 'Crystal Bohemian Moon Phase Wall Sconce',
    aliexpressPrice: 9.70,
    shippingCost: 1.20,
    suggestedEtsyPrice: 44.99,
    category: 'Bohemian Wall Lights',
    tags: ['moon phase wall light', 'crystal wall sconce', 'boho wall lamp', 'celestial light decor', 'moon lamp', 'bohemian wall sconce', 'crystal decor light', 'witchy home decor', 'boho bedroom wall light', 'mystical lamp', 'moon phase decor', 'spiritual home decor', 'crystal healing light'],
    imageKeywords: 'crystal moon phase wall sconce bohemian',
    description: 'Enchanting moon phase wall sconce adorned with natural crystals. Battery-operated LED creates a magical warm glow. A stunning focal point for bedrooms, meditation spaces, or any room that needs a touch of celestial bohemian magic.',
    competitionLevel: 'Low',
    estimatedMonthlySales: '60-150',
    rating: 4.9,
    orders: '3,200+'
  },
  {
    id: '6',
    name: 'Seagrass Woven Globe Pendant Light',
    aliexpressPrice: 7.40,
    shippingCost: 0,
    suggestedEtsyPrice: 36.99,
    category: 'Bohemian Pendant Lights',
    tags: ['seagrass pendant light', 'woven globe lamp', 'coastal boho light', 'natural fiber pendant', 'beach house lamp', 'round woven shade', 'boho dining light', 'seagrass lampshade', 'organic pendant light', 'handwoven globe lamp', 'bohemian chandelier', 'natural home lighting', 'boho chic light'],
    imageKeywords: 'seagrass globe pendant light bohemian coastal',
    description: 'Hand-woven seagrass globe pendant light that brings natural coastal bohemian style to any room. The organic, airy design filters light beautifully creating a warm, inviting atmosphere. Perfect statement piece for dining rooms and living spaces.',
    competitionLevel: 'Medium',
    estimatedMonthlySales: '35-85',
    rating: 4.6,
    orders: '1,500+'
  },
  {
    id: '7',
    name: 'Boho Tassel Fairy String Lights',
    aliexpressPrice: 3.20,
    shippingCost: 0,
    suggestedEtsyPrice: 18.99,
    category: 'Bohemian String Lights',
    tags: ['boho fairy lights', 'tassel string lights', 'bohemian bedroom lights', 'boho dorm decor', 'cotton tassel lights', 'festival string lights', 'boho party decor', 'warm fairy lights', 'macrame string lights', 'hippie room decor', 'boho wall decor', 'cozy bedroom lights', 'boho gift idea'],
    imageKeywords: 'boho tassel fairy string lights warm',
    description: 'Charming bohemian tassel fairy string lights with warm LED glow. Features handmade cotton tassels on copper wire lights. Battery or USB powered. Perfect for bedrooms, dorm rooms, patios, weddings, and creating cozy boho vibes anywhere.',
    competitionLevel: 'High',
    estimatedMonthlySales: '100-300',
    rating: 4.4,
    orders: '8,900+'
  },
  {
    id: '8',
    name: 'Himalayan Salt Lamp USB Night Light',
    aliexpressPrice: 4.50,
    shippingCost: 1.00,
    suggestedEtsyPrice: 24.99,
    category: 'Bohemian Night Lights',
    tags: ['himalayan salt lamp', 'usb salt light', 'boho night light', 'natural salt lamp', 'wellness lamp', 'meditation light', 'bohemian desk lamp', 'crystal salt light', 'calming night light', 'holistic home decor', 'yoga room lamp', 'pink salt lamp', 'natural healing light'],
    imageKeywords: 'himalayan salt lamp USB bohemian natural',
    description: 'Mini Himalayan salt lamp with USB power for desk or bedside use. Emits a warm, soothing pink-orange glow believed to purify air and promote relaxation. A beautiful bohemian accent that doubles as a wellness accessory.',
    competitionLevel: 'High',
    estimatedMonthlySales: '150-400',
    rating: 4.3,
    orders: '12,000+'
  },
  {
    id: '9',
    name: 'Crescent Moon Rattan Wall Light',
    aliexpressPrice: 11.30,
    shippingCost: 0,
    suggestedEtsyPrice: 47.99,
    category: 'Bohemian Wall Lights',
    tags: ['crescent moon light', 'rattan wall lamp', 'boho moon decor', 'nursery wall light', 'celestial wall sconce', 'moon shaped lamp', 'boho kids room', 'rattan moon light', 'whimsical wall lamp', 'boho nursery light', 'moon night light', 'natural rattan decor', 'handwoven moon lamp'],
    imageKeywords: 'crescent moon rattan wall light bohemian nursery',
    description: 'Beautifully handwoven crescent moon rattan wall light that adds whimsical bohemian charm. Features warm LED lighting with a natural rattan frame. Perfect for nurseries, children\'s rooms, bedrooms, or any space needing a magical touch.',
    competitionLevel: 'Low',
    estimatedMonthlySales: '25-70',
    rating: 4.8,
    orders: '900+'
  },
  {
    id: '10',
    name: 'Mushroom Glass Table Lamp Bohemian',
    aliexpressPrice: 10.80,
    shippingCost: 2.00,
    suggestedEtsyPrice: 49.99,
    category: 'Bohemian Table Lamps',
    tags: ['mushroom table lamp', 'glass desk lamp', 'boho mushroom light', 'retro table lamp', 'bohemian accent light', 'cottagecore lamp', 'vintage style lamp', 'mushroom night light', 'whimsical table lamp', 'boho retro decor', 'colored glass lamp', 'aesthetic room lamp', 'funky boho light'],
    imageKeywords: 'mushroom glass table lamp bohemian retro',
    description: 'Trendy mushroom-shaped glass table lamp with a vintage bohemian aesthetic. Features a frosted or colored glass shade on a ceramic base with touch-dimming. Currently viral on social media - a must-have for boho and cottagecore enthusiasts.',
    competitionLevel: 'Low',
    estimatedMonthlySales: '70-180',
    rating: 4.7,
    orders: '4,100+'
  },
  {
    id: '11',
    name: 'Wooden Beaded Chandelier Pendant',
    aliexpressPrice: 14.50,
    shippingCost: 0,
    suggestedEtsyPrice: 59.99,
    category: 'Bohemian Pendant Lights',
    tags: ['wooden bead chandelier', 'boho pendant light', 'beaded ceiling lamp', 'farmhouse chandelier', 'bohemian hanging light', 'wood bead lampshade', 'coastal chandelier', 'natural wood pendant', 'boho dining chandelier', 'rustic pendant light', 'beaded light fixture', 'boho farmhouse decor', 'statement chandelier'],
    imageKeywords: 'wooden beaded chandelier pendant bohemian farmhouse',
    description: 'Stunning wooden beaded chandelier pendant that makes a bold bohemian statement. Natural wood beads are strung in cascading tiers creating gorgeous light filtering. A showstopper for dining rooms, living rooms, and entryways.',
    competitionLevel: 'Medium',
    estimatedMonthlySales: '40-100',
    rating: 4.6,
    orders: '2,100+'
  },
  {
    id: '12',
    name: 'Dreamcatcher LED Wall Light',
    aliexpressPrice: 6.90,
    shippingCost: 0,
    suggestedEtsyPrice: 34.99,
    category: 'Bohemian Wall Lights',
    tags: ['dreamcatcher light', 'LED wall decor', 'boho wall light', 'dreamcatcher lamp', 'bohemian LED decor', 'fairy light dreamcatcher', 'boho bedroom decor', 'dreamcatcher night light', 'hippie wall light', 'spiritual decor light', 'boho teen room', 'festival decor', 'handmade dreamcatcher'],
    imageKeywords: 'dreamcatcher LED wall light bohemian',
    description: 'Handcrafted dreamcatcher with integrated warm LED fairy lights. Combines traditional dreamcatcher artistry with modern ambient lighting. Features feathers, beads, and warm copper string lights. A beautiful bohemian accent for bedrooms and living spaces.',
    competitionLevel: 'Low',
    estimatedMonthlySales: '45-110',
    rating: 4.5,
    orders: '1,700+'
  },
];

function calculateProfit(product: Product, sellingPrice: number) {
  const cost = product.aliexpressPrice + product.shippingCost;
  const etsyTransactionFee = sellingPrice * ETSY_TRANSACTION_FEE_RATE;
  const etsyPaymentFee = sellingPrice * ETSY_PAYMENT_PROCESSING_RATE + ETSY_PAYMENT_PROCESSING_FIXED;
  const totalFees = ETSY_LISTING_FEE + etsyTransactionFee + etsyPaymentFee;
  const profit = sellingPrice - cost - totalFees;
  const margin = (profit / sellingPrice) * 100;
  return { cost, totalFees, profit, margin, etsyTransactionFee, etsyPaymentFee };
}

function generateEtsyListing(product: Product) {
  const title = product.name + ' | Bohemian Home Decor | Boho Lighting | Handmade Style';
  const truncatedTitle = title.length > 140 ? title.substring(0, 137) + '...' : title;

  const description = `${product.description}

DETAILS:
- Style: Bohemian / Boho Chic
- Category: ${product.category}
- Perfect for: Living rooms, bedrooms, nurseries, patios, meditation spaces

SHIPPING:
- Ships within 3-7 business days
- Tracking number provided
- Carefully packaged for safe delivery

NOTE: Due to the handmade nature of this item, slight variations in color and pattern may occur, making each piece unique.

Shop more bohemian lighting and decor in our store!`;

  return { title: truncatedTitle, description, tags: product.tags.slice(0, 13) };
}

const CompetitionBadge: React.FC<{ level: string }> = ({ level }) => {
  const colors: Record<string, string> = {
    Low: 'bg-green-500/20 text-green-400 border-green-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    High: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${colors[level] || ''}`}>
      {level} Competition
    </span>
  );
};

interface DropshipScraperProps {
  onBack: () => void;
}

const DropshipScraper: React.FC<DropshipScraperProps> = ({ onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [filterCompetition, setFilterCompetition] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('profit');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showListingModal, setShowListingModal] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(BOHEMIAN_LIGHT_PRODUCTS.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    let products = [...BOHEMIAN_LIGHT_PRODUCTS];

    if (filterCompetition !== 'all') {
      products = products.filter(p => p.competitionLevel === filterCompetition);
    }
    if (filterCategory !== 'all') {
      products = products.filter(p => p.category === filterCategory);
    }

    products.sort((a, b) => {
      switch (sortBy) {
        case 'profit': {
          const profitA = calculateProfit(a, a.suggestedEtsyPrice).profit;
          const profitB = calculateProfit(b, b.suggestedEtsyPrice).profit;
          return profitB - profitA;
        }
        case 'margin': {
          const marginA = calculateProfit(a, a.suggestedEtsyPrice).margin;
          const marginB = calculateProfit(b, b.suggestedEtsyPrice).margin;
          return marginB - marginA;
        }
        case 'price_low':
          return a.aliexpressPrice - b.aliexpressPrice;
        case 'competition':
          const order: Record<string, number> = { Low: 0, Medium: 1, High: 2 };
          return order[a.competitionLevel] - order[b.competitionLevel];
        default:
          return 0;
      }
    });

    return products;
  }, [filterCompetition, filterCategory, sortBy]);

  const handleCopyListing = (product: Product) => {
    const listing = generateEtsyListing(product);
    const text = `TITLE:\n${listing.title}\n\nDESCRIPTION:\n${listing.description}\n\nTAGS:\n${listing.tags.join(', ')}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(product.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const selectedProfit = selectedProduct
    ? calculateProfit(selectedProduct, customPrice || selectedProduct.suggestedEtsyPrice)
    : null;

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={onBack}
            className="text-gray-400 hover:text-white mb-4 flex items-center gap-2 text-sm font-semibold transition-colors"
          >
            &larr; Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Bohemian Light <span className="text-purple-400">Dropship Dashboard</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Curated bohemian lighting products with profit analysis, competition data, and ready-to-use Etsy listing drafts.
            Update product data with your own AliExpress finds.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-black text-white">{BOHEMIAN_LIGHT_PRODUCTS.length}</div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Products</div>
          </div>
          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-black text-green-400">
              {BOHEMIAN_LIGHT_PRODUCTS.filter(p => p.competitionLevel === 'Low').length}
            </div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Low Competition</div>
          </div>
          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-black text-purple-400">
              ${Math.max(...BOHEMIAN_LIGHT_PRODUCTS.map(p => calculateProfit(p, p.suggestedEtsyPrice).profit)).toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Top Profit/Unit</div>
          </div>
          <div className="bg-gray-800/60 border border-white/10 rounded-xl p-4">
            <div className="text-2xl font-black text-blue-400">
              {Math.max(...BOHEMIAN_LIGHT_PRODUCTS.map(p => calculateProfit(p, p.suggestedEtsyPrice).margin)).toFixed(0)}%
            </div>
            <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Best Margin</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filterCompetition}
            onChange={(e) => setFilterCompetition(e.target.value)}
            className="bg-gray-800 border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Competition</option>
            <option value="Low">Low Competition</option>
            <option value="Medium">Medium Competition</option>
            <option value="High">High Competition</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-gray-800 border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 border border-white/10 text-white text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
          >
            <option value="profit">Sort: Highest Profit</option>
            <option value="margin">Sort: Highest Margin</option>
            <option value="price_low">Sort: Lowest Cost</option>
            <option value="competition">Sort: Lowest Competition</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10">
          {filteredProducts.map(product => {
            const profit = calculateProfit(product, product.suggestedEtsyPrice);
            return (
              <div
                key={product.id}
                className={`bg-gray-800/60 border rounded-xl p-5 cursor-pointer transition-all hover:bg-gray-800/80 ${
                  selectedProduct?.id === product.id ? 'border-purple-500 ring-1 ring-purple-500/50' : 'border-white/10 hover:border-white/20'
                }`}
                onClick={() => {
                  setSelectedProduct(product);
                  setCustomPrice(product.suggestedEtsyPrice);
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg leading-tight">{product.name}</h3>
                    <p className="text-gray-500 text-xs mt-1">{product.category}</p>
                  </div>
                  <CompetitionBadge level={product.competitionLevel} />
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">AliExpress</div>
                    <div className="text-white font-bold">${product.aliexpressPrice.toFixed(2)}</div>
                    {product.shippingCost > 0 && (
                      <div className="text-xs text-gray-500">+${product.shippingCost.toFixed(2)} ship</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">Etsy Price</div>
                    <div className="text-purple-400 font-bold">${product.suggestedEtsyPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">Profit</div>
                    <div className="text-green-400 font-bold">${profit.profit.toFixed(2)}</div>
                    <div className="text-xs text-green-400/70">{profit.margin.toFixed(0)}% margin</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Est. sales: {product.estimatedMonthlySales}/mo</span>
                  <span>AliExpress orders: {product.orders}</span>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyListing(product);
                    }}
                    className={`flex-1 text-xs font-bold py-2 px-3 rounded-lg transition-all ${
                      copiedId === product.id
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30'
                    }`}
                  >
                    {copiedId === product.id ? 'Copied to Clipboard!' : 'Copy Etsy Listing'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setCustomPrice(product.suggestedEtsyPrice);
                      setShowListingModal(true);
                    }}
                    className="text-xs font-bold py-2 px-3 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all"
                  >
                    View Listing
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Profit Calculator Panel */}
        {selectedProduct && selectedProfit && (
          <div className="bg-gray-800/60 border border-purple-500/30 rounded-xl p-6 mb-10">
            <h2 className="text-2xl font-black text-white mb-4">
              Profit Calculator: <span className="text-purple-400">{selectedProduct.name}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">
                  Your Etsy Selling Price ($)
                </label>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(parseFloat(e.target.value) || 0)}
                  step="0.01"
                  min="0"
                  className="w-full bg-gray-900 border border-white/10 text-white rounded-lg px-4 py-3 text-lg font-bold focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Product Cost:</span>
                  <span className="text-white font-semibold">${selectedProduct.aliexpressPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping Cost:</span>
                  <span className="text-white font-semibold">${selectedProduct.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Etsy Listing Fee:</span>
                  <span className="text-white font-semibold">${ETSY_LISTING_FEE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Etsy Transaction Fee (6.5%):</span>
                  <span className="text-white font-semibold">${selectedProfit.etsyTransactionFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Payment Processing (3% + $0.25):</span>
                  <span className="text-white font-semibold">${selectedProfit.etsyPaymentFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-white/10 my-2"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Fees:</span>
                  <span className="text-red-400 font-bold">-${selectedProfit.totalFees.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-black">
                  <span className="text-white">NET PROFIT:</span>
                  <span className={selectedProfit.profit > 0 ? 'text-green-400' : 'text-red-400'}>
                    ${selectedProfit.profit.toFixed(2)} ({selectedProfit.margin.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listing Modal */}
        {showListingModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowListingModal(false)}>
            <div className="bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-black text-white">Etsy Listing Preview</h2>
                <button onClick={() => setShowListingModal(false)} className="text-gray-500 hover:text-white text-2xl leading-none">&times;</button>
              </div>

              {(() => {
                const listing = generateEtsyListing(selectedProduct);
                return (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Title ({listing.title.length}/140 chars)</label>
                      <div className="mt-1 bg-gray-800 border border-white/10 rounded-lg p-3 text-white text-sm">
                        {listing.title}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Description</label>
                      <div className="mt-1 bg-gray-800 border border-white/10 rounded-lg p-3 text-white text-sm whitespace-pre-line">
                        {listing.description}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Tags ({listing.tags.length}/13)</label>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {listing.tags.map((tag, i) => (
                          <span key={i} className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Search Keywords for Product Images</label>
                      <div className="mt-1 bg-gray-800 border border-white/10 rounded-lg p-3 text-white text-sm">
                        {selectedProduct.imageKeywords}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyListing(selectedProduct)}
                      className={`w-full py-3 rounded-lg font-bold transition-all ${
                        copiedId === selectedProduct.id
                          ? 'bg-green-600 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {copiedId === selectedProduct.id ? 'Copied to Clipboard!' : 'Copy Full Listing to Clipboard'}
                    </button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-gray-800/40 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-black text-white mb-4">Dropshipping Tips for Etsy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-3">
              <div>
                <span className="text-purple-400 font-bold">1. Use your own photos</span>
                <p className="text-gray-400 mt-1">Order samples and take styled photos. AliExpress images will get your listing flagged.</p>
              </div>
              <div>
                <span className="text-purple-400 font-bold">2. Set realistic shipping times</span>
                <p className="text-gray-400 mt-1">Be transparent: 2-4 weeks. Use ePacket or AliExpress Standard Shipping.</p>
              </div>
              <div>
                <span className="text-purple-400 font-bold">3. Focus on low competition items</span>
                <p className="text-gray-400 mt-1">Moon lights, dreamcatcher lamps, and mushroom lamps have less saturation than string lights.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-purple-400 font-bold">4. Use Etsy SEO tools</span>
                <p className="text-gray-400 mt-1">Check eRank or Marmalead for real search volume data before listing.</p>
              </div>
              <div>
                <span className="text-purple-400 font-bold">5. Bundle for higher AOV</span>
                <p className="text-gray-400 mt-1">Offer sets (e.g., "Boho Light + Macrame Cover") for better margins.</p>
              </div>
              <div>
                <span className="text-purple-400 font-bold">6. Comply with Etsy policies</span>
                <p className="text-gray-400 mt-1">Etsy requires disclosure of production partners. Mark items as made-to-order with a production partner.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropshipScraper;
