const mongoose = require("mongoose");


const OrderSchema=mongoose.Schema({
    customerName:String,
    address:String,
    type:String,
    foodName: String,
    price:String,
    paymentMethod:String,
    createdAt:{
        type: String,
        default: () => new Date().toISOString().split('T')[0]  // "YYYY-MM-DD"
      } 
      
    
})
const OrderDetails=new mongoose.model("orderInformation",OrderSchema);

module.exports=OrderDetails;