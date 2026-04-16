import { Router } from "express";
import { tourControllers } from "./tour.controllers";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { createTourZodSchema, updateTourZodSchema } from "./tour.validation";



export const tourRoute = Router();



//    ----------------------------- tour type --------------------------------- 

tourRoute.post("/create-tour-type",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourControllers.createTourType)
tourRoute.patch("/update-tour-type/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourControllers.updateTourType)
tourRoute.get("/tour-type",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourControllers.getAllTourType)
tourRoute.delete("/delete-tour-type/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourControllers.deleteTourType)


//    ----------------------------- tour --------------------------------- 
tourRoute.get("/",tourControllers.getAllTourControllers);
tourRoute.post("/create-tour",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),validateRequest(createTourZodSchema) ,tourControllers.createTour);
tourRoute.patch("/update-tour/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),validateRequest(updateTourZodSchema),tourControllers.updateTourControllers);
tourRoute.delete("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),tourControllers.deleteTourControllers);






