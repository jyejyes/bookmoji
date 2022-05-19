import React, { useEffect, useState, useSyncExternalStore } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import BookInfo from "../common/BookInfo";
import LoadingSpinner from "../common/LoadingSpinner";
import { color } from "../style/theme";

const ReadReviewModal = ({ reviewIdx, handleOpenModal }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");

  const [newEmoji, setNewEmoji] = useState(null);
  const [newText, setNewText] = useState(result.text);

  const userIdx = localStorage.getItem("userIdx");

  //12: 특정 리뷰 조회 api
  const detailReviewApi = async () => {
    try {
      const res = await apiClient.get(
        `reviews/details?userIdx=${userIdx}&reviewIdx=${reviewIdx}`
      );
      setResult(res.data.result);
      setNewText(res.data.result.text);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  //13. 리뷰 수정 api
  const changeReviewApi = async () => {
    try {
      const res = await apiClient.patch("reviews/contents", {
        userIdx: userIdx,
        reviewIdx: reviewIdx,
        emoji: result.emoji,
        text: newText,
      });

      // 리뷰 수정 성공시
      if (res.data.isSuccess) alert("리뷰가 수정되었습니다");
      // 리뷰 수정 실패시 에러 처리
      if (res.data.code !== 1000) alert(res.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  //14. 리뷰 삭제 api
  const deleteReviewApi = async () => {
    try {
      const res = await apiClient.patch(
        `reviews?userIdx=${userIdx}&reviewIdx=${reviewIdx}`
      );
      console.log(res);
      if (res.data.code === 1000) {
        alert("리뷰가 삭제되었습니다");
        handleOpenModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  //리뷰 텍스트 변경 함수
  const handleChagneText = (e) => {
    setNewText(e.target.value);
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
          <div className="reviews">
            <div className="emoji-section">
              <span className="emoji">{result.emoji.split(" ")[0]}</span>
              <span className="emoji-text">{result.emoji.split(" ")[1]}</span>
            </div>

            <textarea
              cols="30"
              rows="5"
              placeholder="이 작품에 대한 감상을 마음껏 남겨보세요"
              defaultValue={result.text}
              onChange={handleChagneText}
            ></textarea>
          </div>
          <div className="buttons">
            <button className="review-change-btn" onClick={changeReviewApi}>
              리뷰 수정하기
            </button>
            <button className="review-delete-btn" onClick={deleteReviewApi}>
              리뷰 삭제하기
            </button>
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

  .reviews {
    .emoji-section {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .emoji {
      font-size: 3rem;
      margin-right: 1rem;
    }
    .emoji-text {
      font-size: 1.6rem;
      color: #ffa500;
    }
    textarea {
      width: 100%;
      border: 1px solid ${color.medium_gray};
      border-radius: 1rem;
      padding: 1.2rem;
      font-size: 1.4rem;
      font-family: "LeferiBaseType-RegularA";
      box-sizing: border-box;
      margin-bottom: 2rem;
      &:focus {
        outline: none;
        border: 1px solid ${color.Main};
      }
    }
  }
`;
