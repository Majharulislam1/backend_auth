import { Router } from "express";
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";



export const userRouter = Router(); 

userRouter.post('/register',validateRequest(createUserZodSchema) ,UserControllers.createUserControllers);
userRouter.get("/",checkAuth(Role.USER),UserControllers.getAllUser);

