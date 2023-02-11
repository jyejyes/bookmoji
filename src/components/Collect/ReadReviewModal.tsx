import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import BookInfo from "../common/BookInfo";
import LoadingSpinner from "../common/LoadingSpinner";
import { color } from "../style/theme";

interface Props {
  reviewIdx: number;
  handleOpenModal: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const ReadReviewModal = ({ reviewIdx, handleOpenModal }: Props) => {
  const [newText, setNewText] = useState("");

  const userIdx = localStorage.getItem("userIdx");

  //리뷰 텍스트 변경 함수
  const handleChagneText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
  };

  /**
   * 수정 클릭 함수
   */
  const handleClickChange = () => {
    changeReview.mutate();
  };
  /**
   * 삭제 클릭 함수
   */
  const handleClickDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    const result = window.confirm("리뷰를 삭제하시겠습니까?");
    if (result) {
      deleteReview.mutate();
    }
  };

  //
  /**
   * @GET 12 : 특정 리뷰 조회 api
   */
  const { data: bookReview } = useQuery(
    ["review"],
    () =>
      apiClient.get(
        `reviews/details?userIdx=${userIdx}&reviewIdx=${reviewIdx}`
      ),
    {
      select: (bookReview) => bookReview?.data?.result,
      onError: (e) => console.log(e),
    }
  );

  /**
   * @PATCH 13. 리뷰 수정 api
   */
  const changeReviewApi = async () => {
    const { data } = await apiClient.patch("reviews/contents", {
      userIdx: userIdx,
      reviewIdx: reviewIdx,
      emoji: bookReview?.emoji,
      text: newText,
    });
    return data;
  };
  const changeReview = useMutation(changeReviewApi, {
    onSuccess: (data) => {
      if (data?.isSuccess) alert("리뷰가 수정되었습니다");
      else alert(data?.message);
    },
  });

  //14. 리뷰 삭제 api
  const deleteReviewApi = async () => {
    const { data } = await apiClient.patch(
      `reviews?userIdx=${userIdx}&reviewIdx=${reviewIdx}`
    );
    return data;
  };
  const deleteReview = useMutation(deleteReviewApi, {
    onSuccess: (data) => {
      if (data?.isSuccess) {
        alert("리뷰가 삭제되었습니다");
        window.location.reload();
        handleOpenModal();
      } else alert(data?.message);
    },
  });

  return (
    <Wrapper>
      {!bookReview ? (
        <LoadingSpinner />
      ) : (
        <ContentStyle>
          <BookInfo
            thumbnail={bookReview?.thumbnailUrl}
            title={bookReview?.title}
            datetime={bookReview?.releaseYear}
            author={bookReview?.author}
            publisher={bookReview?.publisher}
            contents={bookReview?.introduction}
            url={bookReview?.url}
          />
          <div className="reviews">
            <div className="emoji-section">
              <span className="emoji">{bookReview?.emoji.split(" ")[0]}</span>
              <span className="emoji-text">
                {bookReview?.emoji.split(" ")[1]}
              </span>
            </div>

            <textarea
              cols={30}
              rows={5}
              placeholder="이 작품에 대한 감상을 마음껏 남겨보세요"
              defaultValue={bookReview?.text}
              onChange={handleChagneText}
            ></textarea>
          </div>
          <div className="buttons">
            <button className="review-change-btn" onClick={handleClickChange}>
              리뷰 수정하기
            </button>
            <button className="review-delete-btn" onClick={handleClickDelete}>
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
