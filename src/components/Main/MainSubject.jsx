import React from "react";
import styled from "styled-components";
import { color, device } from "../style/theme";

const MainSubject = ({ content }) => {
  return <Subject>{content}</Subject>;
};

export default MainSubject;
const Subject = styled.h1`
  font-size: 4rem;
  font-family: LeferiBaseType-BoldA;
  color: ${color.Main};
  text-align: center;
  word-break: keep-all;
  margin-bottom: 2rem;

  @media ${device.tablet} {
    font-size: 3.4rem;
    margin-bottom: 1.6rem;
  }

  @media ${device.mobile} {
    font-size: 2.8rem;
    margin-bottom: 1.2rem;
  }
`;
