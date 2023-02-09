import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { bookSearch } from "../api/bookSearch";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Modal from "../components/common/Modal";
import NavBar from "../components/common/NavBar";
import FooterSection from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { color, device, flexCenter } from "../components/style/theme";
import { queryKeys } from "../constant/queryKeys";
import { addRecentSearch } from "../store/actions/recentSearch";
import { KakaoBook } from "../type/type";

const SearchPage = () => {
  const { bookName } = useParams(); //url 에서 책 제목

  const [isbn, setIsbn] = useState(""); //책 고유 isbn 값
  const [isModalOpen, setIsModalOpen] = useState(false); //책 상세 모달 토글 state

  //페이지네이션
  const limit = 24; // 한페이지에 보여줄 갯수
  const [page, setPage] = useState(1); //현재 페이지
  const [endPage, setEndPage] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRecentSearch(bookName));
  }, [bookName]);

  /**
   * @GET 카카오 책 검색 api
   */
  const { data: bookDatas, isLoading } = useQuery(
    [queryKeys.KAKAO_BOOKS_KEY, { bookName, page }],
    () => bookSearch({ query: bookName, page: page, size: limit }),
    {
      keepPreviousData: true,
      select: (bookDatas) => bookDatas?.data,
      onSuccess: () => {
        if (bookDatas?.documents) {
          setEndPage(Math.ceil(bookDatas?.meta?.pageable_count / limit));
        }
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  //모달 열고 닫는 함수
  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  //책 클릭해서 감상평 모달 여는 함수, 이 때 isbn 값 잘라서 저장함
  const handleClickBook = (isbn: string) => {
    setIsbn(isbn.split(" ")[1]);
    handleModalOpen();
  };

  return (
    <SearchWrapper>
      <Header />
      <section>
        <p className="result-text">"{bookName}" 의 검색결과</p>
      </section>

      {isLoading ? (
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
          {!bookDatas?.documents ? (
            <p className="no-result">
              검색 결과가 없습니다. 다른 검색어로 검색해보세요
            </p>
          ) : (
            bookDatas?.documents?.map((item: KakaoBook, index: number) => (
              <div key={index} className="each-book">
                <div className="book-image">
                  <img
                    src={
                      item.thumbnail
                        ? `${item.thumbnail}`
                        : "https://img.ypbooks.co.kr/ypbooks/images/empty70x100.gif"
                    }
                    alt="책 사진"
                    onClick={() => handleClickBook(item.isbn)}
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
      {bookDatas?.documents && (
        <>
          <PaginationWrapper>
            <button
              className="before-10"
              onClick={() => setPage(page - 10)}
              disabled={page === 1}
            >
              &lt;&lt;
            </button>
            <button
              className="before"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              &lt;
            </button>

            {Array(endPage > 10 ? 10 : endPage)
              .fill(0)
              .map((_, i) => (
                <button key={i + 1} onClick={() => setPage(i + 1)}>
                  {i + 1 + 10 * Math.floor((page - 1) / 10)}
                </button>
              ))}
            <button
              className="after"
              onClick={() => setPage(page + 1)}
              disabled={page === endPage}
            >
              &gt;
            </button>
            <button
              className="after-10"
              onClick={() => setPage(page + 10)}
              disabled={page === endPage}
            >
              &gt;&gt;
            </button>
          </PaginationWrapper>
          <p className="page-text">
            {endPage} 페이지 중 {page} 페이지
          </p>
        </>
      )}
      <FooterSection />
      <NavBar />
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
    margin: 4rem 0;

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

    @media ${device.tablet} {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 1rem 1.5rem;
    }
    @media ${device.mobile} {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 3rem 2rem;
    }
  }
  .page-text {
    margin-bottom: 5rem;
    font-size: 1.2rem;

    @media ${device.mobile} {
      display: none;
    }
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
  }
  @media ${device.mobile} {
    display: none;
  }
`;
