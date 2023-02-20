import {
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
  export default function Signup() {
    const toast = useToast();
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone:"",
      password: "",
    });
    const navigate = useNavigate();
  
    const registerUser = async (data) => {
      try {
        let res = await axios.post(
          "http://localhost:8080/user/register",
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
          phone:"",
          password: "",
        });
        if (res.status === 201) {
          toast({
            title: "Account created !!",
            description: res.data,
            position: "top",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          navigate("/login");
        } else {
          toast({
            title: "ERROR",
            description: res.data,
            status: "warning",
            duration: 2000,
            isClosable: true,
          });
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
          border="1px solid red"
          align={"center"}
          justify={"center"}
          m={"auto"}
          bg="gray.50"
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            mt={0}
            bg={"white"}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Rgister User
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl id="password" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  value={formData.name}
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="sample@email.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  placeholder="Enter Phone number"
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                  value={formData.phone}
                  name="phone"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="password"
                  _placeholder={{ color: "gray.500" }}
                  type="password"
                  value={formData.password}
                  name="password"
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <Input
                bg={"blue.400"}
                color={"white"}
                w="full"
                mt={2}
                _hover={{
                  bg: "blue.500",
                }}
                type="submit"
                value={"Register"}
              />
            </form>
          </Stack>
        </Flex>
      </>
    );
  }