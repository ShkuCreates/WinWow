import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  description: string;
  price: number;
  discountPercentage: number;
  images: string[];
  thumbnail: string;
  videoUrl?: string;
  stock: number;
  specifications: Record<string, string>;
  createdAt: Date;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  images: { type: [String], required: true },
  thumbnail: { type: String, required: true },
  videoUrl: { type: String },
  stock: { type: Number, required: true, default: 0 },
  specifications: { type: Map, of: String, default: {} },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
