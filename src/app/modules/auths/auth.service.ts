import  bcrypt  from 'bcryptjs';
import { BAD_REQUEST } from 'http-status-codes';
import AppError from "../../errorHelpers/AppErro";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import jwt from 'jsonwebtoken'



const credentialLogin = async (payload: Partial<IUser>) => {

    const { email, password } = payload;

    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
        throw new AppError(BAD_REQUEST, "User Doesn't Exist",);
    }

    const hashPassword = await bcrypt.compare(password as string,isUserExist.password as string);

    if(!hashPassword){
          throw new AppError(BAD_REQUEST, "Password Doesn't Match",);
    }


    const data = {
         userId :isUserExist._id,
         email:isUserExist.email,
         role:isUserExist.role
    }
    
    const accessToken = jwt.sign(data,'secret',{
         expiresIn:'1d'
    })


   return {
      accessToken
   }

}







export const authService = {
    credentialLogin
}