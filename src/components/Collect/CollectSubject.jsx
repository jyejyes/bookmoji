import React from "react";
import styled from "styled-components";
import { color, flexCenter } from "../style/theme";

const CollectSubject = ({ content }) => {
  return (
    <Wrapper>
      <SubjectText>{content}</SubjectText>
    </Wrapper>
  );
};

export default CollectSubject;

const Wrapper = styled.div`
  width: 100%;
  ${flexCenter}
  justify-content: space-between;
`;
const SubjectText = styled.h2`
  font-size: 2rem;
  font-family: "LeferiBaseType-BoldA";
  margin: 1rem 0 3rem 0;
  color: ${color.black};
`;
