import React, { useState } from "react";
import BrowseSidebar from "./BrowseSidebar";
import BrowseNavbar from "./BrowseNavbar";

const MainNavigation = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <BrowseSidebar isOpen={isOpen} toggle={toggle} />
      <BrowseNavbar toggle={toggle} />
    </React.Fragment>
  );
};

export default MainNavigation;
