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
import React from "react";
import { Bar } from "react-chartjs-2";
import { apiClient } from "../../api/apiClient";
import { device } from "../style/theme";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constant/queryKeys";
import { MonthChartData } from "../../type/type";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const year = 0;
  const userIdx = localStorage.getItem("userIdx") ?? "";

  const { data: monthChartDatas } = useQuery(
    [queryKeys?.REVIEW_MONTH_KEY],
    () =>
      apiClient.get(`reviews/analysis/monthly?userIdx=${userIdx}&year=${year}`),
    {
      select: (monthChartDatas) => {
        return {
          month: monthChartDatas?.data?.result?.map(
            (item: MonthChartData) => `${item.month}월`
          ),
          monthNum: monthChartDatas?.data?.result?.map(
            (item: MonthChartData) => item.monthlyCount
          ),
        };
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  const data = {
    labels: monthChartDatas?.month,
    datasets: [
      {
        label: "월별 리뷰 개수",
        data: monthChartDatas?.monthNum,
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
