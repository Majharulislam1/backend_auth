import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendRespons";
import { CREATED } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { bookingService } from "./booking.service";


const createBooking = catchAsync(async (req: Request, res: Response) => {
    
    const decodedToken = req.user as JwtPayload ;

    const booking = await bookingService.createBookingService(req.body,decodedToken.userId);
    

    sendResponse(res, {
        success: true,
        statusCode: CREATED,
        message: "Booking Created Successfully",
        data: booking,
    })
})


export const bookingControllers = {
     createBooking,
}