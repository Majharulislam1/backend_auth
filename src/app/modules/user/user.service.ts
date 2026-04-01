
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND } from "http-status-codes";
import AppError from "../../errorHelpers/AppErro";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";

import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const createUserService = async (payload: Partial<IUser>) => {

     const { email, password, ...rest } = payload;

     const isUserExist = await User.findOne({ email });

     if (isUserExist) {
          throw new AppError(BAD_REQUEST, "User Already Exist",);
     }

     const hashPassword = await bcrypt.hash(password as string, 10);

     const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

     const user = await User.create({
          email,
          password: hashPassword,
          auths: [authProvider],
          ...rest
     })

     return user
}

const getAllUserService = async () => {

     const allUser = await User.find({});
     const totalUser = await User.countDocuments();

     return {
          data: allUser,
          meta: {
               total: totalUser
          }
     };

}



const updateUserService = async (userId:string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

     const ifUserExist = await User.findById(userId);

     if (!ifUserExist) {
          throw new AppError(NOT_FOUND, "User Not Found");
     }

     if (payload.role) {
          if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
               throw new AppError(FORBIDDEN, "You are not authorized");
          }

          if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
               throw new AppError(FORBIDDEN, "You are not authorized");
          }
     }

     if (payload.isActive || payload.isDeleted || payload.isVerified) {
          if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
               throw new AppError(FORBIDDEN, "You are not authorized");
          }
     }

     if (payload.password) {
          payload.password = await bcrypt.hash(payload.password, envVars.BCRYPT_SLOT_ROUND)
     }


     const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })

    return newUpdatedUser


}


export const userService = {
     createUserService,
     getAllUserService,
     updateUserService
}