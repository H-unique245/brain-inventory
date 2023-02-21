const express = require("express");
const cors= require("cors");
const UserModel = require("../models/user.model");
const UserRoute = require("../routes/user.route");
const { Connection } = require("../config/connection");
const Message = require("../models/message.model");
// const dotenv = require("dotenv");

require("../config/connection")
const PORT= process.env.PORT;
// mongoose.set('strictQuery', false);

const app= express();
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"//3000
  }
});
app.use(express.json());
app.use(cors());

app.use('/user', UserRoute);

//socket connection
socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
   //sends the message to all the users on the server
    //sends the message to all the users on the server
  socket.on('message', (data) => {
    let saveMessage= new Message(data);
    saveMessage.save();
    socketIO.emit('messageResponse', data);
  });
  
  socket.on('dissconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

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
 

http.listen(PORT, async () => {
    try {
      await Connection;
      console.log("connected to db successfully");
    } catch (err) {
      console.log("Error:connecting error");
      console.log(err);
    }
  
    console.log(`Server is started at http://localhost:${PORT}`);
  });