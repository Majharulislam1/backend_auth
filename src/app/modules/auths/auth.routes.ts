import { Router } from "express";
import { authControllers } from "./auth.controllers";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
 





export const authRouter = Router();


authRouter.post("/login",authControllers.credentialLogin);
authRouter.post("/refresh-token",authControllers.getNewAccessToken);
authRouter.post("/logOut",authControllers.logOut);
authRouter.post("/reset-password",checkAuth(...Object.values(Role)),authControllers.resetPassword);