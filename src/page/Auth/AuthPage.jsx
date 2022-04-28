import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import Auth from "../../components/Auth/Auth";
import { color, flexCenter } from "../../components/style/theme";
import { ReactComponent as Logo } from "../../svg/logo.svg";

const AuthPage = () => {
  const navigate = useNavigate();
  const { auth } = useParams();

  return (
    <>
      <Auth auth={auth} />
      <LoginWrapper>
        <LogoStyle onClick={() => navigate("/")} auth={auth} />
        <section>
          <h2>Create Account</h2>
          <p>계정이 없으신가요? 간단하게 회원가입 할 수 있습니다.</p>
          <button onClick={() => navigate("/auth/register")}>
            회원가입 하러가기
          </button>
        </section>
        <section>
          <h2>Have an account?</h2>
          <p>이미 계정이 있으신가요?</p>
          <button onClick={() => navigate("/auth/login")}>로그인 하기</button>
        </section>
      </LoginWrapper>
    </>
  );
};
export default AuthPage;

const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: no-repeat
    url("https://i.pinimg.com/564x/58/14/88/58148822f746ab16f4d8c2d235b00abc.jpg");
  background-size: cover;
  display: grid;
  grid-template-columns: 1fr 1fr;

  section {
    width: 100%;
    height: 100%;
    ${flexCenter}
    flex-direction: column;
  }

  h2 {
    color: ${color.white};
    font-size: 5rem;
  }
  p {
    color: ${color.white};
    font-size: 1.6rem;
    margin: 1.5rem;
    font-family: LeferiPoint-WhiteA;
  }
  button {
    color: ${color.white};
    ${flexCenter}
    font-size: 1.6rem;
    border: 2px solid ${color.white};
    border-radius: 10rem;
    padding: 1.2rem 2rem;
    margin-top: 2rem;
    font-family: LeferiBaseType-RegularA;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

const LogoStyle = styled(Logo)`
  position: absolute;
  margin: 0 2.5%;
  fill: ${(props) => (props.auth === "login" ? "white" : "black")};
  transition: fill 0.5s ease;
  z-index: 50;
  cursor: pointer;
`;
