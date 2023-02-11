import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { bookSearch } from "../../api/bookSearch";
import { EMOJI } from "../../constant/constant";
import { queryKeys } from "../../constant/queryKeys";
import BookInfo from "../common/BookInfo";
import LoadingSpinner from "../common/LoadingSpinner";
import {
  color,
  device,
  flexCenter,
  mainColorButton,
  whiteButton,
} from "../style/theme";
import Emoji from "./Emoji";

interface Props {
  isbn: string;
  handleOpenModal: () => void;
}

const ReviewModal = ({ isbn, handleOpenModal }: Props) => {
  const [errorMsg, setErrorMsg] = useState({ emoji: "", text: "" });
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [reviewText, setReviewText] = useState(""); // 작성한 감상문

  const navigate = useNavigate();

  //이모지 클릭하면 동작하는 함수
  const handleClickEmoji = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setSelectedEmoji(value);
  };

  //감상 텍스트 적을 때 동작하는 함수
  const handleInputReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  //저장하기 누르면 동작하는 함수
  const handleClickSave = () => {
    if (!selectedEmoji) {
      setErrorMsg({ ...errorMsg, emoji: "이모지를 선택해주세요." });
      return;
    }
    if (!reviewText) {
      setErrorMsg({ ...errorMsg, text: "감상글을 입력해주세요." });
      return;
    }
    mutate();
  };

  /**
   * @GET 책 정보 불러오기 api : KAKAO
   */
  const { data: bookData } = useQuery(
    [queryKeys?.KAKAO_BOOK_KEY],
    () => bookSearch({ query: isbn, page: 1, size: 1 }),
    {
      select: (bookData) => bookData?.data?.documents[0],
      onError: (e) => {
        console.log(e);
      },
    }
  );

  /**
   * @PATCH 책 리뷰 저장하기 api
   */
  const { mutate } = useMutation(
    () =>
      apiClient.post("reviews", {
        emoji: selectedEmoji, //선택 이모지
        text: reviewText.trim(), //감상
        isbn: bookData.isbn, //카카오
        userIdx: localStorage.getItem("userIdx"),
        title: bookData.title, //카카오
        thumbnailUrl: bookData.thumbnail, //카카오
        author: bookData.authors[0], //카카오
        publisher: bookData.publisher, //카카오
        introduction: bookData.contents.substring(0, 180), //카카오
        releaseYear: bookData.datetime.substring(0, 4), //카카오
      }),
    {
      onSuccess: ({ data }) => {
        console.log(data);
        if (data?.isSuccess) handleOpenModal();
        if (data?.code === 2002) navigate("/auth/login");
      },
    }
  );

  return (
    <Wrapper>
      {!bookData ? (
        <LoadingSpinner />
      ) : (
        <>
          <BookInfo
            thumbnail={bookData?.thumbnail}
            title={bookData?.title}
            datetime={bookData?.datetime.substring(0, 4)}
            author={bookData?.authors[0]}
            publisher={bookData?.publisher}
            contents={bookData?.contents.substring(0, 180)}
            url={bookData?.url}
          />

          <section className="review-section">
            {errorMsg.emoji && <ErrorMsg>{errorMsg.emoji}</ErrorMsg>}

            <div className="emojies">
              {EMOJI.map((item) => (
                <Emoji
                  selectedEmoji={selectedEmoji}
                  key={item.text}
                  value={item.combine}
                  handleClickEmoji={handleClickEmoji}
                  emo={item.emo}
                  text={item.text}
                />
              ))}
            </div>
            {errorMsg.text && <ErrorMsg>{errorMsg.text}</ErrorMsg>}
            <textarea
              cols={30}
              rows={5}
              placeholder="이 작품에 대한 감상을 마음껏 남겨보세요"
              defaultValue={reviewText}
              onChange={handleInputReview}
            ></textarea>
          </section>

          <section className="button-section">
            <button className="submit" onClick={handleClickSave}>
              저장하기
            </button>
            <button className="cancel" onClick={handleOpenModal}>
              취소
            </button>
          </section>
        </>
      )}
    </Wrapper>
  );
};

export default ReviewModal;

const Wrapper = styled.div`
  // 리뷰 남기는 섹션
  .review-section {
    width: 100%;
    // 이모지
    .emojies {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      margin-bottom: 2rem;

      @media ${device.tablet} {
      }
      @media screen and (max-width: 780px) {
        grid-template-columns: repeat(4, 1fr);
        margin-bottom: 2rem;
      }
    }
    // 감상
    textarea {
      width: 100%;
      border: 1px solid ${color.medium_gray};
      border-radius: 1rem;
      padding: 1.2rem;
      font-size: 1.4rem;
      font-family: "LeferiBaseType-RegularA";
      box-sizing: border-box;
      &:focus {
        outline: none;
        border: 1px solid ${color.Main};
      }
    }
  }

  // 버튼 섹션
  .button-section {
    ${flexCenter}
    margin-top: 3rem;

    .submit {
      ${mainColorButton}
      border-radius: 1rem;
      font-size: 1.4rem;
      padding: 1rem 1.2rem;
    }
    .cancel {
      ${whiteButton}
      border: 1px solid ${color.medium_gray};
      color: ${color.dark_gray};
      border-radius: 1rem;
      font-size: 1.4rem;
      padding: 1rem 1.2rem;
    }
  }
`;

const ErrorMsg = styled.p`
  ${flexCenter}
  color: ${color.Main};
  font-size: 1.4rem;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;
