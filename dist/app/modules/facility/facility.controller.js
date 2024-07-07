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
exports.facilityControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const facility_service_1 = require("./facility.service");
const createFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield facility_service_1.facilityServices.createFacilityIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        data: data,
        message: "Facility added successfully",
        statusCode: 200,
        success: true,
    });
}));
const updateFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield facility_service_1.facilityServices.updateFacilityIntoDB(req.params.id, req.body);
    if (!data) {
        (0, sendResponse_1.default)(res, {
            data: [],
            message: "No facility found to update",
            statusCode: 404,
            success: false,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            data: data,
            message: "Facility updated successfully",
            statusCode: 200,
            success: true,
        });
    }
}));
const deleteFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield facility_service_1.facilityServices.updateFacilityIntoDB(req.params.id, { isDeleted: true });
    if (!data) {
        (0, sendResponse_1.default)(res, {
            data: [],
            message: "No facility found to delete",
            statusCode: 404,
            success: false,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            data: data,
            message: "Facility deleted successfully",
            statusCode: 200,
            success: true,
        });
    }
}));
const getAllFacility = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield facility_service_1.facilityServices.getAllFacilityFromDB();
    if (!data.length) {
        return (0, sendResponse_1.default)(res, {
            data: [],
            message: "No facility found",
            statusCode: 404,
            success: false,
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            data: data,
            message: "Facilities retrieved successfully",
            statusCode: 200,
            success: true,
        });
    }
}));
exports.facilityControllers = {
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacility
};
