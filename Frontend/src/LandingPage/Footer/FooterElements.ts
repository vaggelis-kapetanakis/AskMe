import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.div`
  background: #000;
`;

export const FooterWrapper = styled.div`
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);
`;

export const FooterSocialMedia = styled.section`
  max-width: 1000px;
  width: 100%;
`;

export const FooterSocialMediaWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 40px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const FooterSocialLogo = styled(Link)`
  color: #fff;
  justify-self: start;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const FooterWebsiteRights = styled.div`
  color: #fff;
  margin-bottom: 16px;
`;

export const FooterSocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
`;

export const FooterSocialIconLink = styled.div`
  color: #fff;
  font-size: 24px;

  &:hover {
    transform: scale(1.58);
    transition: all 0.5s ease-in-out;
    cursor: pointer;
  }
`;
