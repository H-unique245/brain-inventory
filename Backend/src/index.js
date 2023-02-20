const express = require("express");
const cors= require("cors");
const UserModel = require("../models/user.model");
const UserRoute = require("../routes/user.routes");

const { Connection } = require("../config/connection");
// const dotenv = require("dotenv");

require("../config/connection")
const PORT= process.env.PORT;
// mongoose.set('strictQuery', false);

const app= express();
app.use(express.json());
app.use(cors());

app.use('/user', UserRoute);
// home route 
app.get("/", (req,res)=>{
    res.send("Welcome to Brain-Inventory Backend application")
})


  

   // getProfile
   app.get("/profile/:email",async (req,res)=>{
       const {email} = req.params;
       console.log(email);
       let validUser= await UserModel.findOne({email});
       console.log(validUser)
       if(validUser){
           res.status(200).send(validUser);
       }
       else{
           res.send("User not Found")
       }
   })
 

app.listen(PORT, async () => {
    try {
      await Connection;
      console.log("connected to db successfully");
    } catch (err) {
      console.log("Error:connecting error");
      console.log(err);
    }
  
    console.log(`Server is started at http://localhost:${PORT}`);
  });