const express = require("express");
const UserModel = require("../models/user.model");
const passport = require("../config/google_passport");

const user = express.Router();

// register
user.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  let validUser = await UserModel.findOne({ email });

  if (validUser) {
    res.status(200).send("User is already registered with this Email!!");
  }
  try {
    let User = await new UserModel({ name, email, phone, password });
    User.save();
    res.status(201).send("User is registered Succesfully !! ");
  } catch (err) {
    console.log(err);
    res.send("Something went Wrong !!");
  }
});
// login
user.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let validUser = await UserModel.findOne({ email });

  if (!validUser) {
    res.send("User is not registered !!");
  } else if (validUser && validUser.password !== password) {
    res.send("Wrong Password, Chek credentials!!");
  } else {
    res.status(201).send("User Logged in Successfully!!");
  }
});

// get all users list
// getProfile
user.get("/userList", async (req, res) => {
  const { email } = req.params;
  console.log(email);
  let UserList = await UserModel.find();
  // console.log(UserList)
  if (UserList) {
    res.status(200).send(UserList);
  } else {
    res.send("User not Found");
  }
});
//**********************google authentication***************************** */
// here google authentication routes from passport js

user.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

user.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user);
    // res.redirect('/');
    res.send("User success");
  }
);
//***************************************************** */

module.exports = user;
