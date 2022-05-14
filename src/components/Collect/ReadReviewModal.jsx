import React, { useEffect, useState, useSyncExternalStore } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import BookInfo from "../common/BookInfo";
import LoadingSpinner from "../common/LoadingSpinner";
import { color } from "../style/theme";

const ReadReviewModal = ({ reviewIdx }) => {
  //12: 특정 리뷰 조회 api
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  const userIdx = localStorage.getItem("userIdx");

  const detailReviewApi = async () => {
    try {
      const res = await apiClient.get(
        `reviews/details?userIdx=${userIdx}&reviewIdx=${reviewIdx}`
      );
      setResult(res.data.result);
      console.log(res);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    detailReviewApi();
  }, []);

  return (
    <Wrapper>
      {result.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <ContentStyle>
          <BookInfo
            thumbnail={result.thumbnailUrl}
            title={result.title}
            datetime={result.releaseYear}
            author={result.author}
            publisher={result.publisher}
            contents={result.introduction}
            url={result.url}
          />
          <div className="buttons">
            <button className="review-change-btn">리뷰 수정하기</button>
            <button className="review-delete-btn">리뷰 삭제하기</button>
          </div>
        </ContentStyle>
      )}
    </Wrapper>
  );
};

export default ReadReviewModal;

const Wrapper = styled.div``;

const ContentStyle = styled.div`
  .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem;
  }
  .review-change-btn {
    color: ${color.dark_gray};
    font-size: 1.4rem;
    padding: 1rem;
    border: 1px solid ${color.medium_gray2};
    border-radius: 0.5rem;
    background: white;
    &:hover {
      background: ${color.light_gray};
    }
  }
  .review-delete-btn {
    color: red;
    font-size: 1.4rem;
    padding: 1rem;
    border: 1px solid red;
    border-radius: 0.5rem;
    background: white;

    &:hover {
      background: ${color.light_gray};
    }
  }
`;
