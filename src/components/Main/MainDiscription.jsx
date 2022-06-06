import React from "react";
import styled from "styled-components";
import { color, device } from "../style/theme";

const MainDisscription = ({ content }) => {
  return <Discription>{content}</Discription>;
};

export default MainDisscription;
const Discription = styled.h3`
  font-size: 2rem;
  color: ${color.dark_gray2};
  width: 90%;
  text-align: center;
  word-break: keep-all;
  line-height: 3.5rem;

  @media ${device.tablet} {
    font-size: 1.8rem;
    line-height: 3rem;
  }

  @media ${device.mobile} {
    font-size: 1.5rem;
    line-height: 2.2rem;
  }
`;
