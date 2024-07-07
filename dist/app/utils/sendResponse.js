"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    if (data.token) {
        res.status(data.statusCode).json({
            success: data.success,
            statusCode: data.statusCode,
            message: data.message,
            token: data.token,
            data: data.data,
        });
    }
    else {
        res.status(data.statusCode).json({
            success: data.success,
            statusCode: data.statusCode,
            message: data.message,
            data: data.data,
        });
    }
};
exports.default = sendResponse;
