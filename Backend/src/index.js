const express = require("express");
const mongoose= require("mongoose");
const cors= require("cors");
const UserModel = require("../models/user.model");
const { Connection } = require("../config/connection");
require("../config/connection")
const PORT= process.env.PORT;
// mongoose.set('strictQuery', false);

const app= express();
app.use(express.json());
app.use(cors());

// home route 
app.get("/", (req,res)=>{
    res.send("Welcome to Brain-Inventory Backend application")
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