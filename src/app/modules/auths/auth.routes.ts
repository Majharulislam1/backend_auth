import { NextFunction, Request, Response, Router } from "express";
import { authControllers } from "./auth.controllers";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";






export const authRouter = Router();


authRouter.post("/login", authControllers.credentialLogin);
authRouter.post("/refresh-token", authControllers.getNewAccessToken);
authRouter.post("/logOut", authControllers.logOut);
authRouter.post("/reset-password", checkAuth(...Object.values(Role)), authControllers.resetPassword);

// google 

authRouter.get('/google', async (req: Request, res: Response, next: NextFunction) => {
    const redirect = req.query.redirect || "/"
    passport.authenticate("google", { scope: ["profile", "email"], state: redirect as string })(req, res, next)
})

authRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), authControllers.googleCallbackController);