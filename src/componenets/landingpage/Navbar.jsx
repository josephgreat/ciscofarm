import {
  Box,
  Flex,
  Heading,
  Link,
  HStack,
  Button,
  Container,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";

export default function Navbar({setOpenModal, setAuthType}) {
  const displayModal = (authType) => {
    setAuthType(authType)
    setOpenModal(true);
  }
  return (
    <Container maxW={"unset"} bg={"brand.100"} color={"rgba(255,255,255,.7)"}>
      <HStack
        justifyContent={"space-between"}
        as={"nav"}
        maxW={"75rem"}
        mx={"auto"}
        py="2"
      >
        <Heading
          as="h3"
          fontFamily={"'Leyton', sans-serif"}
          fontSize={"clamp(1rem, 5vw, 1.5rem)"}
        >
          CISCO FARM
        </Heading>
        <Flex
          flex={".5"}
          ml={"auto"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Button
            variant={"ghost"}
            _hover={{ bg: "transparent", transform: "scale(1.05)" }}
            onClick={() => displayModal('login')}
          >
            Login
          </Button>
          <Button
            variant={"ghost"}
            _hover={{ bg: "transparent", transform: "scale(1.05)" }}
            onClick={() => displayModal('register')}
          >
            Register
          </Button>
          <Link as={NavLink} to="/">
            Cart
          </Link>
        </Flex>
        {/* <Button flexDir={'column'} p={'0'} h='auto' minW='auto' _hover={{bg: 'transparent', transform: 'scale(1.1)', border: 'none'}}>
        <Box as='span' w='1rem' h='.2rem' bg={'black'} mb={'.2rem'} borderRadius={'1rem'}></Box>
        <Box as='span' w='1rem' h='.2rem' bg={'black'} borderRadius={'1rem'}></Box>
      </Button> */}
      </HStack>
    </Container>
  );
}
