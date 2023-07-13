import mongoose from "mongoose";

export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection=mongoose.connection;

        connection.on("connected",()=>{
            console.log("Connected MongoDb Sucesssfully")
        })
        connection.on("error",(err)=>{
            console.log("MongoDb connection error ."+err)
        })
        
    } catch (error) {
       console.log("somthing went wrong") 
       console.log(error)

    }
}