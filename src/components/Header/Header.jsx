import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../svg/logo.svg";
import { blackButton, color, flexCenter, whiteButton } from "../style/theme";

const Header = () => {
  return (
    <HeaderWrapper>
      <div>
        <LogoStyle />
        <div className="auth">
          <button>회원가입</button>
          <button>로그인</button>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  box-shadow: 1px 1px 0.5em 1px #efefef;
  background: white;
  ${flexCenter}
  position:sticky;

  & > div {
    width: 95%;
    ${flexCenter}
    justify-content: space-between;
  }
  .auth {
    & > button {
      ${whiteButton}
      &:nth-child(1) {
        ${blackButton}
      }
    }
  }
`;

const LogoStyle = styled(Logo)`
  cursor: pointer;
`;
