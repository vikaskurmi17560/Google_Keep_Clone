const express=require('express');
const router=express.Router();
const {create_todo,get_todo,update_todo,delete_todo}=require('../controller/todo.controller');
router.get("/get",get_todo);
router.post("/create",create_todo);
router.post("/update",update_todo);
router.post("/delete",delete_todo);
module.exports=router;