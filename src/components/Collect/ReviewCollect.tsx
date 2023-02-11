import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { queryKeys } from "../../constant/queryKeys";
import { MyReviewProps } from "../../type/type";
import Modal from "../common/Modal";
import { color, flexCenter } from "../style/theme";
import CollectSubject from "./CollectSubject";
import ReadReviewModal from "./ReadReviewModal";

const ReviewCollect = () => {
  const [reviewIdx, setReviewIdx] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //책 클릭하면 리뷰 적힌 모달 나오는 함수
  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickReviewBook = (reviewIdx: number) => {
    setReviewIdx(reviewIdx);
    handleToggleModal();
  };

  const { data: userBookReviewDatas } = useQuery(
    [queryKeys?.USER_BOOK_REVIEW_KEY],
    () => apiClient.get(`/reviews?userIdx=${localStorage.getItem("userIdx")}`),
    {
      select: (userBookReviewDatas) => userBookReviewDatas?.data?.result,
      onError: (e) => {
        console.log(e);
      },
    }
  );

  return (
    <Section className="review">
      <CollectSubject content="감상 모아보기" />
      {!userBookReviewDatas ? (
        <Wrapper>
          <p className="no-review-text">작성한 리뷰가 없어요 😭</p>
        </Wrapper>
      ) : (
        <div className="books">
          {userBookReviewDatas?.map((item: MyReviewProps) => (
            <div className="book" key={item?.reviewIdx}>
              <img
                src={item?.thumbnailUrl}
                alt="책 사진"
                onClick={() => handleClickReviewBook(item?.reviewIdx)}
              />
              <p onClick={() => handleClickReviewBook(item?.reviewIdx)}>
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
        <Modal handleOpenModal={handleToggleModal}>
          <ReadReviewModal
            reviewIdx={reviewIdx}
            handleOpenModal={handleToggleModal}
          />
        </Modal>
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

const Wrapper = styled.div`
  padding-bottom: 5rem;
  .no-review-text {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    color: ${color.medium_gray2};
    font-size: 1.4rem;
  }
`;
