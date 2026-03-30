 
import { IUser } from "./user.interface";
import { User } from "./user.model";



const createUserService = async(payload:Partial<IUser>)=>{

       const {name,email} = payload;
       const  user = await User.create({
        name,
        email
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