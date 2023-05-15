import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const colors = {
  brand: {
    128: "rgba(0, 128,0,1)",
    256: "green",
    100: "rgba(14, 28, 14, 1)",
  },
};
export const AppContext = createContext();

const theme = extendTheme({ colors });
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider
      theme={theme}
      toastOptions={{
        position: "top-left",
        duration: 2000,
        variant: "left-accent",
      }}
    >
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
