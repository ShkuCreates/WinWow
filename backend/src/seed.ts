import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product';

dotenv.config();

const mockProducts = [
  {
    name: 'Royal Oak Perpetual',
    brand: 'Audemars Piguet',
    description: 'The Royal Oak Perpetual Calendar is a masterpiece of horology, featuring an octagonal bezel with exposed screws and a stunning perpetual calendar complication.',
    price: 45000,
    discountPercentage: 10,
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1200&q=80',
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80',
    stock: 5,
    specifications: {
      'Case Material': 'Stainless Steel',
      'Case Diameter': '41mm',
      'Movement': 'Automatic',
      'Water Resistance': '50m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Leather',
    },
  },
  {
    name: 'Submariner Date',
    brand: 'Rolex',
    description: 'The Rolex Submariner is the reference among divers\' watches. Recognizable by its unidirectional rotating bezel and luminous display.',
    price: 12500,
    discountPercentage: 0,
    images: [
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=1200&q=80',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80',
    stock: 3,
    specifications: {
      'Case Material': 'Oystersteel',
      'Case Diameter': '41mm',
      'Movement': 'Perpetual, Mechanical',
      'Water Resistance': '300m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Oyster Bracelet',
    },
  },
  {
    name: 'Nautilus Blue',
    brand: 'Patek Philippe',
    description: 'The Patek Philippe Nautilus is an iconic sports watch with a distinctive porthole-shaped case and elegant blue dial.',
    price: 85000,
    discountPercentage: 5,
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    stock: 2,
    specifications: {
      'Case Material': 'Stainless Steel',
      'Case Diameter': '40mm',
      'Movement': 'Automatic',
      'Water Resistance': '120m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Integrated Bracelet',
    },
  },
  {
    name: 'Speedmaster Professional',
    brand: 'Omega',
    description: 'The Omega Speedmaster Professional, also known as the "Moonwatch," is a legendary chronograph that accompanied NASA astronauts to the moon.',
    price: 6500,
    discountPercentage: 15,
    images: [
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80',
    stock: 8,
    specifications: {
      'Case Material': 'Stainless Steel',
      'Case Diameter': '42mm',
      'Movement': 'Manual Wind',
      'Water Resistance': '50m',
      'Glass': 'Hesalite Crystal',
      'Strap': 'Leather',
    },
  },
  {
    name: 'Portugieser Chronograph',
    brand: 'IWC',
    description: 'The IWC Portugieser Chronograph combines classic design with modern watchmaking, featuring a clean dial and elegant case.',
    price: 11000,
    discountPercentage: 0,
    images: [
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600&q=80',
    stock: 4,
    specifications: {
      'Case Material': 'Stainless Steel',
      'Case Diameter': '41mm',
      'Movement': 'Automatic',
      'Water Resistance': '30m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Leather',
    },
  },
  {
    name: 'Datejust 41',
    brand: 'Rolex',
    description: 'The Rolex Datejust is a timeless classic, featuring the iconic Cyclops lens over the date and a smooth, reliable movement.',
    price: 9500,
    discountPercentage: 8,
    images: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80',
    stock: 6,
    specifications: {
      'Case Material': 'Oystersteel',
      'Case Diameter': '41mm',
      'Movement': 'Perpetual, Mechanical',
      'Water Resistance': '100m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Jubilee Bracelet',
    },
  },
  {
    name: 'Carrera Calibre 5',
    brand: 'TAG Heuer',
    description: 'The TAG Heuer Carrera Calibre 5 is a sophisticated and sporty watch, perfect for both casual and formal occasions.',
    price: 3500,
    discountPercentage: 20,
    images: [
      'https://images.unsplash.com/photo-1548169875-43bf019c0a0a?w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1548169875-43bf019c0a0a?w=600&q=80',
    stock: 10,
    specifications: {
      'Case Material': 'Stainless Steel',
      'Case Diameter': '41mm',
      'Movement': 'Automatic',
      'Water Resistance': '100m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Leather',
    },
  },
  {
    name: 'Navitimer B01',
    brand: 'Breitling',
    description: 'The Breitling Navitimer B01 is a pilot\'s watch with a distinctive circular slide rule bezel and chronograph functions.',
    price: 8000,
    discountPercentage: 0,
    images: [
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=1200&q=80',
    ],
    thumbnail: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600&q=80',
    stock: 3,
    specifications: {
      'Case Material': 'Stainless Steel',
      'Case Diameter': '43mm',
      'Movement': 'Automatic',
      'Water Resistance': '30m',
      'Glass': 'Sapphire Crystal',
      'Strap': 'Leather',
    },
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/winwow');
    console.log('Connected to MongoDB for seeding');

    // Clear existing data
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert mock products
    await Product.insertMany(mockProducts);
    console.log('Mock products inserted successfully!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
