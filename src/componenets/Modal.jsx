import { Box, Grid } from "@chakra-ui/react";
import React from "react";

export default function Modal(props) {
  return (
    <Grid placeItems={"center"} pos={"fixed"} h="100vh" inset={"0"}>
      <Box
        bg="rgba(0,0,0,.8)"
        pos={"absolute"}
        inset={"0"}
        onClick={() => props.setOpenModal({type: "", value: false})}
      ></Box>
      <Box zIndex={"3"} w="clamp(15rem, 70vw, 30rem)"
      px="6"
      py="4"
      bg={"white"}
      borderRadius={"1.5rem"} >{props.children}</Box>
    </Grid>
  );
}
