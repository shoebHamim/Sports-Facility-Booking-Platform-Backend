import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface"; 

const bookingSchema = new Schema<TBooking>({
  facility: { type: Schema.Types.ObjectId, required: true, ref: 'Facility' }, 
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' }, 
  payableAmount: { type: Number, required: true },
  isBooked: { 
    type: String, 
    required: true, 
    enum: ["confirmed", "unconfirmed", "cancelled"] 
  }
});

const Booking = mongoose.model<TBooking>('Booking', bookingSchema);

export default Booking;