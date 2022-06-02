import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { apiClient } from "../../api/apiClient";
import { device } from "../style/theme";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [year, setYear] = useState(0);
  const userIdx = localStorage.getItem("userIdx");
  const [month, setMonth] = useState([]);
  const [monthNum, setMonthNum] = useState([]);

  //21번 : 월별
  const monthAnalysisApi = async () => {
    try {
      const res = await apiClient.get(
        `reviews/analysis/monthly?userIdx=${userIdx}&year=${year}`
      );
      if (res.data.isSuccess) {
        setMonth(res.data.result.map((item) => `${item.month}월`));
        setMonthNum(res.data.result.map((item) => item.monthlyCount));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const data = {
    labels: month,
    datasets: [
      {
        label: "월별 리뷰 개수",
        data: monthNum,
        backgroundColor: [
          "rgb(248,211,197)",
          "rgb(252,238,233)",
          "rgb(255,242,204)",
          "rgb(221,230,213)",
          "rgb(163,184,153)",
          "rgb(230,230,250)",
          "rgb(180,200,234)",
          "rgb(145,168,208)",
          "rgb(186,186,255)",
          "rgb(217,174,192)",
          "rgb(255,188,199)",
          "rgb(255,128,149)",
        ],

        borderWidth: 1,
      },
    ],
  };
  useEffect(() => {
    monthAnalysisApi();
  }, []);

  return (
    <Wrapper>
      <Bar data={data} />
    </Wrapper>
  );
};

export default BarChart;

const Wrapper = styled.div`
  width: 100%;
  @media screen and (max-width: 920px) {
    width: 100%;
  }
  @media ${device.mobile} {
    width: 100%;
  }
`;
