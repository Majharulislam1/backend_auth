import { Router } from "express";
import { authControllers } from "./auth.controllers";





export const authRouter = Router();


authRouter.post("/login",authControllers.credentialLogin);
authRouter.post("/refresh-token",authControllers.getNewAccessToken);
authRouter.post("/logOut",authControllers.logOut);