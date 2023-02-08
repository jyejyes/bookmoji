import React from "react";
import styled from "styled-components";
import { color, device, flexCenter } from "../style/theme";
import Login from "./Login";
import Register from "./Register";

interface Props {
  auth: string;
}

const Auth = ({ auth }: Props) => {
  return (
    <AuthWrapper path={auth}>
      {auth === "login" && <Login />}
      {auth === "register" && <Register />}
    </AuthWrapper>
  );
};

export default Auth;

const AuthWrapper = styled.div<{ path: string }>`
  width: 50%;
  height: 100%;
  z-index: 10;
  background: ${color.white};
  position: absolute;
  ${(props) => (props.path === "login" ? "transform: translateX(100%)" : "")};
  transition: transform 0.5s ease;
  ${flexCenter}
  @media ${device.tablet} {
    width: 100%;
    transform: translateX(0%);
  }
`;
