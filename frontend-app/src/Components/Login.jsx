import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "./AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
//   const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const registerUser = async (data) => {
    try {
      let res = await axios.post(
        "http://localhost:8080/user/login",
        data
      );
      return res;
    } catch (err) {
      return err;
    }
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    registerUser(formData).then((res) => {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      if (res.status === 201) {
        toast({
          title: "Login Success!!",
          description: res.data,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        localStorage.setItem("useremail", formData.email);
        // handleLogin();
        navigate("/profile");
      } else {
        toast({
          title: "ERROR",
          description: res.data,
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        if (res.data === "User is not registered !!") {
          navigate("/signup");
        }
      }
    });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  return (
    <>
      <Flex
        minH={"80vh"}
        align={"center"}
        bg={"red.50"}
        mt={0}
        justify={"center"}
      >
        <Stack spacing={8} mx={"auto"} mt={0} maxW={"lg"} py={2} px={1}>
          <Heading fontSize={"4xl"}>Log In User</Heading>
          <Stack align={"center"}></Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"xl"} p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  bg={"pink.200"}
                  color={"white"}
                  _hover={{
                    bg: "pink.500",
                  }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Login
                </Button>
                
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;