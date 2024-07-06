import { Model } from "mongoose";

export type TUser={
  name:string;
  email:string;
  password:string;
  phone:string;
  role:"admin"|"user";
  address:string;
}

export interface UserModel extends Model<TUser>{
  hasPasswordMatched(plainPassword:string,hashedPassword:string):Promise<boolean>
}