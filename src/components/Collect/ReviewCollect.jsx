import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import Modal from "../common/Modal";
import { color, flexCenter } from "../style/theme";
import CollectSubject from "./CollectSubject";

const ReviewCollect = () => {
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

  //책 클릭하면 리뷰 적힌 모달 나오는 함수
  const handleOpenModal = (e) => {
    setIsModalOpen(!isModalOpen);
    setReviewIdx(e.target.name); //review인덱스 값을 모달창 으로 넘겨주기 위함
  };

  return (
    <Section className="review">
      <CollectSubject content="감상 모아보기" />
      {loading ? (
        <></>
      ) : (
        <div className="books">
          {result &&
            result.map((item, index) => (
              <div className="book" key={item.reviewIdx}>
                <img
                  src={item.thumbnailUrl}
                  onClick={handleOpenModal}
                  name={item.reviewIdx}
                />
                <p onClick={handleOpenModal} name={item.reviewIdx}>
                  {item.title}
                </p>
                <div className="emoji-review">
                  <span className="emoji">{item.emoji.split(" ")[0]}</span>
                  <span className="text">{item.emoji.split(" ")[1]}</span>
                </div>
              </div>
            ))}
        </div>
      )}
      {isModalOpen && (
        <Modal
          handleOpenModal={handleOpenModal}
          whatBtn="book-collect"
          reviewIdx={reviewIdx}
        />
      )}
    </Section>
  );
};

export default ReviewCollect;

const Section = styled.section`
  padding: 3rem 0;
  border-bottom: 1px solid ${color.medium_gray};

  .books {
    display: flex;
    overflow-x: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
  .book {
    width: 15rem;
    position: relative;
    margin-right: 1.5rem;
    & > img {
      width: 15rem;
      border: 1px solid ${color.medium_gray};
      border-radius: 0.5rem;
      cursor: pointer;
    }
    & > p {
      width: 100%;
      font-size: 1.5rem;
      margin: 1rem 0 0.5rem 0;
      font-weight: 900;
      line-height: 1.8rem;
    }
    .emoji-review {
      ${flexCenter}
      justify-content: start;
    }
    .emoji {
      font-size: 2rem;
      margin-right: 0.5rem;
    }
    .text {
      font-size: 1.3rem;
      color: #ffa500;
    }
  }
`;
