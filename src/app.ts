
 

import express, { type Request, type Response } from 'express';
import cors from 'cors'
import { router } from './app/routers';

const app = express();


app.use(express.json());
app.use(cors());


app.use('/api/v1',router);


app.get('/',(req:Request,res:Response)=>{
     res.send({
         message:"Server is running",
     })
})



export default app;