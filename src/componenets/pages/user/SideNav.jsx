import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Link,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "./UserLayout";
export default function SideNav() {
  let { setCurrentTitle, openNav, setOpenNav } = useContext(UserContext);

  return (
    <VStack
      as="nav"
      h={"100vh"}
      justifyContent={"space-between"}
      w={"clamp(12rem, 60vw, 17rem)"}
      py="2rem"
      bg="brand.100"
      color={"#fff"}
      pos={{ base: "fixed", md: "relative" }}
      left={openNav ? "0" : "-50rem"}
      zIndex={"3"}
      transition={"all .3s ease"}
    >
      <CloseButton
        onClick={() => setOpenNav(!openNav)}
        pos="absolute"
        top="2"
        right="2"
        display={{ base: "block", md: "none" }}
      />
      <Box>
        <Heading>Cisco Farm</Heading>
      </Box>
      <VStack justifyContent={"flex-start"} gap={"4"} textAlign={"left"}>
        <Link
          as={NavLink}
          onClick={() => {
            setCurrentTitle("Dashboard");
            window.innerWidth < 768 && setOpenNav(!openNav);
          }}
          to={"/user"}
        >
          Overview
        </Link>
        <Link
          as={NavLink}
          onClick={() => {
            setCurrentTitle("Cart");
            window.innerWidth < 768 && setOpenNav(!openNav);
          }}
          to={"/user/cart"}
        >
          My Cart
        </Link>
        <Link
          as={NavLink}
          onClick={() => {
            setCurrentTitle("Products");
            window.innerWidth < 768 && setOpenNav(!openNav);
          }}
          to={"/user/products"}
        >
          My Products
        </Link>
      </VStack>
      <VStack justifyContent={"flex-start"} gap={"4"}>
        <Link as={NavLink}>Settings</Link>
        <Link>Log Out</Link>
      </VStack>
    </VStack>
  );
}
