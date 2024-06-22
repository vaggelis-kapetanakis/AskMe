import styled from "styled-components";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";

export const HeroContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 1000px;
  position: relative;
  z-index: 1;

  @media screen and (max-width: 1280px) {
    height: 850px;
    padding-top: 65px;
  }

  @media screen and (max-width: 768px) {
    height: 850px;
    padding-top: 65px;
  }
`;

export const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  opacity: 0.75;
`;

export const HeroWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 960px;
  width: 100vw;
  max-width: 1400px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center !important;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const HeroRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center !important;
  grid-template-areas: "col1 col2";

  @media screen and (max-width: 1080px) {
    grid-template-areas: "col1" "col2";
  }

  @media screen and (max-width: 768px) {
    grid-template-areas: "col1" "col2";
    width: 100%;
  }
`;

export const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;

  @media screen and (max-width: 1280px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 100px;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 100px;
  }

  @media screen and (max-width: 480px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    width: 100vw;
    margin-left: 0px;
    padding-left: 30px;
  }
`;

export const Column2 = styled.div`
  margin-bottom: 15px;
  padding-left: 35px;
  grid-area: col2;

  @media screen and (max-width: 1280px) {
    width: 90%;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
  }

  @media screen and (max-width: 480px) {
    width: 90vw;
    margin-left: 0px;
    padding-left: 10px;
  }
`;

export const ImgBg = styled.image`
  width: 100%;
  height: 100%;
`;

export const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: left;
  left: 0;
  top: 0;
  margin-left: 250px;
  margin-top: 250px;

  @media screen and (max-width: 1280px) {
    margin-left: 50px;
    margin-top: 250px;
  }

  @media screen and (max-width: 768px) {
    margin-left: 50px;
    margin-top: 250px;
  }
`;

export const HeroH1 = styled.h1`
  display: block;
  width: fit-content;
  font-size: 4rem;
  position: relative;
  color: transparent;
  animation: text_reveal 0.5s ease forwards;
  animation-delay: 1s;

  @keyframes text_reveal {
    100% {
      color: #0779e4;
    }
  }

  @media screen and (max-width: 1280px) {
    font-size: 3rem;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const HeroH2 = styled.h2`
  display: block;
  width: fit-content;
  font-size: 4rem;
  position: relative;
  color: transparent;
  animation: text_reveal_name 0.5s ease forwards;
  animation-delay: 2s;

  @keyframes text_reveal_name {
    100% {
      color: #fff;
    }
  }

  @media screen and (max-width: 1280px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const HeroP = styled.p`
  display: block;
  width: fit-content;
  font-size: 2rem;
  position: relative;
  color: transparent;
  animation: text_reveal_par 0.5s ease forwards;
  animation-delay: 3s;

  @keyframes text_reveal_par {
    100% {
      color: rgba(255, 255, 255, 0.7);
    }
  }

  @media screen and (max-width: 1280px) {
    font-size: 1.5rem;
    width: 60%;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const HeroBtnWrapper = styled.div`
  margin-top: 32px;
  margin-right: 150px;
  display: block;
  width: fit-content;
  position: relative;
  color: transparent;
`;

export const ArrowForward = styled(MdArrowForward)`
  margin-left: 8px;
  font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
  margin-left: 8px;
  font-size: 20px;
`;

export const ChartContainer = styled.div`
  width: 40vw;

  @media screen and (max-width: 1080px) {
    width: 90vw;
  }
  @media screen and (max-width: 480px) {
    width: 97vw;
  }
`;
