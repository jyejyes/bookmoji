import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { bookSearch } from "../../api/bookSearch";
import { selectedEmoji, selectedText } from "../../store/actions/selected";
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

const ReviewModal = ({ isbn, handleOpenModal }) => {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ emoji: "", text: "" });
  const [reviewText, setReviewText] = useState(null); // 작성한 감상문

  const dispatch = useDispatch();
  const select = useSelector((state) => state.selectedReducer);
  const navigate = useNavigate();

  const [isSelect, setIsSelect] = useState(false);
  //이모지
  const [emoji, setEmoji] = useState([
    { emo: "😆", text: "재밌어요", combine: "😆 재밌어요", state: false },
    { emo: "🤓", text: "유익해요", combine: "🤓 유익해요", state: false },
    { emo: "😭", text: "슬퍼요", combine: "😭 슬퍼요", state: false },
    {
      emo: "🤔",
      text: "생각이많아져요",
      combine: "🤔 생각이많아져요",
      state: false,
    },
    { emo: "🤯", text: "어려워요", combine: "🤯 어려워요", state: false },
    { emo: "🥱", text: "지루해요", combine: "🥱 지루해요", state: false },
    { emo: "😱", text: "무서워요", combine: "😱 무서워요", state: false },
    { emo: "🥺", text: "감동이에요", combine: "🥺 감동이에요", state: false },
  ]);

  //값 변경을 위한 복사본
  let newEmoji = [...emoji];

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
        emoji: select.emoji,
        text: reviewText.trim(),
        isbn: result.isbn,
        userIdx: localStorage.getItem("userIdx"),
        title: result.title,
        thumbnailUrl: result.thumbnail,
        author: result.authors[0],
        publisher: result.publisher,
        introduction: result.contents.substring(0, 180),
        releaseYear: result.datetime.substring(0, 4),
      });
      //요청 성공했을 때 === 리뷰 작성 되었을 때
      if (res.data.code === 1000) handleOpenModal();
      //로그인 안했을 때
      if (res.data.code === 2002) {
        navigate("/auth/login");
      }
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
    dispatch(selectedEmoji(e.target.value));
    Array(8)
      .fill(0)
      .map((_, index) => {
        newEmoji[index].state = false;
      });
    setEmoji(newEmoji);
    newEmoji[e.target.name].state = true;
    setEmoji(newEmoji);
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
      {result.length === 0 ? (
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
                <Emoji
                  key={item.text}
                  name={index}
                  value={item.combine}
                  handleClickEmoji={handleClickEmoji}
                  emo={item.emo}
                  text={item.text}
                  state={item.state}
                />
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
