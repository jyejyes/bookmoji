import React, { useRef, useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import CollectSubject from "../components/Collect/CollectSubject";
import Header from "../components/Header/Header";
import { color, flexCenter } from "../components/style/theme";
import { apiClient } from "../api/apiClient";
import Modal from "../components/common/Modal";
import ReviewCollect from "../components/Collect/ReviewCollect";
import ReportCollect from "../components/Collect/Report";

const CollectPage = () => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [reviewIdx, setReviewIdx] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    inquireReview();
  }, []);

  //유저 전체 리뷰 조회 api
  const inquireReview = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(
        `/reviews?userIdx=${localStorage.getItem("userIdx")}`
      );
      setResult(res.data.result);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <Header />
      <main>
        {/* 감상 통계 */}
        <ReportCollect />
        {/* 감상 모아보기 */}
        <ReviewCollect />
      </main>
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
  }
     
`;
