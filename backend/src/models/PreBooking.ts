import mongoose, { Document, Schema } from 'mongoose';

export interface IPreBooking extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  depositAmount: number;
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderDate: Date;
  estimatedDelivery: Date;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered';
}

const PreBookingSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  depositAmount: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  orderDate: { type: Date, default: Date.now },
  estimatedDelivery: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['processing', 'confirmed', 'shipped', 'delivered'], 
    default: 'processing' 
  },
});

export default mongoose.model<IPreBooking>('PreBooking', PreBookingSchema);
