import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../svg/logo.svg";
import SearchBar from "../common/SearchBar";
import {
  color,
  device,
  flexCenter,
  mainColorButton,
  whiteButton,
} from "../style/theme";

const Header = () => {
  //react
  const navigate = useNavigate();

  //state
  const profileUrl = localStorage.getItem("profileUrl") ?? "";

  const onClickNavigate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.currentTarget as HTMLButtonElement;

    if (name === "logo") navigate("/");
    if (name === "auth") navigate(`/auth/${value}`);
    if (name === "users") navigate(`/users`);
    if (name === "collect") navigate("/collect");
  };

  // 로그인 유무 임시판별
  const [isLogin] = useState(localStorage.getItem("jwt"));

  return (
    <>
      <HeaderWrapper>
        <div>
          <LogoStyle onClick={() => navigate("/")} name="logo" />
          <div className="search-auth">
            <div className="search">
              <SearchBar />
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
                {profileUrl ? (
                  <button
                    onClick={onClickNavigate}
                    className="user"
                    name="users"
                  >
                    <img src={profileUrl} alt="사진" />
                  </button>
                ) : (
                  <button
                    onClick={onClickNavigate}
                    className="user"
                    name="users"
                  >
                    <img
                      src="https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_small-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg"
                      alt="사진"
                    />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </HeaderWrapper>
    </>
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
  @media ${device.mobile} {
    background: ${color.Main};
    box-shadow: 0px 0px 0px 0px #efefef;
  }

  & > div {
    width: 92.5%;
    ${flexCenter}
    justify-content: space-between;
  }
  .search-auth {
    ${flexCenter}

    .search {
      @media ${device.mobile} {
        display: none;
      }
    }

    .register {
      ${mainColorButton}
      @media ${device.mobile} {
        font-size: 1.3rem;
        ${whiteButton}
      }
    }
    .login {
      ${whiteButton}
      @media ${device.mobile} {
        font-size: 1.3rem;
        ${mainColorButton}
        &:hover {
          background: ${color.Main};
        }
      }
    }
    // 로그인 시
    .move-record {
      ${whiteButton}
      color: ${color.Main};
      font-size: 1.4rem;
      @media ${device.mobile} {
        display: none;
      }
    }

    .user {
      border: 1px solid ${color.medium_gray};
      border-radius: 50%;
      width: 3.3rem;
      height: 3.3rem;
      cursor: pointer;

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      @media ${device.mobile} {
        display: none;
      }
    }
  }
  .search {
    position: relative;
  }
`;

const LogoStyle = styled(Logo)`
  cursor: pointer;
  fill: ${color.Main};
  width: 6rem;
  @media ${device.mobile} {
    font-size: 1.2rem;
    width: 5.5rem;
    fill: white;
  }
`;
