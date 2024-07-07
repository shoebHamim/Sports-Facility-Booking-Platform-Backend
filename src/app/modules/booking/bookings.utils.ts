import config from "../../config";

type TTimeSlot = {
  startTime: string;
  endTime: string;
};
const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

export const calculateAvailableSlots = (bookedSlots: TTimeSlot[]) => {
  const availableSlots = [];
  const openingTime = config.facility_opening_time as string;
  const closingTime = config.facility_closing_time as string;

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

export const isBookingTimeAvailable = (
  availableSlots: TTimeSlot[],
  newBooking: TTimeSlot
): boolean => {
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

export const isDateFormatValid = (date: string) => {
  const dateFormatRegex = /^\d{4}-([0][1-9]|[1][1-2])-([0-2][0-9]|[3][0-1])$/;
  return dateFormatRegex.test(date);
};
