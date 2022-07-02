import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { ReactComponent as KaKao } from "../../svg/ic-kakao.svg";
import { color } from "../style/theme";

const Oauth = () => {
  console.log(process.env.REACT_APP_CLIENT_KEY);
  const navigate = useNavigate();
  //url에서 인가 code 값 가져오기
  const code = new URL(window.location.href).searchParams.get("code");
  const API_KEY = process.env.REACT_APP_KAKAO_REST_API;
  const REDIRECT_URI = "http://localhost:3000/oauth";
  //   const REDIRECT_URI = "https://bookmoji.netlify.app/oauth";

  useEffect(() => {
    OauthKakaoLogin();
  }, []);

  //엑세스 토큰 받아오기

  //카카오 로그인 api
  const OauthKakaoLogin = async () => {
    try {
      const res = await apiClient.post(`users/oauth/kakao?token=${code}`);
      console.log(res);
      if (res.data.isSuccess) {
        localStorage.setItem("jwt", res.data.result.jwt);
        localStorage.setItem("userIdx", res.data.result.userIdx);
        localStorage.setItem("profileUrl", res.data.result.profileImgUrl);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <OauthStyle>
      <p>카카오 로그인 중입니다. 잠시만 기다려주세요</p>
    </OauthStyle>
  );
};

export default Oauth;

const OauthStyle = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  p {
    font-size: 1.4rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
