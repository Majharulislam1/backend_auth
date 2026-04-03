import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { BAD_REQUEST, OK } from "http-status-codes";
import { sendResponse } from "../../utils/sendRespons";
import AppError from "../../errorHelpers/AppErro";
import { setAuthCookie } from "../../utils/setCookes";


const credentialLogin = catchAsync(async (req: Request, res: Response) => {

    const user = await authService.credentialLogin(req.body);

    setAuthCookie(res, user);

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "User Login Successfully",
        data: user
    })

})


const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        throw new AppError(BAD_REQUEST, "No refresh token recieved from cookies")
    }

    const tokenInfo = await authService.getNewAccessToken(refreshToken as string);

       
    setAuthCookie(res,tokenInfo);
     
     sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "New Access Token Retrieved Successfully",
        data: tokenInfo,
    })

})


const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
     res.clearCookie("accessToken",{
         httpOnly:true,
         secure:false,
         sameSite:"lax"
     })

     res.clearCookie("refreshToken",{
          httpOnly:true,
          secure:false,
          sameSite:"lax"
     })
     
     
     sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "User Logout Successfully",
        data: null
    })

})




export const authControllers = {
    credentialLogin,
    getNewAccessToken,
    logOut
}