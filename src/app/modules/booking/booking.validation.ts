import { z } from 'zod';

const createBooking = z.object({
  facility: z.string({required_error:"facility id is required"}),
  date: z.date().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format, expected YYYY-MM-DD")).transform((date) => new Date(date)),
  startTime: z.string().regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, "startTime must be in HH:MM format"),
  endTime: z.string().regex(/^([01][0-9]|2[0-3]):[0-5][0-9]$/, "endTime must be in HH:MM format"),
})
// here i am making sure booking range is in Hour
.refine(data => (new Date(`1970-01-01T${data.endTime}:00`).getTime() -new Date(`1970-01-01T${data.startTime}:00`).getTime())%(60*60*1000)===0, {
  message: "Booking length must be multiple of hour.[Can't book for duration like 10 minutes,70 minutes etc]",
  path: ["endTime"], 
});

export const bookingValidationSchemas={
  createBooking
};