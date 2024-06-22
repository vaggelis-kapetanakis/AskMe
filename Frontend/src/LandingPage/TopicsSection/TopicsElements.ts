import styled from "styled-components";
import { FaUser, FaArrowRight, FaArrowLeft } from "react-icons/fa";

export const TopicsContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
`;

export const TopicsWrapper = styled.div`
  min-height: 50vh;
  z-index: 3;
  width: 65vw;
  height: 65vh;
  background: #fff;
  border-radius: 25px;
  padding-top: 25px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 1280px) {
    width: 90%;
    height: 100%;
    border-radius: 0px;
    box-shadow: none;
    background: #000;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 100%;
    border-radius: 0px;
    box-shadow: none;
    background: #000;
  }

  @media screen and (max-width: 480px) {
    width: 90%;
    height: 100%;
    border-radius: 0px;
    box-shadow: none;
    background: #000;
  }
`;
export const TopicsSlide = styled.div`
  transition-duration: 1s ease;
`;

export const TopicsImg = styled.img`
  width: 250px;
  height: 200px;
  border-radius: 10px;
  grid-area: "slideImage";
  grid-column: 1/2;
  grid-row: 1/2;
  padding-left: 55px;
  justify-content: center;
  align-content: center;

  @media screen and (max-width: 1280px) {
    width: 200px;
    height: 200px;
  }

  @media screen and (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 480px) {
    width: 100px;
    height: 100px;
    padding-left: 20px;
  }
`;

export const TopicsQuestionImg = styled.img`
  grid-area: "slideQuestionImage";
  width: 250px;
  height: 100px;
  padding-left: 55px;
  padding-bottom: 25px;
  grid-column: 1/2;
  grid-row: 2/3;
  align-self: center;

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 100px;
    padding-left: 20px;
  }
`;

export const TopicsAnswerImg = styled.img`
  grid-area: "slideAnswerImage";
  width: 200px;
  height: 100px;
  padding-left: 55px;
  grid-column: 1/2;
  grid-row: 3/4;
  align-self: center;

  @media screen and (max-width: 480px) {
    width: 100px;
    height: 100px;
    padding-left: 20px;
  }
`;

export const TopicsUsername = styled.h4`
  font-weight: bolder;
  padding-bottom: 15px;
  font-size: 1.1rem;

  @media screen and (max-width: 1280px) {
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    color: #fff;
  }
`;

export const TopicsUserIcon = styled(FaUser)`
  color: #000;
  font-size: 1.1.rem;
  margin-right: 15px;

  @media screen and (max-width: 1280px) {
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    color: #fff;
  }
`;

export const TopicsQuestionInfo = styled.div`
  grid-area: "slideQuestionInfo";
  grid-column: 2/3;
  grid-row: 2/3;
  width: 90%;
  justify-content: center;
  align-content: center;
  padding: 0px 10px;
  padding-top: 25px;

  @media screen and (max-width: 1280px) {
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    color: #fff;
  }
`;
export const TopicsAnswerInfo = styled.div`
  grid-area: "slideAnswerInfo";
  grid-column: 2/3;
  grid-row: 3/4;
  width: 90%;
  justify-content: center;
  align-content: center;
  padding: 0px 10px;
  padding-top: 25px;

  @media screen and (max-width: 1280px) {
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    color: #fff;
  }
`;

export const TopicsTitleWrapper = styled.div`
  grid-area: "slideTitle";
  grid-column: 2/3;
  grid-row: 1/2;
  font-size: 2rem;
  justify-content: center;
  align-content: center;
  padding: 70px 50px;

  @media screen and (max-width: 768px) {
    padding: 70px 0px;
  }

  @media screen and (max-width: 480px) {
    padding: 20px 0px 30px 10px;
    max-height: 10vh;
  }
`;

export const TopicsTitleH1 = styled.h1`
  font-size: 2rem;

  @media screen and (max-width: 1280px) {
    color: #fff;
  }

  @media screen and (max-width: 768px) {
    color: #fff;
  }

  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

export const TopicsTitleP = styled.p`
  padding-top: 20px;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.6);

  @media screen and (max-width: 1280px) {
    color: rgba(255, 255, 255, 0.8);
  }

  @media screen and (max-width: 768px) {
    color: rgba(255, 255, 255, 0.8);
  }

  @media screen and (max-width: 480px) {
    font-size: 0.9rem;
    padding-top: 10px;
  }
`;

export const TopicsArrowLeft = styled(FaArrowLeft)`
  position: absolute;
  top: 50%;
  left: 10%;
  font-size: 3rem;
  color: #fff;
  z-index: 10;
  cursor: pointer;
  user-select: none;

  @media screen and (max-width: 1280px) {
    top: 80%;
  }

  @media screen and (max-width: 768px) {
    top: 80%;
  }
`;

export const TopicsArrowRight = styled(FaArrowRight)`
  position: absolute;
  top: 50%;
  right: 10%;
  font-size: 3rem;
  color: #fff;
  z-index: 10;
  cursor: pointer;
  user-select: none;

  @media screen and (max-width: 1280px) {
    top: 80%;
  }

  @media screen and (max-width: 768px) {
    top: 80%;
  }
`;
