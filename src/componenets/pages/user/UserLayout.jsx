import { Box, Flex, Grid } from "@chakra-ui/react";
import React, { createContext, useEffect, useState } from "react";
import SideNav from "./SideNav";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../../firebase";
import TopNav from "./TopNav";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Modal from "../../Modal";
import { NewProduct } from "./Products";

export const UserContext = createContext();

export default function UserLayout() {
  const auth = getAuth(app);
  const [userDetails, setUserDetails] = useState({});
  const [currentTitle, setCurrentTitle] = useState("Dashboard");
  const [openModal, setOpenModal] = useState({ type: "", value: false });
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(
    window.innerWidth < 768 ? false : true
  );
  window.addEventListener("resize", () => {
    setOpenNav(window.innerWidth < 768 ? false : true);
  });
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const db = getFirestore();
      const queryRefs = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );
      const currentUsers = await getDocs(queryRefs);
      currentUsers.forEach((currentUser) => {
        if (currentUser.exists()) {
          setUserDetails(currentUser.data());
        }
      });
    } else navigate("/");
  });

  return (
    <Flex justifyContent="space-between">
      <Box
        pos={"fixed"}
        zIndex={"2"}
        onClick={() => setOpenNav(!openNav)}
        display={{ base: openNav ? "block" : "none", md: "none" }}
        inset={"0"}
        bg="rgba(0,0,0,.7)"
      ></Box>
      <UserContext.Provider
        value={{
          userDetails,
          currentTitle,
          setCurrentTitle,
          openModal,
          setOpenModal,
          openNav,
          setOpenNav,
        }}
      >
        <SideNav />
        <Box
          as="main"
          py={"clamp(1rem, 5vw, 2.5rem)"}
          px={"clamp(1rem, 5vw, 2.5rem)"}
          h="100vh"
          overflowY={"auto"}
          flex={"1"}
        >
          <TopNav userDetails={userDetails} />
          <Outlet />
        </Box>
        {openModal.value && (
          <Modal setOpenModal={setOpenModal} openModal={openModal}>
            <NewProduct />
          </Modal>
        )}
      </UserContext.Provider>
    </Flex>
  );
}
