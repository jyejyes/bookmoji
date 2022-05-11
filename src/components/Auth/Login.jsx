import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  authButton,
  authInput,
  authLabel,
  color,
  flexCenter,
} from "../style/theme";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [error, setError] = useState("");

  //로그인 api
  const loginApi = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post("https://bookmoji.site/users/login", data);
      setLoading(false);
      // 로딩 끝나면
      if (!loading) {
        setResultData(res);
      }
      //성공시
      if (res.data.isSuccess) {
        navigate("/");
        // jwt 토큰 값 로컬에 저장,,
        axios.defaults.headers.common.Authorization = `JWT ${res.data.result.jwt}`;
        localStorage.setItem("jwt", res.data.result.jwt);
        localStorage.setItem("userIdx", res.data.result.userIdx);
      }
      // 에러
      if (
        res.data.code === 3014 ||
        res.data.code === 3015 ||
        res.data.code === 3016 ||
        res.data.code === 4000
      )
        setError(res.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = (data) => {
    loginApi({
      email: data.email,
      password: data.password,
    });
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <LoginWrapper>
      <h1>로그인</h1>
      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>이메일</label>
        <input
          type="text"
          placeholder="이메일을 입력해주세요"
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
          placeholder="비밀번호를 입력해주세요"
          name="password"
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상으로 작성하여야 합니다",
            },
            maxLength: {
              value: 16,
              message: "비밀번호는 16자 이내로 작성하여야 합니다",
            },
          })}
        />

        {errors.password && (
          <ErrorMessage>{errors.password.message} </ErrorMessage>
        )}

        <p className="forgot">비밀번호를 잊어버리셨나요?</p>
        <button className="submit" type="submit">
          로그인
        </button>
      </form>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  ${flexCenter}
  flex-direction:column;

  h1 {
    font-size: 3rem;
    margin-bottom: 3rem;
  }

  // error창
  .error {
    border: 1.5px dotted ${color.medium_gray2};
    border-radius: 1rem;
    padding: 2rem;
    & > p {
      font-size: 1.4rem;
      color: ${color.Main};
    }
  }

  form {
    display: flex;
    flex-direction: column;
    width: 40rem;
    label {
      ${authLabel}
    }
    input {
      ${authInput}
    }

    .forgot {
      width: 100%;
      text-align: end;
      font-size: 1.3rem;
      color: ${color.Main};
      margin-bottom: 2rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    button {
      ${authButton};
    }
  }
`;

const ErrorMessage = styled.p`
  color: ${color.Main};
  margin: 0rem 0rem 1rem 1rem;
  font-size: 1.2rem;
`;
