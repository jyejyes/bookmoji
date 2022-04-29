import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const color = {
  Main: "#D8837A",
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
  padding: 0.8rem 1rem;
  color: ${color.white};
  background: ${color.black};
  &:hover {
    background: ${color.dark_gray2};
  }
  &:focus {
    outline: none;
  }
`;

export const whiteButton = css`
  font-family: "LeferiBaseType-RegularA";
  margin-right: 1rem;
  border-radius: 3rem;
  padding: 0.8rem 1rem;
  background: ${color.white};
  color: ${color.black};
  &:hover {
    background: ${color.light_gray};
  }
  &:focus {
    outline: none;
  }
`;

export const mainColorButton = css`
  font-family: "LeferiBaseType-RegularA";
  margin-right: 1rem;
  border-radius: 3rem;
  padding: 0.8rem 1rem;
  background: ${color.Main};
  color: ${color.white};
`;

export const authLabel = css`
  font-size: 1.3rem;
  font-weight: 800;
  margin: 1rem;
`;

export const authInput = css`
  ${whiteButton}
  border: 1px solid ${color.medium_gray2};
  width: 100%;
  font-size: 1.5rem;
  padding: 1.3rem 2rem;
  box-sizing: border-box;
  margin-bottom: 1rem;
  &:hover {
    background: ${color.white};
  }
  &:focus {
    border: 1px solid ${color.Main};
  }
`;

export const authButton = css`
  ${mainColorButton}
  border: 1px solid ${color.Main};
  padding: 1.3rem 2rem;
  font-size: 1.5rem;
  width: 100%;
  &:focus {
    outline: none;
  }
`;
