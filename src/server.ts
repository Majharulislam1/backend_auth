

import {Server} from 'http'
import mongoose from 'mongoose';
 
import { envVars } from './app/config/env';
import { app } from './app';
import { seedSuperAdmin } from './app/utils/seedSuperAdmin';


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




(async ()=>{
     await startServer();
     await seedSuperAdmin
})()


process.on("SIGTERM",(error)=>{
       console.log("SIGTERM Signal Received  ... Server Shut down", error);
        if(server){
         server.close(()=>{
             process.exit(1)
         })
      }

      process.exit(1);
})

process.on("SIGINT",(error)=>{
       console.log("SIGINT Signal Received  ... Server Shut down", error);
        if(server){
         server.close(()=>{
             process.exit(1)
         })
      }

      process.exit(1);
})



process.on("unhandledRejection",(error)=>{
      console.log("unhandled Rejection Detected ... Server Shut down", error);

      if(server){
         server.close(()=>{
             process.exit(1)
         })
      }

      process.exit(1);
})


process.on("uncaughtException",(error)=>{
     console.log("unCaught Exception Detected ... Server Shut down", error);

     if(server){
         server.close(()=>{
             process.exit(1);
         })
     }
     process.exit(1)
})

 
 