const express = require("express");
const UserModel = require("../models/user.model");

const user = express.Router();

// register
user.post("/register",async (req,res)=>{
    const {name,email,phone, password} = req.body;
     let validUser= await UserModel.findOne({email});
   
     if(validUser){
       res.status(200).send("User is already registered with this Email!!");
     }
     try{
        let User=  await new UserModel({name,email,phone,password});
        User.save();
        res.status(201).send("User is registered Succesfully !! ")
     }
     catch(err){
       console.log(err)
       res.send("Something went Wrong !!")
     }
   
   })
   // login
   user.post("/login",async (req,res)=>{
       const {email, password} = req.body;
        let validUser= await UserModel.findOne({email});
      
        if(!validUser){
           res.send("User is not registered !!")
       }
       else if(validUser && validUser.password !== password){
           res.send("Wrong Password, Chek credentials!!")
       }
       else {
           res.status(201).send("User Logged in Successfully!!");
       }
      })



module.exports= user;