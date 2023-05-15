import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../landingpage/Navbar";
import Auth from "../Auth";
import ProductCard from "../ProductCard";
import products from "../../dummyapi";

export default function LandingPage() {
  return (
    <>
      <Container
        maxW={"75rem"}
        mx={"auto"}
        py="3rem"
        // color={"white"}
      >
        <Flex gap={"1.5rem"} flexWrap={"wrap"}>
          {products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </Flex>
      </Container>
      {/* <Auth is_new_user={false}/> */}
    </>
  );
}
