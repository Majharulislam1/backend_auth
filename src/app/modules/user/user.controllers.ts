import { Request, Response } from "express";
import { userService } from "./user.service";


const createUserControllers = async(req:Request,res:Response)=>{
     

     const user = await userService.createUserService(req.body);

     res.status(201).json({
         status:true,
         message:"successfully user Created",
         user
     })

}





export const UserControllers = {
     createUserControllers
}