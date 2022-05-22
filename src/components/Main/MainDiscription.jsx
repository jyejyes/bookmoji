import React from "react";
import styled from "styled-components";
import { color } from "../style/theme";

const MainDisscription = ({ content }) => {
  return <Discription>{content}</Discription>;
};

export default MainDisscription;
const Discription = styled.h3`
  font-size: 2.2rem;
  font-family: "LeferiPoint-WhiteA";
  color: ${color.dark_gray2};
  width: 50%;
  text-align: center;
  word-break: keep-all;
  line-height: 3.5rem;
`;
