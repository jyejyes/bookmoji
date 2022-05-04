import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { bookSearch } from "../api/bookSearch";
import LoadingSpinner from "./common/LoadingSpinner";
import { color, flexCenter, mainColorButton, whiteButton } from "./style/theme";

const ReviewModal = ({ isbn, handleOpenModal }) => {
  const [book, setBook] = useState("");
  const [loading, setLoading] = useState(false);

  //이모지
  const [emoji, setEmoji] = useState([
    { emo: "😆", text: "재밌어요" },
    { emo: "🤓", text: "유익해요" },
    { emo: "😭", text: "슬퍼요" },
    { emo: "🤔", text: "생각이 많아져요" },
    { emo: "🤯", text: "어려워요" },
    { emo: "🥱", text: "재미없어요" },
    { emo: "😱", text: "무서웠어요" },
    { emo: "🥺", text: "감동이에요" },
  ]);

  useEffect(() => {
    onGetBooks(isbn);
  }, []);

  //여기서 api 불러오자
  const onGetBooks = async (isbn) => {
    const params = {
      query: isbn,
      page: 1,
      size: 1,
    };
    setLoading(true);
    const resultData = await bookSearch(params);
    setBook(resultData.data.documents[0]);
    setLoading(false);
  };

  //이모지 클릭하면 동작하는 함수
  //
  const handleClickEmoji = (e) => {
    console.log(e.target.name);
  };

  return (
    <Wrapper>
      {book.length == 0 ? (
        <LoadingSpinner />
      ) : (
        <>
          <section className="book-info">
            <img src={book.thumbnail} alt="" />
            <div>
              <h2>{book.title}</h2>
              <p>
                {book.datetime.substring(0, 4)} • {book.authors[0]} 작가님•{" "}
                {book.publisher}
              </p>
              <h3>{book.contents.substring(0, 180)}...</h3>
              <button>
                <a href={book.url} target="_blank">
                  책 자세히 보러가기
                </a>
              </button>
            </div>
          </section>
          <section className="review-section">
            <div className="emojies">
              {emoji.map((item, index) => (
                <button
                  className="emoji"
                  key={index}
                  name={item.emo}
                  onClick={handleClickEmoji}
                >
                  {item.emo}
                  <p className="emo-text">{item.text}</p>
                </button>
              ))}
            </div>
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="이 작품에 대한 감상을 마음껏 남겨보세요"
            ></textarea>
          </section>
          <section className="button-section">
            <button className="submit">저장하기</button>
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
      ${flexCenter}
      justify-content: space-between;
      margin-bottom: 2rem;

      .emoji {
        font-size: 4rem;
        padding: 0.5rem 1.5rem;
        border-radius: 1rem;
        &:hover {
          background: ${color.light_gray2};
        }
      }
      .emo-text {
        font-size: 1.1rem;
        color: ${color.black};
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
    margin-top:3rem;
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
