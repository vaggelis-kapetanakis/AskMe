import styled from "styled-components";

export const WhyUsContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4f4f9;

  @media screen and (max-width: 768px) {
    height: 260vh;
  }
`;

export const WhyUsWrapper = styled.div`
  min-height: 50vh;
  z-index: 3;
  width: 65vw;
  height: 65vh;
  background: transparent;
  border-radius: 25px;
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0px 0px 50px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    height: 100%;
    width: 90%;
    padding: 25px;
    background: #f4f4f5;
    border-radius: 0px;
    gap: 15px;
    box-shadow: none;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    height: 100%;
    width: 90%;
    padding: 25px;
    background: #f4f4f5;
    border-radius: 0px;
    gap: 15px;
    box-shadow: none;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: 100%;
    width: 100%;
    border-radius: 0px;
    gap: 0px;
  }
`;

export const WhyUsImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  opacity: 0.75;
  top: 0%;
  left: 0%;

  @media screen and (max-width: 1024px) {
    border-radius: 25px;
  }

  @media screen and (max-width: 768px) {
    border-radius: 25px;
  }
`;

export const WhyUsH1 = styled.h1`
  padding: 15px;
  padding-top: 40px;
  color: #fff;
  opacity: 0.75;
  font-size: 2.3rem;
`;

export const WhyUsH4 = styled.h4`
  padding: 20px;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.7);
  opacity: 0.75;

  @media screen and (max-width: 1024px) {
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
  }

  @media screen and (max-width: 768px) {
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
  }
`;

export const WhyUsCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  text-align: center;

  &:hover {
    transform: scale(1.08);
    transition: all 0.5s ease-in-out;

    h1,
    h4,
    img {
      opacity: 1;
      transition: all 0.5s ease-in;
      background: rgba(0,0,0,0.6);
    }
  }

  @media screen and (max-width: 768px) {
    margin: 25px;
  }
`;
