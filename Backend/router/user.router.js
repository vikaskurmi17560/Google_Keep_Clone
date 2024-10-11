const express=require("express");
const router=express.Router();
const {get_user,create_user,update_user}=require("../controller/user.controller")

router.post('/create',create_user);
router.post('/get',get_user);
router.post('/update',update_user);

module.exports=router;
