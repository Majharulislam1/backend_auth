import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import { CREATED, OK } from "http-status-codes";
import { divisionService } from "./division.service";


const createDivision = catchAsync(async (req: Request, res: Response) => {

    const division = await divisionService.createDivisionService(req.body);

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "User Created Successfully",
        data: division,
    })
})


const getAllDivision = catchAsync(async (req: Request, res: Response) => {

    const result = await divisionService.getAllDivision();

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Successfully Get All Division",
        data: result.data,
        meta: result.meta
    })
})

const getSingleDivision = catchAsync(async (req: Request, res: Response) => {

    const result = await divisionService.getSingleDivision(req.params.id as string);

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Successfully Get Single Division",
        data: result.data,

    })
})



const updateDivision = catchAsync(async (req: Request, res: Response) => {

    const result = await divisionService.updateDivision(req.params.id as string, req.body);

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Successfully Update Single Division",
        data: result,

    })
})


const deleteDivision = catchAsync(async (req: Request, res: Response) => {

    const result = await divisionService.deleteDivision(req.params.id as string);

    sendResponse(res, {
        success: true,
        statusCode: OK,
        message: "Successfully Delete Single Division",
        data: result
    })
})


export const divisionControllers = {
    createDivision,
    getAllDivision,
    getSingleDivision,
    updateDivision,
    deleteDivision
}