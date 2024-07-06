import { Router } from "express";
import { userControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidationSchema } from "./user.validation";

const router=Router()

router.post('/create-user',validateRequest(userValidationSchema.createUser),userControllers.createUser)


export const userRoute=router;