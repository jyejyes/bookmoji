import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { color, flexCenter } from "../style/theme";
import MainDisscription from "./MainDiscription";
import MainSubject from "./MainSubject";
import { ReactComponent as Like } from "../../svg/ic-heart.svg";

const OtherReview = () => {
  const userIdx = localStorage.getItem("userIdx");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("");
  const [isLogin, setIsLogin] = useState(!!userIdx);

  const [hasLiked, setHasLiked] = useState(false);

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

  const handleClickLiked = (e) => {
    setHasLiked(!hasLiked);
    console.log(e.target);
  };

  useEffect(() => {
    if (userIdx) {
      otherReviewApi();
    }
  }, []);

  return (
    <Wrapper>
      {/* 로그인 됐을 때 */}
      {isLogin &&
        (!result ? (
          <></>
        ) : (
          <>
            <MainSubject content="다른 사람의 감상을 구경할 수 있어요" />
            <MainDisscription content="리뷰에 남겨진 감상에 공감한다면 하트를 눌러주세요 !" />
            <BooksStyle>
              {result.map((item, index) => (
                <div className="book" key={item.reviewIdx}>
                  <div className="img">
                    <img src={item.thumbnailUrl} alt="책 이미지" />
                  </div>

                  <div className="title-content">
                    <h3 className="title">{item.title}</h3>
                    <p className="author">{item.author}작가님</p>
                    <span className="emoji">{item.emoji.split(" ")[0]}</span>
                    <p className="text">{item.text}...</p>
                  </div>
                </div>
              ))}
            </BooksStyle>
          </>
        ))}

      {/* 로그인 안됐을 때 */}
      {!isLogin && (
        // 여기에 사진 넣기
        <>
          <MainSubject content="다른 사람의 리뷰에 공감할 수 있어요" />
          <MainDisscription content="리뷰에 공감가는 내용이 있다면 공감을 표시해주세요 !" />
          <MainDisscription content="본 기능은 로그인 후 이용할 수 있습니다." />
        </>
      )}
    </Wrapper>
  );
};

export default OtherReview;

const Wrapper = styled.div`
  width: 100%;
  ${flexCenter}
  flex-direction: column;
  padding-bottom: 10rem;

  .non-login-others {
    padding: 1rem;
    font-size: 2rem;
  }
`;

const BooksStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin-top: 5rem;
  .book {
    border: 1.5px solid ${color.light_gray2};
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    position: relative;
    height: 15vw;

    img {
      margin-right: 0.5rem;
      width: 10.4vw;
    }
    .title-content {
      padding: 1.2rem;
      .title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        line-height: 2.2rem;
      }
      .emoji {
        font-size: 2rem;
      }
      .emoji-text {
        font-size: 1.4rem;
      }

      .author {
        color: ${color.dark_gray};
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }
      .text {
        margin-top: 1rem;
        font-size: 1.3rem;
        line-height: 2rem;
        margin-bottom: 1rem;
      }
    }
  }
`;

const LikeButton = styled(Like)`
  position: absolute;
  bottom: 5%;
  right: 2%;
  width: 3rem;
  fill: ${(props) => (props.liked ? `${color.Main}` : "transparent")};
  stroke: ${color.Main};
  stroke-width: 5px;
  cursor: pointer;
  z-index: 100;
`;
