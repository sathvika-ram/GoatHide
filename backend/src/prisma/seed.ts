import { PrismaClient, Role, DiscountType } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean old data
  await prisma.recentlyViewed.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.loyaltyTransaction.deleteMany();
  await prisma.giftCard.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('AdminGoat123!', salt);
  const customerPasswordHash = await bcrypt.hash('CustomerGoat123!', salt);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@goathides.com',
      passwordHash: adminPasswordHash,
      name: 'Alexander Sterling',
      role: Role.ADMIN,
      referralCode: 'GH-ADMIN-99',
      loyaltyPoints: 1000,
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: 'customer@goathides.com',
      passwordHash: customerPasswordHash,
      name: 'Sofia Lorenzo',
      role: Role.CUSTOMER,
      referralCode: 'GH-SOFIA-88',
      loyaltyPoints: 150,
    },
  });

  console.log('Created Users:', { admin: admin.email, customer: customer.email });

  // Create Categories
  const categoriesData = [
    { name: "Luxury Women's Handbags", slug: "luxury-womens-handbags", description: "Elegant statement purses crafted from top-grain goat leather." },
    { name: "Luxury Laptop Bags", slug: "luxury-laptop-bags", description: "Professional satchels and briefcases designed for modern utility." },
    { name: "Leather Wallets", slug: "leather-wallets", description: "Classic bifold and trifold wallets with RFID protection." },
    { name: "Leather Belts", slug: "leather-belts", description: "Premium formal and casual belts with solid brass buckles." },
    { name: "Leather Jackets", slug: "leather-jackets", description: "Aesthetic tailored outerwear offering lifetime durability." },
    { name: "Travel Bags", slug: "travel-bags", description: "Luxury luggage and carry-ons for the discerning voyager." },
    { name: "Duffel Bags", slug: "duffel-bags", description: "Spacious weekenders and duffels for refined getaways." },
    { name: "Passport Covers", slug: "passport-covers", description: "Minimalist leather sleeves to protect your travel document." },
    { name: "Card Holders", slug: "card-holders", description: "Ultra-slim front pocket wallets and card cases." },
    { name: "Formal Shoes", slug: "formal-shoes", description: "Handcrafted oxfords and derby shoes with Blake stitching." },
    { name: "Loafers", slug: "loafers", description: "Casual slip-ons and penny loafers combining comfort and luxury." },
    { name: "Accessories", slug: "accessories", description: "Leather keychains, tech organizers, and watch rolls." },
  ];

  const categoriesMap: { [key: string]: string } = {};

  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: `/images/categories/${cat.slug}.jpg`,
      },
    });
    categoriesMap[cat.slug] = created.id;
  }

  console.log('Created Categories');

  // Create Products
  const products = [
    // Women's Handbags
    {
      name: "The Aurelia Satchel",
      slug: "the-aurelia-satchel",
      description: "An architectural masterpiece in full-grain goat leather, featuring a structural silhouette, signature gold-plated hardware, and a suede-lined interior. Designed for day-to-night versatility.",
      price: 850.00,
      compareAtPrice: 950.00,
      slugCategory: "luxury-womens-handbags",
      stock: 15,
      sku: "GH-HB-AURELIA-01",
      images: ["/images/products/aurelia_1.jpg", "/images/products/aurelia_2.jpg"],
      details: {
        material: "100% Full-Grain Goat Leather",
        lining: "Micro-Suede",
        hardware: "24k Gold-Plated Solid Brass",
        dimensions: "28cm x 20cm x 12cm",
        weight: "0.8 kg",
        origin: "Handcrafted in Florence, Italy"
      },
      isFeatured: true
    },
    {
      name: "The Celestia Tote",
      slug: "the-celestia-tote",
      description: "A spacious companion for the modern executive. Crafted with supple, water-resistant goat leather and detailed with double-stitched shoulder straps.",
      price: 680.00,
      slugCategory: "luxury-womens-handbags",
      stock: 25,
      sku: "GH-HB-CELESTIA-02",
      images: ["/images/products/celestia_1.jpg"],
      details: {
        material: "Vegetable-Tanned Premium Goat Leather",
        lining: "Organic Cotton Canvas",
        hardware: "Brushed Gunmetal",
        dimensions: "38cm x 30cm x 15cm",
        weight: "1.1 kg",
        origin: "Handcrafted in Graz, Austria"
      },
      isFeatured: false
    },
    // Laptop Bags
    {
      name: "The Sovereign Briefcase",
      slug: "the-sovereign-briefcase",
      description: "Perfect blend of tradition and modernity. Accommodates up to a 16-inch laptop in a dedicated padded sleeve, with multiple internal organizer pockets.",
      price: 950.00,
      compareAtPrice: 1100.00,
      slugCategory: "luxury-laptop-bags",
      stock: 8,
      sku: "GH-LB-SOVEREIGN-01",
      images: ["/images/products/sovereign_1.jpg", "/images/products/sovereign_2.jpg"],
      details: {
        material: "Saffiano Goat Leather",
        lining: "Waterproof Nylon Lining",
        hardware: "Premium YKK Excella Zippers",
        dimensions: "40cm x 29cm x 8cm",
        weight: "1.3 kg",
        origin: "Handcrafted in Munich, Germany"
      },
      isFeatured: true
    },
    // Wallets
    {
      name: "The Vanguard Bifold",
      slug: "the-vanguard-bifold",
      description: "An ultra-slim bifold wallet with 8 card slots, 2 receipt slots, and a dual currency compartment. Built-in RFID blocking fabric prevents unauthorized scans.",
      price: 180.00,
      slugCategory: "leather-wallets",
      stock: 50,
      sku: "GH-WA-VANGUARD-01",
      images: ["/images/products/vanguard_1.jpg"],
      details: {
        material: "Pebbled French Goat Leather",
        lining: "Silk-blend lining",
        dimensions: "11cm x 9cm x 1.5cm",
        capacity: "8 Card Slots, 2 Cash Slots",
        safety: "RFID Protection Shield"
      },
      isFeatured: true
    },
    // Belts
    {
      name: "The Heritage Classic Belt",
      slug: "the-heritage-classic-belt",
      description: "A robust formal belt constructed using two bonded layers of full-grain goat leather, complete with a hand-burnished solid brass buckle.",
      price: 120.00,
      slugCategory: "leather-belts",
      stock: 40,
      sku: "GH-BT-HERITAGE-01",
      images: ["/images/products/heritage_belt_1.jpg"],
      details: {
        width: "35mm",
        material: "Full-Grain Saddle Leather",
        buckle: "Nickel-Free Solid Brass",
        origin: "Handcrafted in Spain"
      },
      isFeatured: false
    },
    // Jackets
    {
      name: "The Icon Cafe Racer Jacket",
      slug: "the-icon-cafe-racer",
      description: "An enduring style. Features a tailored fit, asymmetrical front closure, and heavy-duty YKK zippers. The goat leather breaks in beautifully over time to form a custom fit.",
      price: 1200.00,
      compareAtPrice: 1450.00,
      slugCategory: "leather-jackets",
      stock: 5,
      sku: "GH-JK-ICERACER-01",
      images: ["/images/products/racer_jacket_1.jpg", "/images/products/racer_jacket_2.jpg"],
      details: {
        material: "1.2mm Drum-Dyed Goat Leather",
        lining: "Quilted Satin",
        hardware: "YKK Antique Silver Zippers",
        fit: "Slim Fit",
        care: "Professional Leather Clean Only"
      },
      isFeatured: true
    },
    // Travel / Duffel Bags
    {
      name: "The Odyssey Weekender",
      slug: "the-odyssey-weekender",
      description: "A premium travel companion offering ample space. Meets global airline carry-on regulations. Built with structured handles and a detachable shoulder strap.",
      price: 1100.00,
      slugCategory: "duffel-bags",
      stock: 12,
      sku: "GH-DF-ODYSSEY-01",
      images: ["/images/products/odyssey_1.jpg", "/images/products/odyssey_2.jpg"],
      details: {
        material: "Water-Resistant Goat Leather",
        lining: "Heavyweight Cotton Twill",
        hardware: "Solid Brass Padlock & Feet",
        dimensions: "50cm x 28cm x 25cm",
        capacity: "45 Liters"
      },
      isFeatured: true
    },
    // Accessories, Passport, Card Holders
    {
      name: "The Apex Card Case",
      slug: "the-apex-card-case",
      description: "Designed for minimalists. Features 4 card slots and a central slip pocket for folded banknotes. Fits imperceptibly in any pocket.",
      price: 95.00,
      slugCategory: "card-holders",
      stock: 100,
      sku: "GH-CH-APEX-01",
      images: ["/images/products/apex_card_1.jpg"],
      details: {
        material: "Full-Grain Glazed Goat Hide",
        dimensions: "10cm x 7cm x 0.3cm",
        capacity: "4 Card Slots, 1 Cash Pocket"
      },
      isFeatured: false
    },
    {
      name: "The Voyager Passport Sleeve",
      slug: "the-voyager-passport-sleeve",
      description: "Protect your passport in style. Features additional slots for boarding passes and two credit cards.",
      price: 110.00,
      slugCategory: "passport-covers",
      stock: 60,
      sku: "GH-PP-VOYAGER-01",
      images: ["/images/products/voyager_pass_1.jpg"],
      details: {
        material: "Smooth Nappa Goat Leather",
        dimensions: "14cm x 10cm",
        pockets: "1 Passport Slot, 2 Card Slots"
      },
      isFeatured: false
    },
    // Shoes
    {
      name: "The Sterling Oxford",
      slug: "the-sterling-oxford",
      description: "Classic cap-toe oxford shoes crafted from hand-colored goat leather. Blake-stitched leather soles offer superb comfort, breathability, and resoling ease.",
      price: 450.00,
      compareAtPrice: 520.00,
      slugCategory: "formal-shoes",
      stock: 15,
      sku: "GH-SH-STERLING-01",
      images: ["/images/products/sterling_oxford_1.jpg"],
      details: {
        material: "Hand-Patinated Goat Leather",
        sole: "Full Leather Blake-Stitched Sole",
        lining: "Calfskin Lining",
        construction: "Blake Stitching"
      },
      isFeatured: true
    },
    {
      name: "The Nomad Penny Loafer",
      slug: "the-nomad-loafer",
      description: "Timeless styling meets everyday utility. Crafted with premium suede leather, featuring a padded ortholite insole for unparalleled walking comfort.",
      price: 380.00,
      slugCategory: "loafers",
      stock: 20,
      sku: "GH-SH-NOMAD-02",
      images: ["/images/products/nomad_loafer_1.jpg"],
      details: {
        material: "Premium Italian Suede Goat Hide",
        sole: "Rubber Studded Driver Sole",
        lining: "Soft Kidskin Lining"
      },
      isFeatured: false
    }
  ];

  for (const prod of products) {
    const categoryId = categoriesMap[prod.slugCategory];
    if (!categoryId) continue;

    const createdProd = await prisma.product.create({
      data: {
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        categoryId: categoryId,
        stock: prod.stock,
        sku: prod.sku,
        images: prod.images,
        details: prod.details,
        isFeatured: prod.isFeatured,
      },
    });

    // Add 2 reviews to each product
    await prisma.review.create({
      data: {
        userId: customer.id,
        productId: createdProd.id,
        rating: 5,
        title: "Absolute perfection",
        comment: `Unrivaled quality. The detail on the ${createdProd.name} is stunning. You can instantly feel the premium nature of the leather.`,
      },
    });

    await prisma.review.create({
      data: {
        userId: admin.id, // Just to have another user
        productId: createdProd.id,
        rating: 4,
        title: "Highly recommended",
        comment: `Excellent craftsmanship. The stitching details are impeccable. Slightly stiff initially but breaks in beautifully.`,
      },
    });

    // Update rating calculations
    await prisma.product.update({
      where: { id: createdProd.id },
      data: {
        rating: 4.5,
        reviewCount: 2
      }
    });
  }

  // Create standard coupons
  await prisma.coupon.createMany({
    data: [
      {
        code: 'WELCOME10',
        discountType: DiscountType.PERCENTAGE,
        discountValue: 10,
        minOrderValue: 100,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
      {
        code: 'LEGACY150',
        discountType: DiscountType.FIXED,
        discountValue: 150,
        minOrderValue: 800,
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      }
    ]
  });

  // Create standard gift cards
  await prisma.giftCard.create({
    data: {
      code: 'GH-GIFT-VAL-500',
      balance: 500,
      initialBalance: 500,
      userId: customer.id,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    }
  });

  console.log('Database Seeding Complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
