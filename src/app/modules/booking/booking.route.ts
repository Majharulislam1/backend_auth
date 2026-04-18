import { Router } from "express";
import { bookingControllers } from "./booking.controllers";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createBookingZodSchema } from "./booking.validation";



export const bookingRoute = Router();



bookingRoute.post("/create-booking",checkAuth(Role.SUPER_ADMIN,Role.ADMIN),validateRequest(createBookingZodSchema),bookingControllers.createBooking);

