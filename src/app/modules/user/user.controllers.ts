import { Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import { CREATED, OK } from "http-status-codes";


const createUserControllers = catchAsync(async (req: Request, res: Response) => {

     const user = await userService.createUserService(req.body);

    sendResponse(res, {
        success: true,
        statusCode:  CREATED,
        message: "User Created Successfully",
        data: user,
    })


})


const getAllUser = catchAsync(async(req:Request,res:Response)=>{
       const result = await userService.getAllUserService();
       
       sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "User Finded Successfully",
        data:result.data ,
        meta:result.meta
    })
       
})




export const UserControllers = {
     createUserControllers,
     getAllUser
}