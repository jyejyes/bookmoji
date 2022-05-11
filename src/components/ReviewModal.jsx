import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiClient } from "../api/apiClient";
import { bookSearch } from "../api/bookSearch";
import BookInfo from "./common/BookInfo";
import LoadingSpinner from "./common/LoadingSpinner";
import { color, flexCenter, mainColorButton, whiteButton } from "./style/theme";

const ReviewModal = ({ isbn, handleOpenModal }) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ emoji: "", text: "" });
  const [selectEmoji, setSelectEmoji] = useState(null); //선택한 이모지
  const [reviewText, setReviewText] = useState(null); // 작성한 감상문

  //이모지
  const [emoji, setEmoji] = useState([
    { emo: "😆", text: "재밌어요", select: false },
    { emo: "🤓", text: "유익해요", select: false },
    { emo: "😭", text: "슬퍼요", select: false },
    { emo: "🤔", text: "생각이 많아져요", select: false },
    { emo: "🤯", text: "어려워요", select: false },
    { emo: "🥱", text: "재미없어요", select: false },
    { emo: "😱", text: "무서워요", select: false },
    { emo: "🥺", text: "감동이에요", select: false },
  ]);

  useEffect(() => {
    onGetBooks(isbn);
  }, []);

  //여기서 책 api 불러오자
  const onGetBooks = async (isbn) => {
    const params = {
      query: isbn,
      page: 1,
      size: 1,
    };
    setLoading(true);
    const resultData = await bookSearch(params);
    setResult(resultData.data.documents[0]);
    setLoading(false);
  };

  // 리뷰 저장 api
  const saveReviewApi = async () => {
    try {
      const res = await apiClient.post("reviews", {
        emoji: `${selectEmoji} `,
        text: reviewText,
        isbn: result.isbn,
        userIdx: localStorage.getItem("userIdx"),
        title: result.title,
        thumbnailUrl: result.thumbnail,
        author: result.authors[0],
        publisher: result.publisher,
        introduction: result.contents.substring(0, 180),
        releaseYear: result.datetime.substring(0, 4),
      });
      console.log(res);
      //요청 성공했을 때 === 리뷰 작성 되었을 때
      if (res.data.code === 1000) handleOpenModal();
      //이모지 입력 안했을 때
      if (res.data.code === 2024)
        setErrorMsg({ emoji: res.data.message, text: "" });
      //감상글 입력 안했을 때
      if (res.data.code === 2025)
        setErrorMsg({ emoji: "", text: res.data.message });
    } catch (e) {
      console.log(e);
    }
  };

  //이모지 클릭하면 동작하는 함수
  const handleClickEmoji = (e) => {
    setSelectEmoji(`${e.target.name} ${e.target.value}`);
  };

  //감상 텍스트 적을 때 동작하는 함수
  const handleInputReview = (e) => {
    setReviewText(e.target.value);
  };

  //저장하기 누르면 동작하는 함수
  const handleClickSave = () => {
    saveReviewApi();
  };

  return (
    <Wrapper>
      {result.length == 0 ? (
        <LoadingSpinner />
      ) : (
        <>
          <BookInfo
            thumbnail={result.thumbnail}
            title={result.title}
            datetime={result.datetime.substring(0, 4)}
            author={result.authors[0]}
            publisher={result.publisher}
            contents={result.contents.substring(0, 180)}
            url={result.url}
          />

          <section className="review-section">
            {errorMsg.emoji && <ErrorMsg>{errorMsg.emoji}</ErrorMsg>}

            <div className="emojies">
              {emoji.map((item, index) => (
                <EmojiBtn
                  key={index}
                  name={item.emo}
                  value={item.text}
                  selectValue={selectEmoji}
                  onClick={handleClickEmoji}
                >
                  {item.emo}
                  <p className="emo-text">{item.text}</p>
                </EmojiBtn>
              ))}
            </div>
            {errorMsg.text && <ErrorMsg>{errorMsg.text}</ErrorMsg>}
            <textarea
              cols="30"
              rows="5"
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
  .book-info {
    display: flex;
    // width 값을 지정하고 반응형 될때마다 변경할지 그냥 fit 하게 둘지 고민중
    width: 80rem;
    margin-bottom: 2rem;
    & > img {
      width: 13rem;
      border: 1px solid ${color.medium_gray};
      border-radius: 0.5rem;
    }
    & > div {
      margin: 1rem 0 1rem 3rem;

      & > h2 {
        font-size: 2.2rem;
        font-family: "LeferiBaseType-BoldA";
      }
      & > p {
        color: ${color.medium_gray2};
        font-size: 1.4rem;
        margin: 1rem 0;
      }
      & > h3 {
        color: ${color.dark_gray2};
        font-size: 1.2rem;
        line-height: 2rem;
      }
    }
    button {
      ${whiteButton}
      margin-top:1rem;
      border: 1px solid ${color.medium_gray};
      border-radius: 0.5rem;
    }
    a {
      padding: 0.8rem 0;
      color: ${color.dark_gray};
      font-size: 1.4rem;
    }
  }

  // 리뷰 남기는 섹션
  .review-section {
    width: 100%;
    // 이모지
    .emojies {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      margin-bottom: 2rem;
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

const EmojiBtn = styled.button`
  font-size: 4rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  &:hover {
    background: ${color.light_gray2};
  }

  .emo-text {
    font-size: 1.1rem;
    color: ${color.black};
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
