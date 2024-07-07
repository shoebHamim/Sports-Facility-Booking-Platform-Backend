import  Jwt  from 'jsonwebtoken';
import httpStatus from "http-status"
import { AppError } from "../../error/AppError"
import { TUser } from "../user/user.interface"
import User from "../user/user.model"
import { TLogin } from "./auth.interface"
import config from '../../config';


const signUpUserIntoDB=async(userData:TUser)=>{
  const result=await User.create(userData)
  const {password,...withoutPassword}=result.toObject()
  return withoutPassword
}
const loginUserFromDB=async(loginData:TLogin)=>{
  const {email,password:givenPassword}=loginData
  const user=await User.findOne({email})
  if(!user){
    return user
  }
  const hasPasswordMatched=await User.hasPasswordMatched(givenPassword,user?.password as string)
  if (!hasPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, "Wrong password");
  }
    // create token and send to the client
    const jwtPayload = {
      userId: user._id,
      role: user.role,
    };
    const accessToken = Jwt.sign(jwtPayload, config.jwt_access_secret as string, {
      expiresIn: "7d",
    }); 
  const {password,...withoutPassword}=user.toObject()
  return {withoutPassword,accessToken}
}

export const authServices={
  signUpUserIntoDB,
  loginUserFromDB
}
