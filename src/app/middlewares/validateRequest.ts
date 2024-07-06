import { Request,Response,NextFunction } from "express";
import { AnyZodObject } from "zod";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const validatedBody = await schema.parseAsync(req.body);
    (req as any).validatedBody = validatedBody;

    next();

})
};