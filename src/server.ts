

import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';


let server:Server;


const startServer = async()=>{
     try {

         await mongoose.connect("mongodb+srv://majharul2022:majharul2022@cluster0.5g7cb.mongodb.net/tourDB?retryWrites=true&w=majority&appName=Cluster0");
         
         server = app.listen(5000,()=>{
             console.log(`Server is running in ${5000}`);
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

 
 