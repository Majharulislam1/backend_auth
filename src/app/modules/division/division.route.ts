import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { divisionControllers } from "./division.controllers";



export const divisionRoute = Router();


divisionRoute.post("/create",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.createDivision);


