const express=require("express");
const app=express();
const cors=require("cors");
const port=3001;
const mongoose = require('mongoose');
const UserRegLogin = require("./model/usersRegLog");
//new
const path = require("path");
//multer path
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

//clodinary path
const cloudinary = require("./cloudinary"); // import your config
const streamifier = require("streamifier");

//ssl commerce
// const SSLCommerzPayment = require('sslcommerz-lts');
// require('dotenv').config();

// const store_id = process.env.STORE_ID;
// const store_passwd = process.env.STORE_PASSWORD;
// const is_live = process.env.IS_LIVE === 'true';
//end ssl commerce

const { Dish, Dessert, Drink } = require("./model/addFood");
const Reservation = require("./model/reservation");
const UserFeedback=require("./model/feedBack")

const UserRouter=require("./router/user");
const OrderDetails = require("./model/createOrder");
const order = require("./model/order");

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const connectDB=async()=>{
    try {
      await  mongoose.connect('mongodb+srv://masudhasansarker:masudhasansarker@cluster1.yfhwh0k.mongodb.net/OnRestaurent');
        console.log("Database is connected...");
    } catch (error) {
        console.log(error.message)
    }
}


app.use(UserRouter);
//registration data send to the database
// app.post("/register",async(req,res)=>{
//     try {
//         const{name,username,email,address,password}=req.body
//         const regResult=await UserRegLogin({
//             name,
//             username,
//             email,
//             address,
//             password
//         })
//         const userRegister=regResult.save();
//         if(userRegister){
//             res.status(201).send({
//                 status:true,
//                 message:"Data successfully added",
//                 regResult,
//             })
            
//         }else{
//             res.status(400).send({
//                 status:false,
//                 message:"Data insertion not success"
//             })
//         }

//     } catch (error) {
//         res.status(500).send(error.message);
        
//     }
// })

//admin page to get the user information (admin)

app.get("/customer",async(req,res)=>{
        try {
          await UserRegLogin.find()
        .then(data=>{
          res.send(data);
        })
        .catch(()=>{
          res.send("Data are not fetch successful");
        })
        } catch (error) {
          res.status(500).send("Data are not fetch ");
        }
})
//delete user to the database use (admin)

app.delete("/customer/:id",async(req,res)=>{
  try {
    const id=req.params.id;
    await UserRegLogin.deleteOne({_id:id})
    .then(()=>{
      res.send("User Successfully deleted !")
    })
    .catch(()=>{
      res.send("User not Deleted !");
    })
  } catch (error) {
    res.send(error.message);
  }
})
//Update the data in the customer information by (admin)

app.put('/customer/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { name, username, email, address, password } = req.body;
    const result = await UserRegLogin.updateOne(
      { _id: id },
      { $set: { name, username, email, address, password } }
    );

    console.log(result); // debug output to check what fields are available
    //.modifiedCount > 0 || result.nModified > 0
    if (result) {
      res.send('Customer updated successfully!');
    } else {
      res.send('No changes made (same values or user not found).');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//fetch the data use username for the cart page
app.get("/getUser/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const userData = await UserRegLogin.findOne({ username: username });  // ✅ QUERY not create
    if (userData) {
      res.send(userData);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Error happened: " + err.message);
  }
});
//send the order data to the mongodb server


app.post("/createOrder",async(req,res)=>{
  try {
    const {customerName,address,type,foodName,price,paymentMethod}=req.body
      const resultData= await OrderDetails({
          customerName,
          address,
          type,
          foodName,
          price,
          paymentMethod
      })
      const resData=resultData.save();
      if(resData){
        res.send("Data added Successfully");
      }else{
        res.send("Data not added Successfully");
      }
  } catch (error) {
    res.send(error.message);
  }
})
//get view order customer list  for admin
app.get("/createOrder",async(req,res)=>{
  try {
     await OrderDetails.find()
      .then(data=>{
        res.send(data);
      })
      .catch(()=>{
        res.send("Data not Fetch the database");
      })
      
  } catch (error) {
    res.send(error.message);
  }
})

//new updated order send to the database

app.post('/order', async (req, res) => {
  try {
    const { items, total, paymentMethod, date } = req.body;
    const newOrder = new order({ items, total, paymentMethod, date });
    await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save order' });
  }
});

//get the total order admin page

app.get('/order', async (req, res) => {
  try {
    await order.find()
    .then((data)=>{
      res.send(data);
    })
    .catch(()=>{
      res.send("Data fetch not complete");
    })
    
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to save order' });
  }
});
//Login data send to the database and respond the database

// app.post("/login",(req,res)=>{
//     try {
//         const {username,password}=req.body;
//     UserRegLogin.findOne({username:username})
//     .then(value=>{
//         if(value){
//             if(value.password===password){
//                 res.status(200).send("success");
//             }else{
//                 res.send("Password is wrong");
//             }
//         }else{
//             res.send("User name is not valid");
//         }
//     })
//     .catch(err=>{
//         res.status(500).send(err.message);
//     })
//     } catch (error) {
//       res.status(500).send(error.message);  
//     }
// })


//add food item from fronted by admin to send the data in the mongodb server(product)

// app.use("/uploads", express.static("uploads"));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}-${ext}`);
//   },
// });

// const upload = multer({ storage: storage });

app.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    let imageUrl = "";

    // Upload to Cloudinary from memory buffer
    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "products" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req);
      imageUrl = result.secure_url;
    }

    // Model selection
    let Model;
    switch (category) {
      case "dish":
        Model = Dish;
        break;
      case "dessert":
        Model = Dessert;
        break;
      case "drink":
        Model = Drink;
        break;
      default:
        return res.status(400).json({ message: "Invalid category" });
    }

    const product = new Model({ name, price, description, imageUrl });
    await product.save();

    res.status(201).json({ message: "Product saved", product });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//get the dissert food item from database to frontend(product)

