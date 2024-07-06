import { ErrorRequestHandler } from "express";
import config from "../config";
import { TErrorMessages, TGenericErrorResponse } from "../interfaces/error.interface";
import { ZodError } from "zod";
import handleZodError from "../error/handleZodError";


export const globalErrorHandler:ErrorRequestHandler=(
  err,req,res,next
)=>{
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";
  let errorMessages: TErrorMessages = [
    {
      path: [""],
      message,
    },
  ];
 
  if (err instanceof ZodError) {
    const zodError = handleZodError(err);
    statusCode = zodError.statusCode;
    message = zodError.message;
    errorMessages = zodError.errorMessages;
  }
  const finalError: TGenericErrorResponse = {
    success: false,
    message,
    errorMessages,
    stack: config.environment === "development" ? err?.stack : null,
  };
  return res.status(statusCode).json(finalError);

}