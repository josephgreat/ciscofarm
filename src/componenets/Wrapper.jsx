import React, { useState } from "react";
import Navbar from "./landingpage/Navbar";
import Modal from "./Modal";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Outlet } from "react-router-dom";

export default function Wrapper() {
  const [openModal, setOpenModal] = useState({type: "", value: false});
  return (
    <>
      <Navbar setOpenModal={setOpenModal} setAuthType={openModal.type} />
      <Outlet />
      {openModal.value && (
        <Modal setOpenModal={setOpenModal} openModal={openModal}>
          {openModal.type === 'login' ? <Login/> : <Register />}
        </Modal>
      )}
    </>
  );
}
