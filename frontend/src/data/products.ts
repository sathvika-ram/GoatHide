export interface StoreProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  images: string[];
  details: Record<string, string>;
  sku: string;
  stock: number;
  featured?: boolean;
}

export const STORE_PRODUCTS: StoreProduct[] = [
  { id: '1', name: 'The Aurelia Satchel', slug: 'the-aurelia-satchel', category: 'luxury-womens-handbags', description: 'Full-grain goat leather satchel with signature gold hardware.', price: 850, compareAtPrice: 950, rating: 4.8, images: ['/aurelia.jpg'], sku: 'GH-HB-AURELIA-01', stock: 15, details: { Material: 'French Goat Leather', Size: '28cm x 20cm', Origin: 'Italy' }, featured: true },
  { id: '2', name: 'The Celestia Tote', slug: 'the-celestia-tote', category: 'luxury-womens-handbags', description: 'A structured everyday tote in vegetable-tanned goat leather.', price: 680, rating: 4.5, images: ['/tote.jpg'], sku: 'GH-HB-CELESTIA-02', stock: 20, details: { Material: 'Premium Goat Hide', Size: '38cm x 30cm', Origin: 'Austria' } },
  { id: '3', name: 'The Sovereign Briefcase', slug: 'the-sovereign-briefcase', category: 'luxury-laptop-bags', description: 'A dedicated 16-inch laptop briefcase with a refined organiser interior.', price: 950, compareAtPrice: 1100, rating: 4.9, images: ['/briefcase.jpg'], sku: 'GH-LB-SOVEREIGN-01', stock: 8, details: { Material: 'Saffiano Leather', Size: '40cm x 29cm', Origin: 'Germany' }, featured: true },
  { id: '4', name: 'The Vanguard Bifold', slug: 'the-vanguard-bifold', category: 'leather-wallets', description: 'A slim RFID-protected bifold with a full cash divider.', price: 180, rating: 4.7, images: ['/bifold.jpg'], sku: 'GH-WA-VANGUARD-01', stock: 50, details: { Material: 'Pebbled Leather', Size: '11cm x 9cm', Origin: 'France' }, featured: true },
  { id: '5', name: 'The Heritage Classic Belt', slug: 'the-heritage-classic-belt', category: 'leather-belts', description: 'A full-grain formal belt finished with a solid brass buckle.', price: 120, rating: 4.4, images: ['/heritagebelt.jpg'], sku: 'GH-BT-HERITAGE-01', stock: 40, details: { Material: 'Saddle Leather', Width: '35mm', Origin: 'Spain' } },
  { id: '6', name: 'The Icon Cafe Racer Jacket', slug: 'the-icon-cafe-racer', category: 'leather-jackets', description: 'A tailored cafe racer in drum-dyed goat leather.', price: 1200, compareAtPrice: 1450, rating: 4.9, images: ['/jacket.jpg'], sku: 'GH-JK-ICERACER-01', stock: 5, details: { Material: '1.2mm Drum-Dyed Leather', Fit: 'Slim Fit', Origin: 'Italy' }, featured: true },
  { id: '7', name: 'The Odyssey Weekender', slug: 'the-odyssey-weekender', category: 'duffel-bags', description: 'A 45-litre carry-on duffel for refined weekend travel.', price: 1100, rating: 4.8, images: ['/duffel.jpg'], sku: 'GH-DF-ODYSSEY-01', stock: 12, details: { Material: 'Canvas & Leather', Capacity: '45 Litres', Origin: 'United Kingdom' }, featured: true },
  { id: '8', name: 'The Voyager Passport Sleeve', slug: 'the-voyager-passport-sleeve', category: 'passport-covers', description: 'A compact passport sleeve with boarding-pass and card slots.', price: 110, rating: 4.6, images: ['/passport.jpg'], sku: 'GH-PP-VOYAGER-01', stock: 60, details: { Material: 'Nappa Goat Leather', Size: '14cm x 10cm', Origin: 'India' } },
  { id: '9', name: 'The Apex Card Case', slug: 'the-apex-card-case', category: 'card-holders', description: 'A minimal four-slot card case for the front pocket.', price: 95, rating: 4.6, images: ['/Wallet.jpg'], sku: 'GH-CH-APEX-01', stock: 100, details: { Material: 'Glazed Goat Hide', Capacity: '4 cards', Origin: 'India' } },
  { id: '10', name: 'The Sterling Oxford', slug: 'the-sterling-oxford', category: 'formal-shoes', description: 'Hand-coloured cap-toe Oxford shoes with Blake-stitched soles.', price: 450, compareAtPrice: 520, rating: 4.8, images: ['/shoe.jpg'], sku: 'GH-SH-STERLING-01', stock: 15, details: { Material: 'Hand-Patinated Leather', Construction: 'Blake Stitch', Origin: 'Italy' }, featured: true },
  { id: '11', name: 'The Nomad Penny Loafer', slug: 'the-nomad-penny-loafer', category: 'loafers', description: 'A soft suede penny loafer with a cushioned everyday insole.', price: 380, rating: 4.7, images: ['/penny.jpg'], sku: 'GH-SH-NOMAD-02', stock: 20, details: { Material: 'Italian Suede', Sole: 'Rubber Driver', Origin: 'Italy' } },
  { id: '12', name: 'The Atelier Key Fob', slug: 'the-atelier-key-fob', category: 'accessories', description: 'A hand-finished leather key fob with a solid brass ring.', price: 55, rating: 4.5, images: ['/keyfab.jpg'], sku: 'GH-AC-ATELIER-01', stock: 80, details: { Material: 'Full-Grain Leather', Hardware: 'Solid Brass', Origin: 'India' } },
];

export const getStoreProduct = (slug: string) => STORE_PRODUCTS.find((product) => product.slug === slug);
