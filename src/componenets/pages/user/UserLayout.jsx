import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import SideNav from "../../SideNav";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <Grid gridTemplateColumns={"clamp(15rem, 20vw, 25rem) 1fr"}>
      <SideNav />
      <Box as="main">
        <Outlet />
      </Box>
    </Grid>
  );
}