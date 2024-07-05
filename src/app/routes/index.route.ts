import { Router } from "express";
import { userRoute } from "../modules/user/user.route";


const router=Router()

const routeModules=[{
  path:'/users',
  route:userRoute
}]


routeModules.forEach((route)=>{
  router.use(route.path,route.route)
})

export default router;