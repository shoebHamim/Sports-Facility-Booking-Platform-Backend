"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const booking_service_1 = require("./booking.service");
const bookings_utils_1 = require("./bookings.utils");
const createBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.authenticatedUser.userId;
    const bookingData = req.body;
    const newBookingTime = {
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
    };
    // find all the available booking slots in the requested day of new booking
    const availableSlotsInNewBookingDay = yield booking_service_1.bookingServices.findAllAvailableBookingsInDBForADay(bookingData.date);
    // make sure newBooking slot is available
    const isNewBookingTimeAvailable = (0, bookings_utils_1.isBookingTimeAvailable)(availableSlotsInNewBookingDay, newBookingTime);
    if (!isNewBookingTimeAvailable) {
        return (0, sendResponse_1.default)(res, {
            data: [],
            message: "Booking Time is unavailable. Please select another time or try another date",
            statusCode: 400,
            success: false,
        });
    }
    // everything fine ... now make the  booking
    const data = yield booking_service_1.bookingServices.createBookingIntoDB(user, bookingData);
    return (0, sendResponse_1.default)(res, {
        data: data,
        message: "Booking created successfully",
        statusCode: 200,
        success: true,
    });
}));
const checkBookingAvailability = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let queryDate = req.query.date;
    // taking today if date is not provided
    if (!queryDate) {
        const today = new Date();
        queryDate = today.toISOString().split("T")[0];
    }
    else if (!(0, bookings_utils_1.isDateFormatValid)(queryDate)) {
        // checking if the date is in correct format
        return (0, sendResponse_1.default)(res, {
            message: "Invalid date format. Please use YYYY-MM-DD format.",
            statusCode: 400,
            success: false,
            data: [],
        });
    }
    const data = yield booking_service_1.bookingServices.findAllAvailableBookingsInDBForADay(queryDate);
    (0, sendResponse_1.default)(res, {
        data: data,
        message: "Availability checked successfully",
        statusCode: 200,
        success: true,
    });
}));
const getAllBookings = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield booking_service_1.bookingServices.getAllBookingsFromDB();
    if (!data.length) {
        return (0, sendResponse_1.default)(res, {
            data: [],
            message: "No booking found",
            statusCode: 404,
            success: false,
        });
    }
    (0, sendResponse_1.default)(res, {
        data: data,
        message: "Bookings retrieved successfully",
        statusCode: 200,
        success: true,
    });
}));
const getUserBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // retrieve userId from token
    const user = req.authenticatedUser.userId;
    console.log(user);
    const data = yield booking_service_1.bookingServices.getUsersBookingsFromDB(user);
    if (!data.length) {
        return (0, sendResponse_1.default)(res, {
            data: [],
            message: "No booking found",
            statusCode: 404,
            success: false,
        });
    }
    (0, sendResponse_1.default)(res, {
        data: data,
        message: "Bookings retrieved successfully",
        statusCode: 200,
        success: true,
    });
}));
const cancelBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield booking_service_1.bookingServices.cancelBookingsInDB(req.params.id);
    if (!(data === null || data === void 0 ? void 0 : data.isModified)) {
        return (0, sendResponse_1.default)(res, {
            data: [],
            message: "No booking found",
            statusCode: 404,
            success: false,
        });
    }
    (0, sendResponse_1.default)(res, {
        data: data,
        message: "Bookings cancelled successfully",
        statusCode: 200,
        success: true,
    });
}));
exports.bookingControllers = {
    createBooking,
    checkBookingAvailability,
    getAllBookings,
    getUserBooking,
    cancelBooking
};
