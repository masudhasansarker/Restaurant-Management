const mongoose = require("mongoose");

const FeedbackSchema=new mongoose.Schema({
    name:String,
    email:String,
    feedbackMessage:String
    
})

const UserFeedback=mongoose.model("feedback",FeedbackSchema);
module.exports=UserFeedback;