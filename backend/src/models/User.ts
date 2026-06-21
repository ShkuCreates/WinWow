import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  googleId?: string;
  email: string;
  name: string;
  password?: string;
  address?: string;
  phone?: string;
  emailNotificationsEnabled: boolean;
  isAdmin: boolean;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  googleId: { type: String },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  address: { type: String },
  phone: { type: String },
  emailNotificationsEnabled: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
