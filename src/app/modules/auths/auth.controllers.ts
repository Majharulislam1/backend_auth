import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { authService } from "./auth.service";
import { OK } from "http-status-codes";
import { sendResponse } from "../../utils/sendRespons";


const credentialLogin = catchAsync(async (req: Request, res: Response) => {

     const user = await authService.credentialLogin(req.body)

    sendResponse(res, {
        success: true,
        statusCode:  OK,
        message: "User Login Successfully",
        data: user
    })


})




export const authControllers = {
     credentialLogin
}