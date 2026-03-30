 
import { BAD_REQUEST } from "http-status-codes";
import AppError from "../../errorHelpers/AppErro";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";

import bcrypt from "bcryptjs";

const createUserService = async(payload:Partial<IUser>)=>{

       const {email,password,...rest} = payload;

       const isUserExist = await User.findOne({email});
       
       if(isUserExist){
           throw new  AppError(BAD_REQUEST,"User Already Exist",);
       }

       const hashPassword = await bcrypt.hash(password as string,10);

      const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

       const  user = await User.create({
        email,
        password:hashPassword,
        auths:[authProvider],
        ...rest
       })

      return user
}

const getAllUserService = async()=>{
     
     const allUser = await User.find({});
     const totalUser = await User.countDocuments();

     return {
           data:allUser,
           meta:{
                total:totalUser
           }
     };

}

export const userService = {
     createUserService,
     getAllUserService
}