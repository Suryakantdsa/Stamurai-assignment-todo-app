import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide title"]
    },
    description:{
        type:String,
        required:[true,"please write some desc"]
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    isInprogress:{
        type:Boolean,
        default:false
    },
    isTodo:{
        type:Boolean,
        default:true
    }

})


const todo=mongoose.models.todos||mongoose.model("todos",todoSchema)

export default todo;