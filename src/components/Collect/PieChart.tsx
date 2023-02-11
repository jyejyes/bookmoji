import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import React from "react";
import styled from "styled-components";
import { Pie } from "react-chartjs-2";
import { apiClient } from "../../api/apiClient";
import { color, device, flexCenter } from "../style/theme";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../constant/queryKeys";
import { EmojiChartData } from "../../type/type";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const year = 0;
  const userIdx = localStorage.getItem("userIdx") ?? "";

  //9 : 리뷰 이모지 통계 조회 api
  const { data: emojiChartDatas } = useQuery(
    [queryKeys?.REVIEW_EMOJI_KEY],
    () =>
      apiClient.get(`reviews/analysis/emoji?userIdx=${userIdx}&year=${year}`),
    {
      select: (emojiChartDatas) => {
        return {
          labels: emojiChartDatas?.data?.result?.map(
            (item: EmojiChartData) => item?.emoji
          ),
          datasets: emojiChartDatas?.data?.result?.map(
            (item: EmojiChartData) => item?.emojiPercentage
          ),
        };
      },
    }
  );

  const data = {
    labels: emojiChartDatas?.labels,
    datasets: [
      {
        label: "Emoji",
        data: emojiChartDatas?.datasets,
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
      {!emojiChartDatas?.labels ? (
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
