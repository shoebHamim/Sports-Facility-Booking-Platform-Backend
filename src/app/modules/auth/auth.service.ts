import { AppError } from "../../error/AppError"
import { TUser } from "../user/user.interface"
import User from "../user/user.model"
import { TLogin } from "./auth.interface"


const signUpUserIntoDB=async(userData:TUser)=>{
  const result=await User.create(userData)
  const {password,...withoutPassword}=result.toObject()
  return withoutPassword
}
const loginUserFromDB=async(loginData:TLogin)=>{
  const {email,password}=loginData
  const user=await User.findOne({email})
  if(!user){
    return user
  }
  const hasPasswordMatched=await User.hasPasswordMatched(password,user?.password as string)
  if(hasPasswordMatched){
    const {password,...withoutPassword}=user.toObject()
    return withoutPassword
  }
}

export const authServices={
  signUpUserIntoDB,
  loginUserFromDB
}
