import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { bookingServices } from "./booking.service";
import { isBookingTimeAvailable, isDateFormatValid } from "./bookings.utils";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const newBookingTime = {
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
  };
  // find all the available booking slots in the requested day of new booking
  const availableSlotsInNewBookingDay =
    await bookingServices.findAllAvailableBookingsInDBForADay(bookingData.date);
  // make sure newBooking slot is available
  const isNewBookingTimeAvailable = isBookingTimeAvailable(
    availableSlotsInNewBookingDay,
    newBookingTime
  );
  if (!isNewBookingTimeAvailable) {
    return sendResponse(res, {
      data: [],
      message:
        "Booking Time is unavailable. Please select another time or try another date",
      statusCode: 400,
      success: false,
    });
  }
  // everything fine ... now make the  booking
  const data = await bookingServices.createBookingIntoDB(bookingData);
  return sendResponse(res, {
    data: data,
    message: "Booking created successfully",
    statusCode: 200,
    success: true,
  });
});

const checkBookingAvailability = catchAsync(async (req, res) => {
  let queryDate = req.query.date;
  // taking today if date is not provided
  if (!queryDate) {
    const today = new Date();
    queryDate = today.toISOString().split("T")[0];
  } else if (!isDateFormatValid(queryDate as string)) {
    // checking if the date is in correct format
    return sendResponse(res, {
      message: "Invalid date format. Please use YYYY-MM-DD format.",
      statusCode: 400,
      success: false,
      data: [],
    });
  }
  const data = await bookingServices.findAllAvailableBookingsInDBForADay(
    queryDate as string
  );
  sendResponse(res, {
    data: data,
    message: "Availability checked successfully",
    statusCode: 200,
    success: true,
  });
});

const getAllBookings=catchAsync(async(req,res)=>{
  const data= await bookingServices.getAllBookingsFromDB()
    if(!data.length){
    return sendResponse(res, {
      data: [],
      message: "No booking found",
      statusCode: 404,
      success: false,
    });
  }
  sendResponse(res, {
    data: data,
    message: "Bookings retrieved successfully",
    statusCode: 200,
    success: true,
  });
})
const getUserBooking=catchAsync(async(req,res)=>{
  // retrieve userid from token
  const userID='12232';
  const data= await bookingServices.getUsersBookingsFromDB(userID)
    if(!data.length){
    return sendResponse(res, {
      data: [],
      message: "No booking found",
      statusCode: 404,
      success: false,
    });
  }
  sendResponse(res, {
    data: data,
    message: "Bookings retrieved successfully",
    statusCode: 200,
    success: true,
  });
})
const cancelBooking=catchAsync(async(req,res)=>{
  const data= await bookingServices.cancelBookingsInDB(req.params.id)
    if(!data?.isModified){
    return sendResponse(res, {
      data: [],
      message: "No booking found",
      statusCode: 404,
      success: false,
    });
  }
  sendResponse(res, {
    data: data,
    message: "Bookings cancelled successfully",
    statusCode: 200,
    success: true,
  });
})


export const bookingControllers = {
  createBooking,
  checkBookingAvailability,
  getAllBookings,
  getUserBooking,
  cancelBooking
};
