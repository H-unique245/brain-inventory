import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import Home from "../Pages/Home";
import socketIO from 'socket.io-client';
import ChatPage from "../Components/ChatPage";
import PrivateRoute from "./PrivateRoute";
const socket = socketIO.connect('http://localhost:8080');

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={
      <PrivateRoute><ChatPage socket={socket} /> </PrivateRoute>} />
      
      
    </Routes>
  );
}

export default AllRoutes;