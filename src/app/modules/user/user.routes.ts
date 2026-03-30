import { Router } from "express";
import { UserControllers } from "./user.controllers";



export const userRouter = Router(); 

userRouter.post('/register',UserControllers.createUserControllers);
userRouter.get("/",UserControllers.getAllUser)