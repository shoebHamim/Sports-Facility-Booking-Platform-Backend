"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_route_1 = __importDefault(require("./app/routes/index.route"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const routeNotFoundHandler_1 = require("./app/middlewares/routeNotFoundHandler");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use('/api', index_route_1.default);
// root path
app.get('/', (req, res) => {
    res.send('Hello Word! This is the root directory of Sports Facility Booking API');
});
app.all('/*', routeNotFoundHandler_1.routeNotFoundHandler);
// middlewares
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
