import { Router } from "express";
import { authControllers } from "./auth.controllers";





export const authRouter = Router();


authRouter.post("/login",authControllers.credentialLogin);