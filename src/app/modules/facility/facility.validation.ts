import { z } from 'zod';

const createFacility = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, 'Name length must be at least 2 characters'),
  description: z.string({ required_error: "Description is required" }).min(1, 'Description cannot be empty'),
  pricePerHour: z.number({ required_error: "Price per hour is required" }).nonnegative('Price per hour must be a non-negative number'),
  location: z.string({ required_error: "Location is required" }).min(1, 'Location cannot be empty'),
  isDeleted: z.boolean().optional().default(false)
});

const updateFacility=z.object({
  name: z.string({ required_error: "Name is required" }).min(2, 'Name length must be at least 2 characters'),
  description: z.string({ required_error: "Description is required" }).min(1, 'Description cannot be empty'),
  pricePerHour: z.number({ required_error: "Price per hour is required" }).nonnegative('Price per hour must be a non-negative number'),
  location: z.string({ required_error: "Location is required" }).min(1, 'Location cannot be empty'),
  isDeleted: z.boolean().optional().default(false)
}).partial();
export const facilityValidationSchemas={
  createFacility,
  updateFacility
};