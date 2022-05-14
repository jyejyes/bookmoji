import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  font-style: "GmarketSansMedium";
`;
