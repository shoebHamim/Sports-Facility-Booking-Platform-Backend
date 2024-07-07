"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const facility_route_1 = require("../modules/facility/facility.route");
const bookingRoute_1 = require("../modules/booking/bookingRoute");
const booking_controller_1 = require("../modules/booking/booking.controller");
const router = (0, express_1.Router)();
const routeModules = [
    {
        path: "/auth",
        route: auth_route_1.authRoute,
    }, {
        path: "/facility",
        route: facility_route_1.facilityRoute,
    }, {
        path: "/bookings",
        route: bookingRoute_1.bookingRoute,
    }, {
        path: "/check-availability",
        route: (0, express_1.Router)().get('/', booking_controller_1.bookingControllers.checkBookingAvailability),
    },
];
routeModules.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
