import { calculateAvailableSlots } from './bookings.utils';
import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { bookingValidationSchemas } from "./booking.validation";
import { AnyZodObject } from "zod";
import { auth } from '../../middlewares/auth';


const router=Router()

router.post('/',auth(['user']),validateRequest(bookingValidationSchemas.createBooking as unknown as AnyZodObject),bookingControllers.createBooking)
router.get('/',auth(['admin']),bookingControllers.getAllBookings)
router.get('/user',auth(['user']),bookingControllers.getUserBooking)
router.delete('/:id',auth(["user"]),bookingControllers.cancelBooking)




export const bookingRoute=router