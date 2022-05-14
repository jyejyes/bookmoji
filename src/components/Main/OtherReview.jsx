import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { color } from "../style/theme";

const OtherReview = () => {
  const userIdx = localStorage.getItem("userIdx");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [isLogin, setIsLogin] = useState(!!userIdx);

  const navigate = useNavigate();

  //15 : 다른 유저들 리뷰 조회 api
  const otherReviewApi = async () => {
    try {
      const res = await apiClient.get(`reviews/others?userIdx=${userIdx}`);
      setResult(res.data.result);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userIdx) otherReviewApi();
  }, []);

  return (
    <Wrapper>
      {/* 로그인 됐을 때 */}
      {isLogin &&
        (result.length === 0 ? (
          <></>
        ) : (
          <BooksStyle>
            {result.map((item, index) => (
              <div className="book">
                <img src={item.thumbnailUrl} alt="책 이미지" />
                <div className="title-content">
                  <h3 className="title">{item.title}</h3>
                  <p className="author">{item.author}작가님</p>
                  <span className="emoji">{item.emoji.split(" ")[0]}</span>
                  <p className="text">{item.text}</p>
                </div>
              </div>
            ))}
          </BooksStyle>
        ))}

      {/* 로그인 안됐을 때 */}
      {!isLogin && (
        <button className="non-login-others">다른 사람 리뷰 보러가기</button>
      )}
    </Wrapper>
  );
};

export default OtherReview;

const Wrapper = styled.div`
  width: 100%;

  .non-login-others {
    padding: 1rem;
    font-size: 2rem;
  }
`;

const BooksStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  .book {
    border: 1.5px solid ${color.medium_gray};
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;

    img {
      width: 13rem;
      border-radius: 0.5rem;
      margin-right: 1rem;
    }
    .title-content {
      padding: 1.5rem;
      .title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        line-height: 2.5rem;
      }
      .emoji {
        font-size: 2.5rem;
      }

      .author {
        color: ${color.dark_gray};
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }
      .text {
        margin-top: 1rem;
        font-size: 1.3rem;
        line-height: 2rem;
      }
    }
  }
`;
