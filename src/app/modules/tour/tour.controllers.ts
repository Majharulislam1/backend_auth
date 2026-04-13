import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { tourService } from "./tour.service";
import { sendResponse } from "../../utils/sendRespons";
import { CREATED } from "http-status-codes";




const createTourType = catchAsync(async (req: Request, res: Response) => {

    const tourType = await tourService.createTourType(req.body);

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "TourType Created Successfully",
        data: tourType,
    })
})


const updateTourType = catchAsync(async (req: Request, res: Response) => {

    const tourType = await tourService.updateTourTypes(req.params.id as string,req.body);

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "TourType Update Successfully",
        data: tourType,
    })
})



const getAllTourType = catchAsync(async (req: Request, res: Response) => {

    const tourType = await tourService.getAllTourType();

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "Successfully Find all tour-type",
        data: tourType.data,
        meta:tourType.meta
    })
})


const deleteTourType = catchAsync(async (req: Request, res: Response) => {

    const tourType = await tourService.deleteTourTypes(req.params.id as string);

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "TourType deleted Successfully",
        data: null
    })
})


export const tourControllers = {
     createTourType,
     updateTourType,
     getAllTourType,
     deleteTourType
}


