import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { FC, ReactNode, MouseEventHandler } from "react";

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  big?: boolean;
  fontBig?: boolean;
  to: string;
  exact?: boolean | string;
  offset?: number;
  children?: ReactNode;
  onMouseEnter?: MouseEventHandler<HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLAnchorElement>;
};

export const Button: FC<ButtonProps> = styled(LinkR).attrs<ButtonProps>(
  (props) => ({
    to: props.to,
    exact: props.exact,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
  })
)<ButtonProps>`
  border-radius: 50px;
  width: 250px;
  height: 50px;
  background: ${({ primary }) => (primary ? "#fff" : "#0779e4")};
  color: ${({ secondary }) => (secondary ? "#0779e4" : "#fff")};
  font-weight: 500;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: ${({ primary }) => (primary ? "#0779e4" : "#fff")};
    color: ${({ secondary }) => (secondary ? "#fff" : "#0779e4")};
  }
`;
