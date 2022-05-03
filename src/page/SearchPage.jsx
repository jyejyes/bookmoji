import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { bookSearch } from "../api/bookSearch";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Header from "../components/Header/Header";
import { color, flexCenter } from "../components/style/theme";

const SearchPage = () => {
  const { bookName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onGetBooks(bookName);
  }, [bookName]);

  const onGetBooks = async (query) => {
    const params = {
      query: query,
      page: 1,
      size: 40,
    };
    setLoading(true);
    const resultData = await bookSearch(params);
    setBooks(resultData.data.documents);
    setLoading(false);
    console.log(books);
  };

  return (
    <SearchWrapper>
      <Header />
      <section>
        <p className="result-text">"{bookName}" 의 검색결과</p>
      </section>

      {loading ? (
        <main className="no-result">
          <LoadingSpinner />
        </main>
      ) : (
        <main className="result">
          {books.length === 0 ? (
            <p className="no-result">
              검색 결과가 없습니다. 다른 검색어로 검색해보세요
            </p>
          ) : (
            books.map((item, index) => (
              <div key={index} className="each-book">
                <div className="book-image">
                  {/* 기본 이미지 설정해야함 */}
                  <img src={item.thumbnail} alt="책 사진" />
                </div>
                <h2 className="book-title">{item.title}</h2>
                <p className="book-publisher">
                  {item.authors[0]}•{item.publisher}
                </p>
              </div>
            ))
          )}
        </main>
      )}
    </SearchWrapper>
  );
};
export default SearchPage;

const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${flexCenter}
  flex-direction: column;
  & > section {
    width: 100%;
    padding: 2rem 5%;
    background: ${color.light_gray2};
    .result-text {
      font-size: 1.4rem;
      color: ${color.dark_gray};
      font-family: "LeferiBaseType-BoldA";
    }
  }
  .no-result {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    color: ${color.medium_gray2};
    text-align: center;
    font-size: 1.4rem;
    p {
      font-size: 1.4rem;
    }
  }

  .result {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 4rem 2rem;

    width: 90%;
    height: 100%;
    margin: 2rem 0;

    .each-book {
      .book-image {
        border-radius: 0.5rem;
        border: 1px solid ${color.medium_gray};
        overflow: hidden;
      }
      img {
        width: 100%;
        cursor: pointer;
        &:hover {
          transform: scale(1.03);
          transition: transform 0.3s ease;
        }
      }
      .book-title {
        font-size: 1.4rem;
        line-height: 2rem;
        color: ${color.dark_gray2};
        margin-top: 1rem;
      }
      .book-publisher {
        font-size: 1.2rem;
        color: ${color.medium_gray2};
        margin: 0.5rem 0;
      }
    }
  }
`;
