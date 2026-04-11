import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import { CREATED } from "http-status-codes";


const createDivision = catchAsync(async (req: Request, res: Response) => {

    

    sendResponse(res, {
        success: true,
        statusCode:  CREATED,
        message: "User Created Successfully",
        data: {},
    })
})


export const divisionControllers = {
     createDivision
}