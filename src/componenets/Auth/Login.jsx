import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import app from "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AppContext } from "../../main";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const auth = getAuth(app);
  const toast = useToast();
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false)
  const updateLoginDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  };
  // const error = useState({email: '', password: ''})
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password)
      .then((userCredentials) => {
        // userCredentials.user.email;\
    setIsLoading(false);

        toast({
          title: "Welcome Back",
          description: "Let's contine the exchange",
          status: "success",
        });
        navigate("/user");
      })
      .catch((err) => {
        console.log(err);
    setIsLoading(false);

        switch (err.code) {
          case "auth/missing-email":
            toast({
              description: "Email not found",
              status: "error",
            });
            break;
          case "auth/wrong-password":
            toast({
              description: "Incorret Password",
              status: "error",
            });
            break;
          case "auth/network-request-failed":
            toast({
              description: "Failed to connect",
              status: "error",
            });
            break;

          default:
            break;
        }
      });
  };
  return (
    <Box
      bg={"white"}
      w="clamp(15rem, 60vw, 25rem)"
      px="10"
      py="4"
      borderRadius={"1.5rem"}
    >
      <Heading as={"h3"} mb="4" textAlign={"center"}>
        Log In
      </Heading>
      <form onSubmit={login}>
        <FormControl mb={"4"}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            required
            name="email"
            id="email"
            onChange={updateLoginDetails}
          ></Input>
        </FormControl>
        <FormControl mb={"4"}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            required
            name="password"
            id="password"
            onChange={updateLoginDetails}
          ></Input>
        </FormControl>
        <Flex
          flexWrap={"wrap"}
          gap={"2"}
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems={"center"}
        >
          <Text>Don't have an account?</Text>
          <Button type="submit" _disabled={{opacity: .7}} disabled={isLoading}>{isLoading && <Spinner mr={"2"} /> } Login</Button>
        </Flex>
      </form>
    </Box>
  );
}
