import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppErro";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";

export const checkAuth = (...authRoles:string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.headers.authorization;


        if (!accessToken) {
            throw new AppError(403, "No Token Received")
        }

        const verify_Token = verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload;

         if (!authRoles.includes(verify_Token.role)) {
            throw new AppError(403, "You are not permitted to view this route!!!")
        }

        req.user = verifyToken;

       next();

    } catch (error) {
        console.log("jwt Error", error);
        next(error);
    }
}