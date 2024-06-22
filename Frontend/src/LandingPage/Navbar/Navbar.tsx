import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";
import { animateScroll as scroll } from "react-scroll";

const Navbar = ({ toggle }: { toggle: () => void }) => {
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
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              AskMe
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks
                  to="demo"
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  Demo
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="services"
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  Services
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="topics"
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  Topics
                </NavLinks>
              </NavItem>

              <NavItem>
                <NavLinks
                  to="whyUs"
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                >
                  Why Us
                </NavLinks>
              </NavItem>
              <NavBtn>
                <NavBtnLink
                  to="/browse"
                  id="browse"
                  style={{ background: "transparent", color: "#0779e4" }}
                >
                  Browse
                </NavBtnLink>
              </NavBtn>
            </NavMenu>
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

export default Navbar;
