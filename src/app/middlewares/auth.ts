import httpStatus from "http-status";
import { AppError } from "../error/AppError";
import { catchAsync } from "../utils/catchAsync"
import Jwt  from "jsonwebtoken";
import config from "../config";

export const auth=(whoHasAccess:string[])=>{
  return catchAsync(async(req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    let authenticatedUser: any;
    Jwt.verify(token as string,config.jwt_access_secret as string,(err,decoded)=>{
      if(err){
        throw new AppError(httpStatus.UNAUTHORIZED,"You are not authorized");
      }else{
        (req as any).authenticatedUser=decoded;
        authenticatedUser=decoded;
      }
    })
    const {role,userId,iat}=authenticatedUser
    if (!whoHasAccess.includes(role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `${role} is not authorized to access this!`
      );
    }

    next()
  })
}