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
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilityServices = void 0;
const facility_model_1 = require("./facility.model");
const createFacilityIntoDB = (facilityData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.create(facilityData);
    return result;
});
const updateFacilityIntoDB = (id, updatedFacilityData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, updatedFacilityData, { new: true });
    return result;
});
const getAllFacilityFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield facility_model_1.Facility.find({ isDeleted: false });
});
exports.facilityServices = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
    getAllFacilityFromDB
};
