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
exports.bookingServices = void 0;
const AppError_1 = require("../../error/AppError");
const facility_model_1 = require("../facility/facility.model");
const booking_model_1 = __importDefault(require("./booking.model"));
const bookings_utils_1 = require("./bookings.utils");
const createBookingIntoDB = (user, bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    // find the facility
    const facility = yield facility_model_1.Facility.findById(bookingData.facility);
    if (!facility) {
        throw new AppError_1.AppError(404, 'Facility not found');
    }
    const pricePerHour = facility.pricePerHour;
    const totalBookingTimeInMS = new Date(`1970-01-01T${bookingData.endTime}:00`).getTime() - new Date(`1970-01-01T${bookingData.startTime}:00`).getTime();
    // as the bookingPrice is in hour basis i am ceiling the value to a full hour; 
    const totalBookingTimeInHour = Math.ceil(totalBookingTimeInMS / (1000 * 60 * 60));
    const payableAmount = totalBookingTimeInHour * pricePerHour;
    const finalBookingData = Object.assign(Object.assign({}, bookingData), { user,
        payableAmount, "isBooked": "confirmed" });
    const result = yield booking_model_1.default.create(finalBookingData);
    return result;
});
const findAllAvailableBookingsInDBForADay = (queryDate) => __awaiter(void 0, void 0, void 0, function* () {
    const allBookingsInQueryDate = yield booking_model_1.default.find({ date: queryDate, isBooked: "confirmed" }).sort({ startTime: 1 }).select(['startTime', 'endTime', '-_id']);
    // now calling the calculate available slot function to get all the available slots
    const availableSlots = (0, bookings_utils_1.calculateAvailableSlots)(allBookingsInQueryDate);
    return availableSlots;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const allBookings = yield booking_model_1.default.find({}).sort({ startTime: 1 }).populate(['user', 'facility']);
    return allBookings;
});
const getUsersBookingsFromDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const allBookings = yield booking_model_1.default.find({ user }).sort({ startTime: 1 }).populate('facility');
    return allBookings;
});
const cancelBookingsInDB = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.default.findByIdAndUpdate(bookingId, { "isBooked": "canceled" }, { new: true }).populate('facility');
    return result;
});
exports.bookingServices = {
    createBookingIntoDB,
    findAllAvailableBookingsInDBForADay,
    getAllBookingsFromDB,
    getUsersBookingsFromDB,
    cancelBookingsInDB
};
