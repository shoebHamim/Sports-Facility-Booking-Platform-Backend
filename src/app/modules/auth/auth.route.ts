import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidationSchema } from "../user/user.validation";
import { authControllers } from "./auth.controller";

const router=Router()



router.post('/signup',validateRequest(userValidationSchema.createUser),authControllers.signUpUser)
router.post('/login',validateRequest(userValidationSchema.loginUser),authControllers.loginUser)



export  const  authRoute=router;