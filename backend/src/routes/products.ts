import express from 'express';

const router = express.Router();

const products = [
  {
    id: '1',
    name: 'WinWow S8 Balzer Series - Male',
    brand: 'WinWow',
    price: 35,
    preBookDepositPercentage: 15,
    thumbnail: 'https://i.ibb.co/Rp2dTv4v/Chat-GPT-Image-Jun-22-2026-01-51-42-AM.png',
    images: [
      'https://i.ibb.co/Rp2dTv4v/Chat-GPT-Image-Jun-22-2026-01-51-42-AM.png',
      'https://i.ibb.co/RGtSPMsz/Chat-GPT-Image-Jun-22-2026-01-51-39-AM.png',
      'https://i.ibb.co/bjpqDgjH/Chat-GPT-Image-Jun-22-2026-01-51-37-AM.png',
      'https://i.ibb.co/67XfMrvX/Chat-GPT-Image-Jun-22-2026-01-51-34-AM.png',
    ],
    stock: 0,
  },
  {
    id: '2',
    name: 'WinWow 114A Premium - Men',
    brand: 'WinWow',
    price: 59,
    preBookDepositPercentage: 24,
    thumbnail: 'https://i.ibb.co/tTSbZVR3/Chat-GPT-Image-Jun-22-2026-03-25-33-AM.png',
    images: [
      'https://i.ibb.co/tTSbZVR3/Chat-GPT-Image-Jun-22-2026-03-25-33-AM.png',
      'https://i.ibb.co/hx3GssYD/Chat-GPT-Image-Jun-22-2026-03-25-31-AM.png',
      'https://i.ibb.co/fzNKpCty/Chat-GPT-Image-Jun-22-2026-03-25-28-AM.png',
      'https://i.ibb.co/wZF0ZtGW/Chat-GPT-Image-Jun-22-2026-03-26-23-AM.png',
    ],
    stock: 0,
  },
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

export default router;
