import mongoose from "mongoose";
import serverConfig from "./serverConfig.js";
async function dbConnection() {
    try{
        await mongoose.connect(serverConfig.db);
        console.log("DB Connected");
    }
    catch(err){
        console.log("DB Not Connected");
        console.log(err);
    }
    }

export default dbConnection ;
