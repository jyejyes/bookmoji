import React from "react";
import styled from "styled-components";
import { color } from "../style/theme";

const MainSubject = ({ content }) => {
  return <Subject>{content}</Subject>;
};

export default MainSubject;
const Subject = styled.h1`
  font-size: 4rem;
  font-family: LeferiBaseType-BoldA;
  color: ${color.Main};
  width: 40rem;
  margin: 1.5rem 0;
  text-align: center;
  word-break: keep-all;
  line-height: 5.5rem;
`;
