const express=require("express");
const router=express.Router();
const {login,signup,forgot}=require("../controller/user.controller")

router.post('/signup',signup);
router.post('/login',login);
router.post('/forgot',forgot);

module.exports=router;
