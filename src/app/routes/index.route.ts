import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { facilityRoute } from "../modules/facility/facility.route";
import { bookingRoute } from "../modules/booking/bookingRoute";
import { bookingControllers } from "../modules/booking/booking.controller";

const router = Router();

const routeModules = [
  {
    path: "/auth",
    route: authRoute,
  },  {
    path: "/facility",
    route: facilityRoute,
  }, {
    path: "/bookings",
    route: bookingRoute,
  },{
    path: "/check-availability",
    route: Router().get('/', bookingControllers.checkBookingAvailability),
  },
];

routeModules.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
