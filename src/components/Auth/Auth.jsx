import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  blackButton,
  color,
  device,
  flexCenter,
  whiteButton,
} from "../style/theme";
import Login from "./Login";
import Register from "./Register";

const Auth = (auth) => {
  return (
    <AuthWrapper path={auth.auth}>
      {auth.auth === "login" && <Login />}
      {auth.auth === "register" && <Register />}
    </AuthWrapper>
  );
};

export default Auth;

const AuthWrapper = styled.div`
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
