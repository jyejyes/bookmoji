import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { bookSearch } from "../../api/bookSearch";
import { blackButton, color, flexCenter } from "../style/theme";

const Main = () => {
  return (
    <MainNonLoginWrapper>
      <div>
        <h1>메인화면</h1>
      </div>
    </MainNonLoginWrapper>
  );
};

export default Main;

const MainNonLoginWrapper = styled.div`
  ${flexCenter}
  & > div {
    width: 90%;
  }
  h1 {
    margin-top: 4rem;
    font-size: 2.5rem;
  }
  h3 {
    font-family: "LeferiPoint-WhiteA";
    font-size: 1.6rem;
    margin-top: 0.5rem;
    line-height: 3rem;
  }
  button {
    ${blackButton}
    font-size: 1.8rem;
    padding: 1.5rem 2rem;
    margin: 2rem 0;
  }
  input {
    width: 50rem;
    border-radius: 1rem;
    box-sizing: border-box;
    font-family: "LeferiPoint-WhiteA";
    margin-top: 1rem;
    margin-bottom: 3rem;
    padding: 1.2rem 1.5rem;
    border: 1px solid ${color.dark_gray};
    font-size: 1.6rem;

    &::placeholder {
      color: ${color.medium_gray2};
    }

    &:focus {
      outline: none;
      border: 1px solid ${color.Main};
    }
  }
`;
