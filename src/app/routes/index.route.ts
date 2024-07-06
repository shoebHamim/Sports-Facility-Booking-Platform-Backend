import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { facilityRoute } from "../modules/facility/facility.route";

const router = Router();

const routeModules = [
  {
    path: "/auth",
    route: authRoute,
  },  {
    path: "/facility",
    route: facilityRoute,
  },
];

routeModules.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;