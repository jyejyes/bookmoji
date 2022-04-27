import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { bookSearch } from "../../api/bookSearch";
import { blackButton, color, flexCenter } from "../style/theme";

const Main = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      onGetBooks(query);
    }
  }, [query]);

  const onGetBooks = async (query) => {
    const params = {
      query: query,
      page: 1,
      size: 10,
    };
    const resultData = await bookSearch(params);
    console.log(resultData);
  };

  const onChangeInput = (e) => {
    setQuery(e.target.value);
  };

  return (
    <MainNonLoginWrapper>
      <div>
        <h1>별점 대신 이모지로 독서의 감상을 기록해주세요 ✍🏻</h1>
        <h3>
          기준이 없어서 매번 별점이 달라지지 않았나요?<br></br>아니면 별점을 꼭
          써야하나 생각했나요?
        </h3>
        <input
          type="text"
          placeholder="📚 책 이름을 검색해보세요"
          value={query}
          onChange={onChangeInput}
        />
      </div>
    </MainNonLoginWrapper>
  );
};

export default Main;

const MainNonLoginWrapper = styled.div`
  div {
    width: 100%;
    ${flexCenter}
    flex-direction: column;
  }
  h1 {
    font-family: "LeferiBaseType-BoldA";
    font-size: 4rem;
    text-align: center;
    line-height: 6rem;
    margin: 5rem 0rem 1rem 0rem;
  }
  h3 {
    font-family: "LeferiPoint-WhiteA";
    text-align: center;
    font-size: 1.8rem;
    line-height: 3rem;
  }
  button {
    ${blackButton}
    font-size: 1.8rem;
    padding: 1.5rem 2rem;
    margin: 2rem 0;
  }
  input {
    width: 80rem;
    border-radius: 5rem;
    box-sizing: border-box;
    margin: 2rem 0;
    padding: 1.5rem;
    border: 2px solid ${color.dark_gray};
    font-size: 2rem;
    text-align: center;

    &:focus {
      outline: none;
    }
  }
`;
