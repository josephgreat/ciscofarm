import { Router, RouterProvider, createBrowserRouter, useParams } from "react-router-dom";
import "./App.css";
import LandingPage from "./componenets/pages/LandingPage";
import { createContext, useState } from "react";
import { AppContext } from "./main";
import ProductDescription from "./componenets/pages/ProductDescription";
import Navbar from "./componenets/landingpage/Navbar";
import Wrapper from "./componenets/Wrapper";
import { getAuth } from "firebase/auth";
import app from "./firebase";
import { useToast } from "@chakra-ui/react";
import Dashboard from "./componenets/pages/user/Dashboard";
import UserLayout from "./componenets/pages/user/UserLayout";

function App() {
  const auth = getAuth(app);
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper/>,
      children: [
        {path: '/', element: <LandingPage/>},
        {
          path: "product_description",
          element: <ProductDescription />,
        },
      ]
    },
    {
      path: "user",
      element: <UserLayout/>,
      children: [
        {index: true, element: <Dashboard/>}
      ]
    },
  ]);
  const [productSelected, setProductSelected] = useState([]);
  const uid = useParams();
  const toast = useToast();
  // auth.onAuthStateChanged(user => {
  //   if (user) uid = user.uid;
  // })
  return (
    <>

      <AppContext.Provider value={{ productSelected, setProductSelected, toast }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </>
  );
}

export default App;
