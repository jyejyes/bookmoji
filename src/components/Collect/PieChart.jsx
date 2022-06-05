import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Bar, Pie } from "react-chartjs-2";
import { apiClient } from "../../api/apiClient";
import { color, device, flexCenter } from "../style/theme";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [year, setYear] = useState(0);
  const userIdx = localStorage.getItem("userIdx");

  //파이 차트 속성
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const [noReview, setNoReview] = useState(false); //리뷰 존재여부

  //9 : 리뷰 이모지 통계 조회 api
  const emojiAnalysisApi = async () => {
    try {
      const res = await apiClient.get(
        `reviews/analysis/emoji?userIdx=${userIdx}&year=${year}`
      );
      //성공시
      if (res.data.code === 1000) {
        setLabels(res.data.result.map((item) => item.emoji));
        setDatasets(res.data.result.map((item) => item.emojiPercentage));
        setNoReview(false);
      }
      //리뷰가 없을 때
      if (res.data.code === 3028) {
        setNoReview(true);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    emojiAnalysisApi();
  }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Emoji",
        data: datasets,
        backgroundColor: [
          "rgb(248,211,197)",
          "rgb(252,238,233)",
          "rgb(221,230,213)",
          "rgb(163,184,153)",
          "rgb(180,200,234)",
          "rgb(145,168,208)",
          "rgb(186,186,255)",
          "rgb(217,174,192)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Wrapper>
      {noReview ? (
        <p className="no-review">리뷰를 작성하면 원형 차트를 볼 수 있어요</p>
      ) : (
        <Pie data={data} />
      )}
    </Wrapper>
  );
};

export default PieChart;

const Wrapper = styled.div`
  width: 100%;
  .no-review {
    font-size: 1.4rem;
    color: ${color.medium_gray2};
    width: 100%;
    height: 100%;
    ${flexCenter}
  }
  @media screen and (max-width: 920px) {
    width: 60%;
    margin-bottom: 5rem;
  }
  @media screen and (max-width: 700px) {
    width: 80%;
    margin-bottom: 5rem;
  }
  @media ${device.mobile} {
    width: 95%;
  }
`;
