import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { bookingValidationSchemas } from "./booking.validation";
import { AnyZodObject } from "zod";


const router=Router()

router.post('/',validateRequest(bookingValidationSchemas.createBooking as unknown as AnyZodObject),bookingControllers.createBooking)



export const bookingRoute=router