import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import BarChart from "../Collect/BarChart";
import PieChart from "../Collect/PieChart";
import { flexCenter } from "../style/theme";
import MainDisscription from "./MainDiscription";
import MainSubject from "./MainSubject";

const MainAnalysis = () => {
  return (
    <Wrapper>
      <MainSubject content="통계를 볼 수 있어요" />
      <MainDisscription content="1년간 기록한 감상의 통계를 볼 수 있어요" />

      <div className="charts">
        <PieChart />
        <BarChart />
      </div>
    </Wrapper>
  );
};

export default MainAnalysis;

const Wrapper = styled.div`
  width: 100%;
  margin: 3rem 0 5rem 0;
  ${flexCenter}
  flex-direction: column;

  .charts {
    margin: 3rem 0;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 5rem;
  }
`;
