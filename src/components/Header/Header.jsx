import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../svg/logo.svg";
import { ReactComponent as Search } from "../../svg/ic-search.svg";
import {
  blackButton,
  color,
  flexCenter,
  mainColorButton,
  whiteButton,
} from "../style/theme";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onClickNavigate = (e) => {
    if (e.target.name === "logo") navigate("/");
    if (e.target.name === "auth") navigate(`/auth/${e.target.value}`);
    if (e.target.name === "users") navigate(`/users`);
    if (e.target.name === "collect") navigate("/collect");
  };

  const onInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
    }
  };
  // 로그인 유무 임시판별
  const [isLogin, setIsLogin] = useState(localStorage.getItem("jwt"));
  return (
    <HeaderWrapper>
      <div>
        <LogoStyle onClick={() => navigate("/")} name="logo" />
        <div className="search-auth">
          <div className="search">
            <SearchStyle />
            <input
              type="search"
              placeholder="책 이름, 저자, 출판사로 검색해보세요."
              onChange={onInputSearch}
              onKeyPress={onSubmitSearch}
              value={search}
            />
          </div>
          {!isLogin ? (
            // 로그인 안했을 때
            <>
              <button
                className="register"
                onClick={onClickNavigate}
                value="register"
                name="auth"
              >
                회원가입
              </button>
              <button
                className="login"
                onClick={onClickNavigate}
                value="login"
                name="auth"
              >
                로그인
              </button>
            </>
          ) : (
            // 로그인 했을 때
            <>
              <button
                className="move-record"
                name="collect"
                onClick={onClickNavigate}
              >
                모아보기
              </button>
              <img
                onClick={onClickNavigate}
                className="user"
                name="users"
                src="https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_small-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg"
              />
            </>
          )}
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
  position: sticky;
  top: 0;
  z-index: 100;

  & > div {
    width: 92.5%;
    ${flexCenter}
    justify-content: space-between;
  }
  .search-auth {
    ${flexCenter}
    input {
      width: 29rem;
      border: none;
      border-radius: 0.5rem;
      background: ${color.light_gray2};
      box-sizing: border-box;
      padding: 1rem 1rem 1rem 3.5rem;
      margin-right: 1rem;
      font-size: 1.4rem;
      color: ${color.dark_gray2};
      &:focus {
        outline: none;
      }
    }
    .register {
      ${mainColorButton}
    }
    .login {
      ${whiteButton}
    }
    // 로그인 시
    .move-record {
      ${whiteButton}
      color: ${color.dark_gray};
    }

    .user {
      border: 1px solid ${color.medium_gray};
      border-radius: 50%;
      width: 3.3rem;
      height: 3.3rem;
      cursor: pointer;
    }
  }
  .search {
    position: relative;
  }
`;

const LogoStyle = styled(Logo)`
  cursor: pointer;
  fill: ${color.Main};
`;

const SearchStyle = styled(Search)`
  position: absolute;
  top: 50%;
  transform: translateY(-55%);
  left: 1.2rem;
`;
