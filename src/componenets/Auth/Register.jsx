import {
  Box,
  Button,
  Checkbox,
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
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const initialDetails = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    profilePic: "",
    tel: "",
    registrationType: { buyer: false, farmer: false },
  };
  const [registerDetails, setRegisterDetails] = useState(initialDetails);
  // const registerDetailsRef = useRef(initialDetails);
  const [isLoading, setIsLoading] = useState(false);
  let profilePicURL = "";
  const toast = useToast();
  const navigate = useNavigate();
  const updateDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "registrationType") {
      setRegisterDetails({
        ...registerDetails,
        registrationType: {
          ...registerDetails.registrationType,
          [e.target.id]: e.target.checked,
        },
      });
    } else {
      setRegisterDetails({ ...registerDetails, [name]: value });
    }
  };
  const passwordCheck = () => {
    if (registerDetails.password !== registerDetails.cpassword) {
      toast({
        description: "Password Mismatch",
        status: "error",
        position: "top-right",
      });
      setRegisterDetails((details) => {
        return { ...details, cpassword: "" };
      });
      return false;
    }
    return true;
  };

  const uploadProfilePic = () => {
    const storage = getStorage(app);
    const file = registerDetails.profilePic;
    if (file === "") {
      alert("no file");
      return;
    }
    const profilePicRef = ref(storage, `/profilePics/${file}`);

    const uploadTask = uploadBytesResumable(profilePicRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },

      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          profilePicURL = downloadURL;
          console.log(downloadURL);
          setRegisterDetails({ ...registerDetails, profilePic: downloadURL });
        });
      }
    );
  };
  const register = (e) => {
    e.preventDefault();
    if (!passwordCheck()) return;
    setIsLoading(true);
    uploadProfilePic();
    const auth = getAuth(app);

    createUserWithEmailAndPassword(
      auth,
      registerDetails.email,
      registerDetails.password
    )
      .then(async ({ user }) => {
        const db = getFirestore();
        const userRef = await addDoc(collection(db, "users"), {
          ...registerDetails,
          [registerDetails.profilePic]: profilePicURL,
          uid: user.uid,
        });
        if (userRef.id) {
          navigate("/user");
          toast({
            description: "Registration Successful",
            status: "success",
          });
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use")
          toast({
            description: "This email has an account",
            status: "error",
          });
        setIsLoading(false);
      });
  };
  return (
    <>
      <Heading as={"h3"} mb="4" textAlign={"center"}>
        Register
      </Heading>
      <form onSubmit={register}>
        <Flex
          px="4"
          flexWrap={"wrap"}
          overflowY={"auto"}
          maxH={"min(30rem, 60vh)"}
        >
          <FormControl mb={"4"}>
            <FormLabel htmlFor="fname">First Name</FormLabel>
            <Input
              type="text"
              name="fname"
              id="fname"
              onChange={updateDetails}
              required
              // value={registerDetailsRef.current.fname}
            ></Input>
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="lname">Last Name</FormLabel>
            <Input
              type="text"
              name="lname"
              id="lname"
              onChange={updateDetails}
              required
              // value={registerDetailsRef.current.lname}
            ></Input>
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              onChange={updateDetails}
              required
              // value={registerDetailsRef.current.email}
            ></Input>
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="tel">Phone Number</FormLabel>
            <Input
              type="tel"
              name="tel"
              id="tel"
              onChange={updateDetails}
              required
              // value={registerDetailsRef.current.tel}
            ></Input>
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={updateDetails}
              required
              // value={registerDetailsRef.current.password}
            ></Input>
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <Input
              type="password"
              name="cpassword"
              id="cpassword"
              onChange={updateDetails}
              required
              // value={registerDetailsRef.current.cpassword}
            ></Input>
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="profilePic">Profile Picture</FormLabel>
            <Input
              type="file"
              name="profilePic"
              id="profilePic"
              onChange={updateDetails}
              required
              // value={registerDetailsRef.current.profilepic}
            ></Input>
          </FormControl>
          <FormControl mb="4">
            <FormLabel htmlFor="registrationType">Register as:</FormLabel>
            <Checkbox
              name="registrationType"
              id="farmer"
              mr={"4"}
              onChange={updateDetails}
            >
              Farmer
            </Checkbox>
            <Checkbox
              name="registrationType"
              id="buyer"
              onChange={updateDetails}
            >
              Buyer
            </Checkbox>
          </FormControl>
          <Flex
            flexWrap={"wrap"}
            gap={"2"}
            w="full"
            justifyContent={{ base: "center", md: "space-between" }}
            alignItems={"center"}
            mt={"4"}
          >
            <Text>Already have an account</Text>
            <Button
              type="submit"
              _disabled={{ opacity: 0.7 }}
              disabled={isLoading}
            >
              {isLoading && <Spinner mr={"2"} />} Register
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
}
