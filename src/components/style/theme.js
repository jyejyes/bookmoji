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
  light_gray2: "#f0f0f0",
  dark_gray: "#777777",
  dark_gray2: "#484848",
  medium_gray: "#dddddd",
  medium_gray2: "#989898",
  red: "",
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
  margin-bottom: 1rem;
  box-sizing: border-box;
  &:hover {
    background: ${color.white};
  }
  &:focus {
    border: 1px solid ${color.Main};
  }
  &::placeholder {
    color: ${color.medium_gray2};
    font-family: "LeferiPoint-WhiteA";
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

export const userSubject = css`
  font-family: "LeferiBaseType-BoldA";
  font-size: 1.6rem;
`;

export const userButton = css`
  box-sizing: border-box;
  font-size: 1.5rem;
  border: 1px solid ${color.medium_gray2};
  border-radius: 1rem;
  color: ${color.dark_gray2};
  padding: 1rem 2rem;
  backgruond: ${color.white};

  &:active {
    transform: scale(0.96);
  }
`;

export const userText = css`
  font-size: 1.5rem;
  color: ${color.medium_gray2};
  margin: 2rem 0;
`;

export const changeInput = css`
  border: 1px solid ${color.medium_gray};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  padding: 1rem 1.2rem;

  &:focus {
    border: 1px solid ${color.Main};
    outline: none;
  }
`;

export const size = {
  mobile: "480px",
  tablet: "1024px",
  desktop: "1440px",
};

export const device = {
  mobile: `screen and (max-width: ${size.mobile})`,
  tablet: `screen and (max-width: ${size.tablet})`,
  desktop: `screen and (max-width: ${size.desktop})`,
};
