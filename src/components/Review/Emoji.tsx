import React from "react";
import styled from "styled-components";
import { color, device } from "../style/theme";

interface Props {
  selectedEmoji: string;
  value: string;
  handleClickEmoji: (e: React.MouseEvent<HTMLButtonElement>) => void;
  emo: string;
  text: string;
}

const Emoji = ({
  selectedEmoji,
  value,
  handleClickEmoji,
  emo,
  text,
}: Props) => {
  return (
    <EmojiStyle
      value={value}
      onClick={handleClickEmoji}
      state={selectedEmoji === value}
    >
      {emo}
      <p className="emo-text">{text}</p>
    </EmojiStyle>
  );
};

export default Emoji;

const EmojiStyle = styled.button<{ state: boolean }>`
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
