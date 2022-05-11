import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { bookSearch } from "../api/bookSearch";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import Pagination from "../components/common/Pagination";
import Header from "../components/Header/Header";
import { color, flexCenter } from "../components/style/theme";

const SearchPage = () => {
  const { bookName } = useParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isbn, setIsbn] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //페이지네이션
  const [limit, setLimit] = useState(18); // 한페이지에 보여줄 갯수
  const [page, setPage] = useState(1); //현재 페이지
  const [endPage, setEndPage] = useState("");

  useEffect(() => {
    onGetBooks(bookName);
  }, [bookName, page]);

  //책 불러오는 api
  const onGetBooks = async (query) => {
    const params = {
      query: query,
      page: page,
      size: limit,
    };
    setLoading(true);
    const resultData = await bookSearch(params);
    setBooks(resultData.data.documents);
    setEndPage(Math.ceil(resultData.data.meta.pageable_count / limit));
    setLoading(false);
  };

  //모달 열고 닫는 함수
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    // document.body.style.overflow = "unset";
  };

  //책 클릭해서 감상평 모달 여는 함수, 이 때 isbn 값 잘라서 저장함
  const handleClickBook = (e) => {
    setIsbn(e.target.name.split(" ")[1]);
    handleModalOpen();
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
          {isModalOpen && (
            <Modal
              handleOpenModal={handleModalOpen}
              whatBtn="book"
              isbn={isbn}
            />
          )}
          {books.length === 0 ? (
            <p className="no-result">
              검색 결과가 없습니다. 다른 검색어로 검색해보세요
            </p>
          ) : (
            books.map((item, index) => (
              <div key={index} className="each-book">
                <div className="book-image">
                  {/* 기본 이미지 설정해야함 */}
                  <img
                    src={item.thumbnail}
                    alt="책 사진"
                    name={item.isbn}
                    onClick={handleClickBook}
                  />
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
      {books.length !== 0 && (
        <>
          <PaginationWrapper>
            <button
              className="before"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              &lt;
            </button>
            {Array(endPage)
              .fill()
              .map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  aria-current={page === i + 1 ? "page" : null}
                >
                  {i + 1}
                </button>
              ))}
            <button
              className="after"
              onClick={() => setPage(page + 1)}
              disabled={page === endPage}
            >
              &gt;
            </button>
          </PaginationWrapper>
          <p className="page-text">
            {endPage} 페이지 중 {page} 페이지
          </p>
        </>
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
        cursor: pointer;
      }
      .book-publisher {
        font-size: 1.2rem;
        color: ${color.medium_gray2};
        margin: 0.5rem 0;
      }
    }
  }
  .page-text {
    margin-bottom: 5rem;
    font-size: 1.2rem;
  }
`;

const PaginationWrapper = styled.nav`
  ${flexCenter}
  margin-top: 2rem;
  margin-bottom: 1rem;

  button {
    border: none;
    border-radius: 50%;
    padding: 1rem 1.4rem;
    background: white;
    font-size: 1.4rem;
    font-weight: 500;
    color: black;
    margin: 0 0.3rem;
    &:hover {
      background: rgb(240, 240, 240);
      cursor: pointer;
    }

    &[aria-current] {
      background: ${color.Main};
      color: white;
      font-weight: bold;
      cursor: revert;
      transform: revert;
    }
  }
`;
