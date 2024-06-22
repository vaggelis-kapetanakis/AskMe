import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "./Navbar";

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
    </React.Fragment>
  );
};

export default MainNavigation;
