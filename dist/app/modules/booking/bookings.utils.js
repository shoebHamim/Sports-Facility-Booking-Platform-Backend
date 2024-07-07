"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateFormatValid = exports.isBookingTimeAvailable = exports.calculateAvailableSlots = void 0;
const config_1 = __importDefault(require("../../config"));
const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};
const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}`;
};
const calculateAvailableSlots = (bookedSlots) => {
    const availableSlots = [];
    const openingTime = config_1.default.facility_opening_time;
    const closingTime = config_1.default.facility_closing_time;
    // looping through all the booked slots and finding the gap which are available slots
    let previousEndTime = timeToMinutes(openingTime);
    bookedSlots.forEach((slot) => {
        const start = timeToMinutes(slot.startTime);
        if (start > previousEndTime) {
            // there is a gap available
            availableSlots.push({
                startTime: minutesToTime(previousEndTime),
                endTime: minutesToTime(start),
            });
        }
        previousEndTime = Math.max(previousEndTime, timeToMinutes(slot.endTime));
    });
    // this is for the last booking and closing time, the corner case
    if (previousEndTime < timeToMinutes(closingTime)) {
        availableSlots.push({
            startTime: minutesToTime(previousEndTime),
            endTime: closingTime,
        });
    }
    return availableSlots;
};
exports.calculateAvailableSlots = calculateAvailableSlots;
const isBookingTimeAvailable = (availableSlots, newBooking) => {
    const newBookingStart = timeToMinutes(newBooking.startTime);
    const newBookingEnd = timeToMinutes(newBooking.endTime);
    //checking for availability
    for (const slot of availableSlots) {
        const slotStart = timeToMinutes(slot.startTime);
        const slotEnd = timeToMinutes(slot.endTime);
        if (newBookingStart >= slotStart && newBookingEnd <= slotEnd) {
            return true;
        }
    }
    return false;
};
exports.isBookingTimeAvailable = isBookingTimeAvailable;
const isDateFormatValid = (date) => {
    const dateFormatRegex = /^\d{4}-([0][1-9]|[1][1-2])-([0-2][0-9]|[3][0-1])$/;
    return dateFormatRegex.test(date);
};
exports.isDateFormatValid = isDateFormatValid;
