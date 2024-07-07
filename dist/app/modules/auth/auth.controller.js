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
exports.authControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const signUpUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const data = yield auth_service_1.authServices.signUpUserIntoDB(userData);
    (0, sendResponse_1.default)(res, {
        data: data,
        message: "User registered successfully",
        statusCode: 200,
        success: true,
    });
}));
const loginUser = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const data = yield auth_service_1.authServices.loginUserFromDB(userData);
    if (!data) {
        (0, sendResponse_1.default)(res, {
            success: false,
            message: "No user Found",
            statusCode: 404,
            data: []
        });
    }
    else {
        (0, sendResponse_1.default)(res, {
            data: data.withoutPassword,
            token: data.accessToken,
            message: "User logged in successfully",
            statusCode: 200,
            success: true,
        });
    }
}));
exports.authControllers = {
    signUpUser,
    loginUser
};
