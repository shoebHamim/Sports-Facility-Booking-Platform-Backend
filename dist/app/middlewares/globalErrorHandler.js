"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const config_1 = __importDefault(require("../config"));
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../error/handleZodError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "something went wrong";
    let errorMessages = [
        {
            path: [""],
            message,
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const zodError = (0, handleZodError_1.default)(err);
        statusCode = zodError.statusCode;
        message = zodError.message;
        errorMessages = zodError.errorMessages;
    }
    const finalError = {
        success: false,
        message,
        errorMessages,
        stack: config_1.default.environment === "development" ? err === null || err === void 0 ? void 0 : err.stack : null,
    };
    return res.status(statusCode).json(finalError);
};
exports.globalErrorHandler = globalErrorHandler;
