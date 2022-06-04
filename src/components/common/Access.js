import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

export default function (Compo, option) {
  const navigate = useNavigate();
  function AuthCheck(props) {
    let isAuth = localStorage.getItem("jwt");

    if (isAuth !== null) {
      //로그인 되었을 때 막으려면 메인으로 냅다 보냄..
      if (option === false) {
        navigate("/");
      }
    } else {
      //로그인 안됐을 때
      // option 값이 있는 곳으로 이동하면
      // (=로그인 해야 접근 권한 있는 곳으로 가면)
      if (option) {
        navigate("/auth/login");
      }
    }

    return <Compo {...props} />;
  }
  return AuthCheck;
}
