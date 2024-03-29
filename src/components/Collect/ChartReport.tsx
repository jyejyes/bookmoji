import React from "react";
import styled from "styled-components";
import { color, device } from "../style/theme";
import BarChart from "./BarChart";
import CollectSubject from "./CollectSubject";
import PieChart from "./PieChart";

const ChartReport = () => {
  return (
    <Section>
      <CollectSubject content="통계 모아보기" />
      {/* <select name="year">
        <option value="2022">2022</option>
      </select> */}
      <div className="charts">
        <PieChart />
        <BarChart />
      </div>
    </Section>
  );
};

export default ChartReport;

const Section = styled.section`
  padding: 3rem 0 5rem 0;
  position: relative;
  border-bottom: 1px solid ${color.medium_gray};
  .charts {
    margin: 1rem 5rem 0 5rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10rem;
    @media ${device.tablet} {
      grid-gap: 3rem;
    }
    @media screen and (max-width: 920px) {
      grid-template-columns: 1fr;
    }
    @media ${device.mobile} {
      grid-template-columns: 1fr;
      margin: 0;
    }
  }
`;
