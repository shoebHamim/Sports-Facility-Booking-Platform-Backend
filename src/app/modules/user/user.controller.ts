import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";


const createUser=catchAsync(async(req,res)=>{
  const userData=req.body;
  const data= await userServices.createUserIntoDB(userData) 
  sendResponse(res, {
    data: data,
    message: "User created successfully!",
    statusCode: 200,
    success: true,
  });

})


export const userControllers={
  createUser,

  
}