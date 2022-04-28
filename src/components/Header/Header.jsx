import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../svg/logo.svg";
import { blackButton, color, flexCenter, whiteButton } from "../style/theme";

const Header = () => {
  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate("/");
  };

  const onClickAuth = (e) => {
    navigate(`/auth/${e.target.value}`);
  };

  return (
    <HeaderWrapper>
      <div>
        <LogoStyle onClick={onClickLogo} />
        <div className="auth">
          <button onClick={onClickAuth} value="register">
            회원가입
          </button>
          <button onClick={onClickAuth} value="login">
            로그인
          </button>
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
