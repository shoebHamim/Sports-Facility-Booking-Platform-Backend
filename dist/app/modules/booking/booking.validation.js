"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidationSchemas = void 0;
const zod_1 = require("zod");
const createBooking = zod_1.z.object({
    facility: zod_1.z.string({ required_error: "facility id is required" }),
    date: zod_1.z.date().or(zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD")).transform((date) => new Date(date)),
    startTime: zod_1.z.string().regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, "startTime must be in HH:MM format"),
    endTime: zod_1.z.string().regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, "endTime must be in HH:MM format"),
})
    // here i am making sure booking range is in Hour
    .refine(data => (new Date(`1970-01-01T${data.endTime}:00`).getTime() - new Date(`1970-01-01T${data.startTime}:00`).getTime()) % (60 * 60 * 1000) === 0, {
    message: "Booking length must be multiple of hour.[Can't book for duration like 10 minutes,70 minutes etc]",
    path: ["endTime"],
});
exports.bookingValidationSchemas = {
    createBooking
};
