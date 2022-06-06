import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter } from "../style/theme";
import MainDisscription from "./MainDiscription";
import MainSubject from "./MainSubject";

const Introduce = () => {
  return (
    <Wrapper>
      <MainSubject content="독서 후기에 감정만" />
      <MainSubject content="담아보세요" />
      <MainDisscription content="매번 달라지던 별점이 아닌" />
      <MainDisscription content="온전한 당신의 마음을 담아보세요 !" />
      <img src="https://velog.velcdn.com/images/jh100m1/post/21355425-26ff-4964-a69a-d8446af9fcb9/image.png" />
    </Wrapper>
  );
};

export default Introduce;

const Wrapper = styled.div`
  width: 100%;
  margin: 3rem 0 5rem 0;
  ${flexCenter}
  flex-direction: column;

  img {
    width: 100%;
    margin: 3rem 0;
  }
`;
