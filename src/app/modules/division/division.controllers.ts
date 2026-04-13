import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import { CREATED } from "http-status-codes";
import { divisionService } from "./division.service";


const createDivision = catchAsync(async (req: Request, res: Response) => {

    const division = await divisionService.createDivisionService(req.body);

    sendResponse(res, {
        success: true,
        statusCode:  CREATED,
        message: "User Created Successfully",
        data: division,
    })
})


export const divisionControllers = {
     createDivision
}