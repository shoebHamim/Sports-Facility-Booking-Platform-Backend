import { calculateAvailableSlots } from './bookings.utils';
import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { bookingValidationSchemas } from "./booking.validation";
import { AnyZodObject } from "zod";


const router=Router()

router.post('/',validateRequest(bookingValidationSchemas.createBooking as unknown as AnyZodObject),bookingControllers.createBooking)
router.get('/',bookingControllers.getAllBookings)
router.get('/user',bookingControllers.getUserBooking)
router.delete('/:id',bookingControllers.cancelBooking)




export const bookingRoute=router