import React from 'react'
import {Button, Text, VStack} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate= useNavigate();
  function handlechat(){
    navigate("/chat")
  }
  return (
    <VStack gap={'5rem'}>
      <Text>Welcome to chat</Text>
      <Button onClick={handlechat }>Start Chat</Button>
    </VStack>
  )
}

export default Home

// user sign -> login
// login- > home === create chat -- userlist