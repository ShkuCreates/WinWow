import express from 'express';

const router = express.Router();

// Mock products
const products = [
  {
    id: '1',
    name: 'WinWow S8 Balzer Series - Male',
    brand: 'WinWow',
    price: 35,
    discountPercentage: 15,
    thumbnail: 'https://i.ibb.co/XWd3Y7L2/2.jpg',
    images: [
      'https://i.ibb.co/XWd3Y7L2/2.jpg',
      'https://i.ibb.co/xgQjZ4Z9/1.jpg',
      'https://i.ibb.co/1d7mY6C9/4.jpg',
      'https://i.ibb.co/t4vQxZJf/3.jpg',
    ],
    stock: 12,
  },
  {
    id: '2',
    name: 'Submariner Date',
    brand: 'Rolex',
    price: 12500,
    discountPercentage: 0,
    thumbnail: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&q=80'],
    stock: 3,
  },
  {
    id: '3',
    name: 'Nautilus Blue',
    brand: 'Patek Philippe',
    price: 85000,
    discountPercentage: 5,
    thumbnail: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80'],
    stock: 2,
  },
  {
    id: '4',
    name: 'Speedmaster Professional',
    brand: 'Omega',
    price: 6500,
    discountPercentage: 15,
    thumbnail: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80'],
    stock: 8,
  },
];

// Get all products
router.get('/', (req, res) => {
  res.json(products);
});

// Get single product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

export default router;
