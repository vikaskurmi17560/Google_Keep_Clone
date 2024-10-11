const express=require("express");
const app=express();
const cors =require("cors")
const user_router=require("./router/user.router");
const todo_router=require("./router/todo.router");
app.use(express.json());
app.use(cors());
app.use('/user',user_router);
app.use("/todo",todo_router);

module.exports=app;