import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import NavBar from "../components/common/NavBar";
import FooterSection from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Introduce from "../components/Main/Introduce";
import MainAnalysis from "../components/Main/MainAnalysis";
import OtherReview from "../components/Main/OtherReview";
import { color, device } from "../components/style/theme";

const MainPage = () => {
  const navigate = useNavigate();
  const userIdx = localStorage.getItem("userIdx");
  const [isLogin, setIsLogin] = useState(!!userIdx);
  return (
    <>
      <Header />
      <Wrapper>
        {isLogin && (
          <>
            <Introduce />
            <OtherReview />
          </>
        )}
        {!isLogin && (
          <>
            <Introduce />

            <button
              className="move-register"
              onClick={() => navigate("/auth/register")}
            >
              <b>북모지</b> 가입하러가기
            </button>
          </>
        )}
      </Wrapper>
      <NavBar />
      <FooterSection />
    </>
  );
};

export default MainPage;

const Wrapper = styled.div`
  margin: 1% 5%; /* margin: 2rem 5.5rem; */
  .move-register {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.6rem;
    color: white;
    background: ${color.Main};
    width: 30rem;
    padding: 1.3rem 0;
    border-radius: 6rem;
    box-shadow: 1px 1px 1rem 1px ${color.medium_gray};
    b {
      font-family: LeferiBaseType-BoldA;
      font-size: 1.6rem;
    }

    @media ${device.mobile} {
      display: none;
    }
  }
`;
