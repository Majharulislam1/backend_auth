

import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';


let server:Server;


const startServer = async()=>{
     try {

         await mongoose.connect(envVars.DB_URL);
         
         server = app.listen(envVars.PORT,()=>{
             console.log(`Server is running in ${envVars.PORT}`);
         })



     } catch (error) {
        console.log(error);
     }
}


startServer();


process.on("SIGTERM",(error)=>{
       console.log("SIGTERM Signal Recived  ... Server Shut down", error);
        if(server){
         server.close(()=>{
             process.exit(1)
         })
      }

      process.exit(1);
})

process.on("SIGINT",(error)=>{
       console.log("SIGINT Signal Recived  ... Server Shut down", error);
        if(server){
         server.close(()=>{
             process.exit(1)
         })
      }

      process.exit(1);
})



process.on("unhandledRejection",(error)=>{
      console.log("unhandle Rejection Ditacted ... Server Shut down", error);

      if(server){
         server.close(()=>{
             process.exit(1)
         })
      }

      process.exit(1);
})


process.on("uncaughtException",(error)=>{
     console.log("unCaught Exception Ditacted ... Server Shut down", error);

     if(server){
         server.close(()=>{
             process.exit(1);
         })
     }
     process.exit(1)
})

 
 