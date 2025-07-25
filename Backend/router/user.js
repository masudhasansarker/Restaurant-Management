const express=require("express");
const router=express.Router();
//const UserRegLogin = require("../model/usersRegLog");
const { UsersRegister, UsersLogin, UserReservation, UserFeedbackCon, } = require("../controller/users");

//all the router for the user
router.post("/register",UsersRegister);
//login
router.post("/login",UsersLogin);

//user reservation

router.post("/reservation",UserReservation);

//user feedback
router.post("/feedback",UserFeedbackCon)



module.exports=router;