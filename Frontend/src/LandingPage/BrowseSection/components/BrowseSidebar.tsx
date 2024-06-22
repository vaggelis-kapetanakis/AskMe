import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarWrapper,
  SidebarRoute,
  SidebarMenu,
  SideBtnWrap,
} from "../../Sidebar/SidebarElements";
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
      'The element with id "loading-spinner" was not found in the document.'
    );
    return null;
  }

  return ReactDOM.createPortal(
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        {" "}
        <SidebarMenu>
          <SideBtnWrap>
            <SidebarRoute style={{ background: "transparent" }} to="/">
              Home
            </SidebarRoute>
          </SideBtnWrap>
          <SideBtnWrap>
            <SidebarRoute
              style={{ background: "transparent", color: "#0779e4" }}
              to="/login"
            >
              Log In
            </SidebarRoute>
          </SideBtnWrap>
        </SidebarMenu>
      </SidebarWrapper>
    </SidebarContainer>,
    sidebarElement
  );
};

export default Sidebar;
