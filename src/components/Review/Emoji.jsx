import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { color, device } from "../style/theme";

const Emoji = ({ name, value, emo, handleClickEmoji, text, state }) => {
  return (
    <EmojiStyle
      name={name}
      value={value}
      onClick={handleClickEmoji}
      state={state}
    >
      {emo}
      <p className="emo-text">{text}</p>
    </EmojiStyle>
  );
};

export default Emoji;

const EmojiStyle = styled.button`
  font-size: 4rem;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background: ${(props) => (props.state ? `${color.light_gray2}` : "white")};

  &:hover {
    background: ${color.light_gray2};
  }

  .emo-text {
    font-size: 1.1rem;
    color: ${color.black};
    word-break: keep-all;
    z-index: -10;
  }

  @media ${device.mobile} {
    font-size: 3.4rem;
  }
`;
