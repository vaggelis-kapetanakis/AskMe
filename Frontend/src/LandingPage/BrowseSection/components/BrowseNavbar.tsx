import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "../../Navbar/NavbarElements";
import { animateScroll as scroll } from "react-scroll";

const BrowseNavbar = ({ toggle }: { toggle: () => void }) => {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav
          scrollNav={scrollNav}
          style={{ background: "transparent", width: "100vw" }}
        >
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              AskMe
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu></NavMenu>
            <NavBtn>
              <NavBtnLink to="/login" id="logIn">
                Log In
              </NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
};

export default BrowseNavbar;