app.get("/desserts",async(req,res)=>{
  try {
       await Dessert.find()
        .then(data=>{
          res.send(data);
        })  
        .then(err=>{
          res.send("Data fetch unsuccessful")
        })    
  } catch (error) {
    res.status(500).send("Reguest not successfull");
  }
})

//get the dish food item from database to frontend(product)

app.get("/dish",async(req,res)=>{
  try {
       await Dish.find()
        .then(data=>{
          res.send(data);
        })  
        .then(err=>{
          res.send("Data fetch unsuccessful")
        })    
  } catch (error) {
    res.status(500).send("Reguest not successfull");
  }
})
////get the drinks food item from database to frontend(product)
app.get("/drink",async(req,res)=>{
  try {
       await Drink.find()
        .then(data=>{
          res.send(data);
        })  
        .then(err=>{
          res.send("Data fetch unsuccessful")
        })    
  } catch (error) {
    res.status(500).send("Reguest not successfull");
  }
})
//Reservation schema (User)
// app.post("/reservation",async(req,res)=>{
//   try {
//       const {name,email,phone,date,time,guests,message}=req.body;
//      const reservation= await Reservation({
//         name,
//         email,
//         phone,
//         date,
//         time,
//         guests,
//         message
//       })
//     const resultReservation=reservation.save();
//     if(resultReservation){
//       res.status(200).send("Data send Successfull");
//     }else{
//       res.status(400).send("Data not send Successfull");
//     }
//   } catch (error) {
//     res.status(500).send("Respond fail");
//   }
// })
//get the data from database reservation admin

app.get("/reservation",async(req,res)=>{
    try {
      await Reservation.find()
      .then(data=>{
        res.send(data);
      })
      .catch(err=>{
        res.status(400).send(err.message);
      })
    } catch (error) {
      res.status(500).send(err.message);
    }
})

//reservation delete to the admin and send to request server(admin)

app.delete("/reservation/:id",(req,res)=>{
  try {
    const id=req.params.id
    Reservation.deleteOne({_id:id})
    .then(()=>{
      res.send("Reservation delete Successfully");
    })
    .catch(err=>{
      res.send("Reservation delete not Successfully")
    })
  } catch (error) {
    res.send("Reservation delete operation not happend")
  }

})

//post feedback value to the mongodb server (User)

// app.post("/feedback",async(req,res)=>{
//  try {
//   const{name,email,feedbackMessage}=req.body
//   const feedback=await UserFeedback({
//     name,
//     email,
//     feedbackMessage
//   })
//   const feedbackResult=feedback.save();
//   if(feedbackResult){
//     res.status(200).send("Successfully send the data");
//   }else{
//     res.status(400).send("Not successfully send the data");
//   }
//  } catch (error) {
//   res.status(500).send("post request Not work");
//  }
// })

//customer feedback get result to the database admin
app.get("/feedback",async(req,res)=>{
      try {
        await UserFeedback.find()
      .then(data=>{
        res.send(data);
      })
      .catch(err=>{
        res.send("Data fetch not complete");
      })
      } catch (error) {
        res.send("Data fetch not complete");
      }
})
//delete feedback by the (admin)
app.delete("/feedback/:id",async(req,res)=>{
  try {
    const id=req.params.id;
    await UserFeedback.deleteOne({_id:id})
    .then(()=>{
      res.send("Feedback delete successfully.");
    })
    .catch(()=>{
      res.send("Feedback not delete successful");
    })
  } catch (error) {
    res.send("Delete operation not happend");
  }
})
//database connection code

app.listen(port,async()=>{
    console.log(`Server is running at http://localhost:${port}`);
   await connectDB();
})