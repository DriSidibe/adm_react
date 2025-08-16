// src/components/context/NavbarContext.js
import { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [canShowNavbar, setCanShowNavbar] = useState(true);

  return (
    <NavbarContext.Provider value={{ canShowNavbar, setCanShowNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};
