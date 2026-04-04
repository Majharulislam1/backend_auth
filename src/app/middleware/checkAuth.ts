import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppErro";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { BAD_REQUEST } from "http-status-codes";
import { IsActive } from "../modules/user/user.interface";

export const checkAuth = (...authRoles:string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.headers.authorization;


        if (!accessToken) {
            throw new AppError(403, "No Token Received")
        }

        const verify_Token = verifyToken(accessToken,envVars.JWT_ACCESS_SECRET) as JwtPayload;
         
        const isUserExist = await User.findOne({ email: verify_Token.email })

        if (!isUserExist) {
            throw new AppError(BAD_REQUEST, "User does not exist")
        }
        if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
            throw new AppError(BAD_REQUEST, `User is ${isUserExist.isActive}`)
        }
        if (isUserExist.isDeleted) {
            throw new AppError(BAD_REQUEST, "User is deleted")
        }


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