import mongoose from "mongoose";
import { AppError } from "../../error/AppError";
import { Facility } from "../facility/facility.model";
import { TBooking } from "./booking.interface"
import Booking from "./booking.model"
import { calculateAvailableSlots } from "./bookings.utils";

const createBookingIntoDB=async(bookingData:Partial<TBooking>)=>{
  // find the facility
  const facility=await Facility.findById(bookingData.facility)
  if(!facility){
    throw new AppError(404,'Facility not found')
  }
  const pricePerHour=facility.pricePerHour;
  const totalBookingTimeInMS=new Date(`1970-01-01T${bookingData.endTime}:00`).getTime() -new Date(`1970-01-01T${bookingData.startTime}:00`).getTime()
  // as the bookingPrice is in hour basis i am ceiling the value to a full hour; 
  const totalBookingTimeInHour=Math.ceil(totalBookingTimeInMS/(1000*60*60))
  const payableAmount=totalBookingTimeInHour*pricePerHour;
  //todo you are gonna get the user id from token 

  //todo update and return
  const finalBookingData={...bookingData,
    "user":new mongoose.Types.ObjectId("66895d92448d933684b59a11"),
    payableAmount,
    "isBooked":"confirmed",
  }
  const result=await Booking.create(finalBookingData)
  return result
  

}

const findAllAvailableBookingsInDBForADay=async(queryDate:string)=>{
  const allBookingsInQueryDate=await Booking.find({date:queryDate}).sort({startTime:1}).select(['startTime','endTime','-_id'] )
  // now calling the calculate available slot function to get all the available slots
  const availableSlots=calculateAvailableSlots(allBookingsInQueryDate)
  return availableSlots

}


export const bookingServices={
  createBookingIntoDB,
  findAllAvailableBookingsInDBForADay
}