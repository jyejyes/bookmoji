import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {
  authButton,
  authInput,
  authLabel,
  color,
  flexCenter,
} from "../style/theme";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [error, setError] = useState("");

  //회원가입 api
  const registerApi = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("https://bookmoji.site/users/signup", data);
      setLoading(false);
      // 로딩 끝나면
      if (!loading) {
        setResultData(res);
      }
      // 분기
      if (res.data.code === 1000) navigate("/auth/login");
      if (res.data.code === 2017) alert("이미 가입된 이메일입니다");
    } catch (e) {
      console.log(e);
    }
  };

  //react-form-hook 라이브러리
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = (data) => {
    registerApi({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    });
  };

  const onError = (error) => {
    console.log(error);
  };

  const pw = useRef();
  pw.current = watch("password");

  return (
    <RegisterWrapper>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>이메일</label>
        <input
          type="text"
          placeholder="abcd@gmail.com"
          name="email"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "이메일 형식에 맞게 작성해주세요",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        <label>비밀번호</label>
        <input
          autoComplete="off"
          type="password"
          placeholder="영문, 숫자의 조합으로 8자 이상 입력해주세요"
          name="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "최소 8자 이상의 비밀번호를 입력해주세요.",
            },

            pattern: {
              value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/,
              message: "영문, 숫자를 혼용해서 입력해주세요.",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
        <label>비밀번호 확인</label>
        <input
          autoComplete="off"
          type="password"
          placeholder="비밀번호와 동일하게 입력해주세요"
          name="psCheck"
          {...register("psCheck", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) => value === pw.current,
          })}
        />
        {errors.psCheck && errors.psCheck.type == "validate" && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
        <label>닉네임</label>
        <input
          type="text"
          placeholder="닉네임을 두 글자 이상으로 입력해주세요"
          name="password"
          {...register("nickname", {
            required: "닉네임을 입력해주세요.",
            minLength: {
              value: 2,
              message: "두 글자 이상 입력해주세요",
            },
          })}
        />{" "}
        {errors.nickname && (
          <ErrorMessage>{errors.nickname.message}</ErrorMessage>
        )}
        <button>가입하기</button>
      </form>
    </RegisterWrapper>
  );
};

export default Register;

const RegisterWrapper = styled.div`
  ${flexCenter}
  flex-direction:column;

  h1 {
    font-size: 3rem;
    margin-bottom: 3rem;
  }
  label {
    ${authLabel}
  }
  form {
    display: flex;
    flex-direction: column;
    width: 40rem;
    input {
      ${authInput}
    }
  }

  button {
    ${authButton}
    margin-top:2rem;
  }
`;

const ErrorMessage = styled.p`
  color: ${color.Main};
  margin: 0rem 0rem 1rem 1rem;
  font-size: 1.2rem;
`;
