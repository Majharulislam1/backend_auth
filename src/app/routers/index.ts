import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { authRouter } from "../modules/auths/auth.routes";
import { divisionRoute } from "../modules/division/division.route";
import { tourRoute } from "../modules/tour/tour.route";



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
     }
]


moduleRoutes.forEach((route)=>{
     router.use(route.path,route.route);
})