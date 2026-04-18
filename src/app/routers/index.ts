import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auths/auth.routes";
import { divisionRoute } from "../modules/division/division.route";
import { tourRoute } from "../modules/tour/tour.route";
import { bookingRoute } from "../modules/booking/booking.route";



export const router = Router();

const moduleRoutes = [
     {
        path:'/user',
        route:userRouter,
     },
     {
          path:"/auth",
          route:authRouter
     },
     {
          path:"/division",
          route:divisionRoute
     },
     {
          path:"/tour",
          route:tourRoute
     },
     {
        path:"/booking",
        route:bookingRoute
     }
]


moduleRoutes.forEach((route)=>{
     router.use(route.path,route.route);
})