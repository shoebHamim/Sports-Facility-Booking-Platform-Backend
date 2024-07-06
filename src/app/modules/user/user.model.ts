import {  TUser, UserModel } from './user.interface';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import config from '../../config';
const userSchema = new mongoose.Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'user'] },
  phone: { type: String, required: true },
  address: { type: String, required: true },
},{
  versionKey:false
});

userSchema.pre('save',async function(next) {
  const user=this;
  if(this.isModified('password')){
    const salt=await bcrypt.genSalt(Number(config.salt_round))
    const hash=await bcrypt.hash(user.password,salt)
    user.password=hash
  }
  next()
})

userSchema.post('save',async function(doc,next){
  doc.password=''
  next()
})

userSchema.statics.hasPasswordMatched=async function (plainPassword:string,hashedPassword:string) {
  return await bcrypt.compare(plainPassword,hashedPassword)
}



const User = mongoose.model<TUser,UserModel>('User', userSchema);
export default User;