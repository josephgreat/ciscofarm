import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserLayout";

export default function TopNav({ userDetails }) {
  let [user, setuser] = useState({});
  let { currentTitle, setOpenNav } = useContext(UserContext);
  useEffect(() => {
    setuser(userDetails);
  }, [userDetails]);
  return (
    <Flex as={"header"} alignItems={"center"} justifyContent={"space-between"}>
      <Flex alignItems={"center"} gap={"2"}>
        <Flex
          onClick={() => setOpenNav(true)}
          gap={"1"}
          flexDir={"column"}
          display={{ base: "flex", md: "none" }}
        >
          <Box as="span" w="5" borderRadius={"3xl"} h="1" bg="brand.100"></Box>
          <Box as="span" w="5" borderRadius={"3xl"} h="1" bg="brand.100"></Box>
        </Flex>
        <Heading>{currentTitle}</Heading>
      </Flex>
      <Box>
        <Text>👋 Hi {user && user.fname}</Text>
      </Box>
    </Flex>
  );
}
