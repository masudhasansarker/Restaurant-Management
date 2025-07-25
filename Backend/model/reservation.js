const mongoose = require("mongoose");

const ReservationSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    date:String,
    time:String,
    guests:String,
    message:String
})

const Reservation=mongoose.model("reservation",ReservationSchema);
module.exports=Reservation;