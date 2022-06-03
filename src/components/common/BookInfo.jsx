import React from "react";
import styled from "styled-components";
import { color, device, whiteButton } from "../style/theme";

const BookInfo = ({
  thumbnail,
  title,
  datetime,
  author,
  publisher,
  contents,
  url,
}) => {
  return (
    <BookInfoWrapper>
      <img src={thumbnail} alt="" />
      <div>
        <h2>{title}</h2>
        <p>
          {datetime} • {author} 작가님• {publisher}
        </p>
        <h3>{contents}...</h3>
        <button>
          <a href={url} target="_blank">
            책 자세히 보러가기
          </a>
        </button>
      </div>
    </BookInfoWrapper>
  );
};
export default BookInfo;

const BookInfoWrapper = styled.section`
  display: flex;
  // width 값을 지정하고 반응형 될때마다 변경할지 그냥 fit 하게 둘지 고민중
  width: 60vw;
  margin-bottom: 2rem;

  @media ${device.tablet} {
    width: 80vw;
  }
  @media screen and (max-width: 780px) {
    width: 85vw;
  }

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
      word-break: keep-all;
      line-height: 2.2rem;
      @media ${device.mobile} {
        font-size: 2rem;
        line-height: 2.3rem;
      }
    }
    & > p {
      color: ${color.medium_gray2};
      font-size: 1.4rem;
      margin: 1rem 0;
      line-height: 2rem;
      word-break: keep-all;
      @media ${device.mobile} {
        font-size: 1.3rem;
        line-height: 1.8rem;
      }
    }
    & > h3 {
      color: ${color.dark_gray2};
      font-size: 1.2rem;
      line-height: 2rem;

      @media screen and (max-width: 780px) {
        display: none;
      }
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
`;
