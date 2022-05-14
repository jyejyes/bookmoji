// 사용안함
import React from "react";
import styled from "styled-components";
import { color, flexCenter } from "../style/theme";

const Pagination = ({ total, limit, page, setPage }) => {
  //props: total(총 게시물 수), limit(페이지당 게시물 수), page(현재 페이지 번호)
  const numPages = Math.ceil(total / limit);
  return (
    <PaginationWrapper>
      <button className="before" onClick={() => setPage(page - 1)}>
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            className="current"
            key={i + 1}
            onClick={() => setPage(i + 1)}
            aria-current={page === i + 1 ? "page" : null}
          >
            {i + 1}
          </button>
        ))}
      <button className="after" onClick={() => setPage(page + 1)}>
        &gt;
      </button>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.nav`
  ${flexCenter}
  margin-top: 2rem;
  margin-bottom: 7rem;

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
