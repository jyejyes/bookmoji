import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { queryKeys } from "../../constant/queryKeys";
import { OtherReviewProps } from "../../type/type";
import { color, device, flexCenter } from "../style/theme";
import LikeButton from "./LikeButton";
import MainDisscription from "./MainDiscription";
import MainSubject from "./MainSubject";

const OtherReview = () => {
  const userIdx = localStorage.getItem("userIdx");

  const [isLogin] = useState<boolean>(!!userIdx);

  //15 : 다른 유저들 리뷰 조회 api
  const { data: otherReviewData } = useQuery(
    [queryKeys.OTHER_REVIEW_KEY],
    () => apiClient.get(`reviews/others?userIdx=${userIdx}`),
    {
      enabled: !!userIdx,
      select: (otherReviewData) => otherReviewData.data.result,
      onError: (e) => console.log(e),
    }
  );

  return (
    <Wrapper>
      {/* 로그인 됐을 때 */}
      {isLogin && otherReviewData ? (
        <>
          <MainSubject content="다른 사람의 감상을" />
          <MainSubject content="구경할 수 있어요" />
          <MainDisscription content="감상에 공감한다면 하트를 눌러주세요 !" />
          <BooksStyle>
            {otherReviewData?.map((item: OtherReviewProps) => (
              <div className="book" key={item.reviewIdx}>
                <div className="img">
                  <img src={item.thumbnailUrl} alt="책 이미지" />
                </div>
                <LikeButton
                  reviewIdx={item.reviewIdx}
                  hasLiked={!!item.hasLiked}
                />
                <div className="title-content">
                  <h3 className="title">{item.title}</h3>
                  <p className="author">{item.author} 작가님</p>
                  <span className="emoji">{item.emoji.split(" ")[0]}</span>
                  <p className="text">{item.text}</p>
                </div>
              </div>
            ))}
          </BooksStyle>
        </>
      ) : (
        <></>
      )}

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
`;

const BooksStyle = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  margin-top: 5rem;

  .book {
    border: 1.5px solid ${color.light_gray2};
    border-radius: 0.5rem;
    width: 100%;
    padding-bottom: 55%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 4fr 6fr;
    position: relative;

    .img {
      width: 40%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }

    img {
      margin-right: 0.5rem;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .title-content {
      width: 60%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      overflow-y: scroll;
      padding: 1.2rem;

      /* 스크롤 없애기 */
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }

      .title {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        line-height: 2.2rem;

        @media ${device.tablet} {
          font-size: 1.4rem;
          line-height: 2rem;
        }
        @media ${device.mobile} {
          font-size: 1.3rem;
          line-height: 1.7rem;
        }
      }
      .emoji {
        font-size: 2rem;
        @media ${device.tablet} {
          font-size: 1.8rem;
        }
      }
      .emoji-text {
        font-size: 1.4rem;
      }

      .author {
        color: ${color.dark_gray};
        font-size: 1.2rem;
        margin-bottom: 1rem;
        @media ${device.tablet} {
          font-size: 1.1rem;
        }
        @media ${device.mobile} {
          font-size: 1.1rem;
        }
      }
      .text {
        margin-top: 1rem;
        font-size: 1.3rem;
        line-height: 2rem;
        margin-bottom: 1rem;
        @media ${device.mobile} {
          font-size: 1.2rem;
        }
      }
    }
  }

  //태블릿
  @media ${device.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
  }

  //모바일
  @media ${device.mobile} {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
  }
`;
