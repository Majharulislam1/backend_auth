import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { divisionControllers } from "./division.controllers";
import { validateRequest } from "../../middleware/validateRequest";
import { createDivisionSchema } from "./division.validation";



export const divisionRoute = Router();


divisionRoute.post("/create", validateRequest(createDivisionSchema),checkAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.createDivision);

divisionRoute.get("/",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.getAllDivision);
divisionRoute.patch("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.updateDivision);
divisionRoute.get("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.getSingleDivision);
divisionRoute.delete("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN),divisionControllers.deleteDivision);


