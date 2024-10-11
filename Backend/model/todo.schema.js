const mongoose=require("mongoose");
const todo_schema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    labels:{
        type:[String],
        default:[]
    },
    background_color:{
        type:String
    },
    pinned:{
        type:Boolean,
        default:false
    },
    completed:{
        type:Boolean,
        default:false
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
},{
    timestamps: true, // creates createdAt and updatedAt fields automatically
})
const todo = mongoose.model('todo', todo_schema)
module.exports=todo;