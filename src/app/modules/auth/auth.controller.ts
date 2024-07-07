import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const signUpUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const data = await authServices.signUpUserIntoDB(userData);

  sendResponse(res, {
    data: data,
    message: "User registered successfully",
    statusCode: 200,
    success: true,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const data = await authServices.loginUserFromDB(userData);
  if(!data){
    sendResponse(res,{
      success:false,
      message:"No user Found",
      statusCode:404,
      data:[]
    })
  }else{
    sendResponse(res, {
      data: data.withoutPassword,
      token:data.accessToken,
      message: "User logged in successfully",
      statusCode: 200,
      success: true,
    });
  }
});

export const authControllers = {
  signUpUser,
  loginUser
};
