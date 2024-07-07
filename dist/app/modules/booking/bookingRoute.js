"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoute = void 0;
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const booking_validation_1 = require("./booking.validation");
const auth_1 = require("../../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.auth)(['user']), (0, validateRequest_1.validateRequest)(booking_validation_1.bookingValidationSchemas.createBooking), booking_controller_1.bookingControllers.createBooking);
router.get('/', (0, auth_1.auth)(['admin']), booking_controller_1.bookingControllers.getAllBookings);
router.get('/user', (0, auth_1.auth)(['user']), booking_controller_1.bookingControllers.getUserBooking);
router.delete('/:id', (0, auth_1.auth)(["user"]), booking_controller_1.bookingControllers.cancelBooking);
exports.bookingRoute = router;
