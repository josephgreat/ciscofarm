import React, { useState } from "react";
import Navbar from "./landingpage/Navbar";
import Modal from "./Modal";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import { Outlet } from "react-router-dom";

export default function Wrapper() {
  const [openModal, setOpenModal] = useState(false);
  const [authType, setAuthType] = useState('');
  return (
    <>
      <Navbar setOpenModal={setOpenModal} setAuthType={setAuthType} />
      <Outlet />
      {openModal && (
        <Modal setOpenModal={setOpenModal}>
          {authType === 'login' ? <Login/> : <Register />}
        </Modal>
      )}
    </>
  );
}
