import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap,
} from "./SidebarElements";
import ReactDOM from "react-dom";

const Sidebar = ({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) => {
  const sidebarElement = document.getElementById("sidebar-hook");

  if (!sidebarElement) {
    console.error(
      'The element with id "sidebar-hook" was not found in the document.'
    );
    return null;
  }
  return ReactDOM.createPortal(
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink to="demo" onClick={toggle}>
            Demo
          </SidebarLink>
          <SidebarLink to="services" onClick={toggle}>
            Services
          </SidebarLink>
          <SidebarLink to="topics" onClick={toggle}>
            Topics
          </SidebarLink>
          <SidebarLink to="whyUs" onClick={toggle}>
            Why Us
          </SidebarLink>
          <SideBtnWrap>
            <SidebarRoute
              style={{
                background: "transparent",
                fontSize: "1.5rem",
                color: "#0779e4",
              }}
              to="/browse"
            >
              Browse
            </SidebarRoute>
          </SideBtnWrap>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to="/login">Log In</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>,
    sidebarElement
  );
};

export default Sidebar;
