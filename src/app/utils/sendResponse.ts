import { Response } from "express";
type TResponse<T> = {
  token?:string;
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  if(data.token){
    res.status(data.statusCode).json({
      success: data.success,
      statusCode:data.statusCode,
      message: data.message,
      token:data.token,
      data: data.data,
    });
  }else{
    res.status(data.statusCode).json({
      success: data.success,
      statusCode:data.statusCode,
      message: data.message,
      data: data.data,
    });

  }
};

export default sendResponse;