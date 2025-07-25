const UserFeedback = require("../model/feedBack");
const Reservation = require("../model/reservation");
const UserRegLogin = require("../model/usersRegLog");

//user Registration page
const UsersRegister=async(req,res)=>{
    try {
        const{name,username,email,address,password}=req.body
        const regResult=await UserRegLogin({
            name,
            username,
            email,
            address,
            password
        })
        const userRegister=regResult.save();
        if(userRegister){
            res.status(201).send({
                status:true,
                message:"Data successfully added",
                regResult,
            })
            
        }else{
            res.status(400).send({
                status:false,
                message:"Data insertion not success"
            })
        }

    } catch (error) {
        res.status(500).send(error.message);
        
    }
}
//User Login controller
const UsersLogin=(req,res)=>{
    try {
        const {username,password}=req.body;
    UserRegLogin.findOne({username:username})
    .then(value=>{
        if(value){
            if(value.password===password){
                res.status(200).send("success");
            }else{
                res.send("Password is wrong");
            }
        }else{
            res.send("User name is not valid");
        }
    })
    .catch(err=>{
        res.status(500).send(err.message);
    })
    } catch (error) {
      res.status(500).send(error.message);  
    }
}
//user reservation controller
const UserReservation=async(req,res)=>{
    try {
        const {name,email,phone,date,time,guests,message}=req.body;
       const reservation= await Reservation({
          name,
          email,
          phone,
          date,
          time,
          guests,
          message
        })
      const resultReservation=reservation.save();
      if(resultReservation){
        res.status(200).send("Data send Successfull");
      }else{
        res.status(400).send("Data not send Successfull");
      }
    } catch (error) {
      res.status(500).send("Respond fail");
    }
  }

  //user Feedback controller

  const UserFeedbackCon=async(req,res)=>{
    try {
     const{name,email,feedbackMessage}=req.body
     const feedback=await UserFeedback({
       name,
       email,
       feedbackMessage
     })
     const feedbackResult=feedback.save();
     if(feedbackResult){
       res.status(200).send("Successfully send the data");
     }else{
       res.status(400).send("Not successfully send the data");
     }
    } catch (error) {
     res.status(500).send("post request Not work");
    }
   }

module.exports={UsersRegister,UsersLogin,UserReservation,UserFeedbackCon};