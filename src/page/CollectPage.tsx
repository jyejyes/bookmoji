import React from "react";
import styled from "styled-components";
import { flexCenter } from "../components/style/theme";
import FooterSection from "../components/Footer/Footer";
import NavBar from "../components/common/NavBar";
import ChartReport from "../components/Collect/ChartReport";
import ReviewCollect from "../components/Collect/ReviewCollect";
import Header from "../components/Header/Header";

const CollectPage = () => {
  return (
    <Wrapper>
      <Header />
      <main>
        {/* 감상 통계 */}
        <ChartReport />
        {/* 감상 모아보기 */}
        <ReviewCollect />
      </main>
      <NavBar />
      <FooterSection />
    </Wrapper>
  );
};

export default CollectPage;

const Wrapper = styled.div`
  width: 100%;
  ${flexCenter}
  flex-direction:column;
  main {
    width: 93%;
  }
  width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
