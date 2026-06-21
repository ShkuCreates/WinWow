import express from 'express';
import supabase from '../lib/supabase';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');
    
    if (error) throw error;
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();
    
    if (error) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
