"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeNotFoundHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
//regular middleware
const routeNotFoundHandler = (req, res, next) => {
    const message = "Not found!";
    return res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        statusCode: 404,
        message,
    });
};
exports.routeNotFoundHandler = routeNotFoundHandler;
