import { TUser } from './user.interface';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
  address: { type: String, required: true },
});

const User = mongoose.model<TUser>('User', userSchema);
export default User;