import React from "react";
import styled from "styled-components";
import { color } from "../style/theme";
import CollectSubject from "./CollectSubject";
import PieChart from "./PieChart";

const Report = () => {
  return (
    <Section>
      <CollectSubject content="통계 모아보기" />
      <select name="year">
        <option value="2022">2022</option>
      </select>
      <div className="charts">
        <PieChart />
      </div>
    </Section>
  );
};

export default Report;

const Section = styled.section`
  padding: 3rem 0 5rem 0;
  position: relative;
  border-bottom: 1px solid ${color.medium_gray};
  .charts {
    margin: 1rem 5rem 0 5rem;
    width: 40rem;
  }
`;
