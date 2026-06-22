import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const ALLOWED_ORIGINS = [FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'];

// Middleware
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  res.json({ message: 'WinWow API is running!' });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
