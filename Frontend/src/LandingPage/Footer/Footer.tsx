import {
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import {
  FooterWrapper,
  FooterContainer,
  FooterSocialIconLink,
  FooterSocialIcons,
  FooterWebsiteRights,
  FooterSocialMedia,
  FooterSocialMediaWrapper,
  FooterSocialLogo,
} from "./FooterElements";
import { animateScroll as scroll } from "react-scroll";

const Footer = () => {
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterSocialMedia>
          <FooterSocialMediaWrapper>
            <FooterSocialLogo
              to="/"
              className="footer-social-logo"
              onClick={toggleHome}
            >
              AskMe
            </FooterSocialLogo>
            <FooterWebsiteRights>
              AskMe © {new Date().getFullYear()} All rights reserved.
            </FooterWebsiteRights>
            <FooterSocialIcons>
              <FooterSocialIconLink>
                <FaFacebook />
              </FooterSocialIconLink>
              <FooterSocialIconLink>
                <FaInstagram />
              </FooterSocialIconLink>
              <FooterSocialIconLink>
                <FaYoutube />
              </FooterSocialIconLink>
              <FooterSocialIconLink>
                <FaTwitter />
              </FooterSocialIconLink>
              <FooterSocialIconLink>
                <FaLinkedin />
              </FooterSocialIconLink>
            </FooterSocialIcons>
          </FooterSocialMediaWrapper>
        </FooterSocialMedia>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;
