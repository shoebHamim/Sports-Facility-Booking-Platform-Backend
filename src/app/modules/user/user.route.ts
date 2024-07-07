import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";

const router=Router()



export const userRoute=router;