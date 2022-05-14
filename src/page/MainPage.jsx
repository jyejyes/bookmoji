import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import OtherReview from "../components/Main/OtherReview";

const MainPage = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <OtherReview />
      </Wrapper>
    </>
  );
};

export default MainPage;

const Wrapper = styled.div`
  margin: 2rem 5.5rem;
`;
