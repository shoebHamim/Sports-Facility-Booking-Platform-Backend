"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Facility = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const FacilitySchema = new mongoose_1.default.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    pricePerHour: { type: Number, required: [true, 'Price per hour is required'] },
    location: { type: String, required: [true, 'Location is required'] },
    isDeleted: { type: Boolean, required: [true, 'isDeleted is required'], default: false },
}, { versionKey: false });
exports.Facility = mongoose_1.default.model('Facility', FacilitySchema);
