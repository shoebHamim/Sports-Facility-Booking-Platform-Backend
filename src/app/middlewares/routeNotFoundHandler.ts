import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

//regular middleware
export const routeNotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = "Not found!";
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    statusCode:404,
    message,
  
  });
};
