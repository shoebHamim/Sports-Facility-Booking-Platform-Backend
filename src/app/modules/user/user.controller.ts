import { RequestHandler } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { userServices } from "./user.service";


const createUser=catchAsync(async(req,res)=>{
  const userData=req.body;
  const data= await userServices.createUserIntoDB(userData) 
  res.send(data)



})


export const userControllers={
  createUser,

  
}