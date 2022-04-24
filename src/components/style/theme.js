import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const color = {
  Main: "#f53a57",
  black: "#151515",
  white: "#FFFFFF",
  light_gray: "#f5f5f5",
  light_gray2: "#eeeeee",
  dark_gray: "#555555",
  dark_gray2: "#333333",
  medium_gray: "#dddddd",
  medium_gray2: "#8c8c8c",
};

export const blackButton = css`
  font-family: "LeferiBaseType-RegularA";
  margin-right: 1rem;
  border-radius: 2.5rem;
  padding: 1rem 1.2rem;
  color: ${color.white};
  background: ${color.black};
  &:hover {
    background: ${color.dark_gray2};
  }
`;

export const whiteButton = css`
  font-family: "LeferiBaseType-RegularA";
  margin-right: 1rem;
  border-radius: 3rem;
  padding: 1rem 1.2rem;
  background: ${color.white};
  color: ${color.black};
  &:hover {
    background: ${color.light_gray};
  }
`;
