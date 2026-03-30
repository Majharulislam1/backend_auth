import { Router } from "express";
import { UserControllers } from "./user.controllers";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";



export const userRouter = Router(); 

userRouter.post('/register',validateRequest(createUserZodSchema) ,UserControllers.createUserControllers);
userRouter.get("/",UserControllers.getAllUser);

