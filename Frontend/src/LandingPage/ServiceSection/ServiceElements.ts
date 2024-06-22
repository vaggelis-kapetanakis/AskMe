import styled from "styled-components";
import { FaCrown } from "react-icons/fa";

export const ServicesContainer = styled.div`
  height: 750px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);

  @media screen and (max-width: 1024px) {
    height: 1300px;
  }

  @media screen and (max-width: 768px) {
    height: 1800px;
  }

  @media screen and (max-width: 480px) {
    height: 1800px;
  }
`;

export const ServicesWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 36px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }
`;

export const ServicesCard = styled.div`
  background: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 15px;
  max-height: 640px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const ServicesIcon = styled(FaCrown)`
  height: 120px;
  width: 120px;
  margin-bottom: 10px;
`;

export const ServicesTitle = styled.h1`
  font-size: 2rem;
  color: #000;
  margin-bottom: 24px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ServicesH1 = styled.h1`
  font-size: 2rem;
  color: #fff;
  margin-bottom: 24px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ServicesH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  color: #fff;
`;

export const ServicesP = styled.p`
  font-size: 1rem;
  text-align: center;
  color: #fff;
`;

export const ServicesUl = styled.ul`
  list-style: none;
`;

export const ServicesLi = styled.li`
  margin: 25px;
  display: grid;
  grid-template-columns: 0.3fr 2fr;
  grid-template-areas: "check info";
`;

export const ServicesH4 = styled.h4`
  color: rgba(0, 0, 0, 0.8);
  font-weight: lighter;
  grid-area: info;
  grid-row: 1;
  grid-column: 2;
  color: #fff;
  font-size: 0.9rem;
`;

export const ServicesButton = styled.button`
  outline: none;
  border: 2px solid #fff;
  width: 100%;
  height: 42px;
  border-radius: 15px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  text-transform: initial;
  font-size: 14px;
  margin: 20px;

  &:hover {
    background: transparent;
    color: #fff;
    transition: all 0.3s ease-out;
    transform: scale(1.1);
    transition: all 0.2s ease-in-out;
  }
`;

interface ServicesProps {
  planYes: boolean;
}

export const ServicesI = styled.i<ServicesProps>`
  padding-right: 15px;
  grid-area: check;
  grid-row: 1;
  grid-column: 1;
  color: ${({ planYes }) => (planYes ? "#2d8515" : "#db2a34")};
`;
