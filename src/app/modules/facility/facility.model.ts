import { TFacility } from './facility.interface';
import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema<TFacility>({
  name: { type: String, required: [true, 'Name is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  pricePerHour: { type: Number, required: [true, 'Price per hour is required'] },
  location: { type: String, required: [true, 'Location is required'] },
  isDeleted: { type: Boolean, required: [true, 'isDeleted is required'] ,default:false},
},{versionKey:false});

export const Facility = mongoose.model<TFacility>('Facility', FacilitySchema);