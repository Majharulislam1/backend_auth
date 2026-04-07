import bcrypt from 'bcryptjs';
import { BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';
import AppError from "../../errorHelpers/AppErro";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { generateToken } from '../../utils/jwt';
import { envVars } from '../../config/env';
import { createNewAccessTokenWithRefreshToken, createUserTokens } from '../../utils/userTokens';



const credentialLogin = async (payload: Partial<IUser>) => {

    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(BAD_REQUEST, "User Doesn't Exist",);
    }

    const hashPassword = await bcrypt.compare(password as string, isUserExist.password as string);

    if (!hashPassword) {
        throw new AppError(BAD_REQUEST, "Password Doesn't Match",);
    }


    // const data = {
    //      userId :isUserExist._id,
    //      email:isUserExist.email,
    //      role:isUserExist.role
    // }

    // const accessToken = generateToken(data,envVars.JWT_ACCESS_SECRET,envVars.JWT_ACCESS_EXPIRE);
    // const refreshToken = generateToken(data,envVars.JWT_REFRESH_SECRET,envVars.JWT_REFRESH_EXPIRE);

    const userToken = createUserTokens(isUserExist);

    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    }

}



const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken);

    return {
        accessToken: newAccessToken
    }
}


const restPasswordService = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
      
    const user = await User.findById(decodedToken.userId);
    

    const isOldPasswordMatch = await bcrypt.compare(oldPassword, user!.password as string);

    if (!isOldPasswordMatch) {
        throw new AppError(UNAUTHORIZED, "Old Password does not match");

    }

    user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SLOT_ROUND));


    user!.save();

}





export const authService = {
    credentialLogin,
    getNewAccessToken,
    restPasswordService
}