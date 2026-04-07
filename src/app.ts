
 

import express, {   type Request, type Response } from 'express';
import cors from 'cors'
import { router } from './app/routers';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { NOT_FOUND } from 'http-status-codes';
import { notFound } from './app/middleware/notFound';
import cookieParser from 'cookie-parser';

import expressSession from 'express-session'
import { envVars } from './app/config/env';
import passport from 'passport';

export const app = express();



app.use(expressSession({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());

app.use(express.json());
app.use(cookieParser())
app.use(cors());


app.use('/api/v1',router);


app.get('/',(req:Request,res:Response)=>{
     res.send({
         message:"Server is running",
     })
})



 app.use(globalErrorHandler);
 app.use(notFound)