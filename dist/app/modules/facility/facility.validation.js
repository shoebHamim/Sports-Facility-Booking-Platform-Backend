"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityValidationSchemas = void 0;
const zod_1 = require("zod");
const createFacility = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name is required" }).min(2, 'Name length must be at least 2 characters'),
    description: zod_1.z.string({ required_error: "Description is required" }).min(1, 'Description cannot be empty'),
    pricePerHour: zod_1.z.number({ required_error: "Price per hour is required" }).nonnegative('Price per hour must be a non-negative number'),
    location: zod_1.z.string({ required_error: "Location is required" }).min(1, 'Location cannot be empty'),
    isDeleted: zod_1.z.boolean().optional().default(false)
});
const updateFacility = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name is required" }).min(2, 'Name length must be at least 2 characters'),
    description: zod_1.z.string({ required_error: "Description is required" }).min(1, 'Description cannot be empty'),
    pricePerHour: zod_1.z.number({ required_error: "Price per hour is required" }).nonnegative('Price per hour must be a non-negative number'),
    location: zod_1.z.string({ required_error: "Location is required" }).min(1, 'Location cannot be empty'),
    isDeleted: zod_1.z.boolean().optional().default(false)
}).partial();
exports.facilityValidationSchemas = {
    createFacility,
    updateFacility
};
