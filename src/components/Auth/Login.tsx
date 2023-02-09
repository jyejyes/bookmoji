import React, { useState } from "react";
import styled from "styled-components";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import {
  authButton,
  authInput,
  authLabel,
  color,
  device,
  flexCenter,
} from "../style/theme";
import { useNavigate } from "react-router";
import { apiClient } from "../../api/apiClient";
import { ReactComponent as KaKao } from "../../svg/ic-kakao.svg";
import { LoginFormData } from "../../type/type";
import { useMutation } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_KAKAO_REST_API;

  const REDIRECT_URI = "https://bookmoji.netlify.app/oauth";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  //@GET, 로그인 api
  const userLogin = async (loginData: LoginFormData) => {
    const { data } = await apiClient.post("users/login", loginData);
    return data;
  };

  const { mutate } = useMutation(userLogin, {
    onSuccess: (data) => {
      if (data?.isSuccess) {
        localStorage.setItem("jwt", data?.result?.jwt);
        localStorage.setItem("userIdx", data?.result?.userIdx);
        localStorage.setItem("profileUrl", data?.result?.profileImgUrl);
        navigate("/");
      }
      if (
        data?.code === 3014 ||
        data?.code === 3015 ||
        data?.code === 3016 ||
        data?.code === 4000
      )
        setError(data?.message);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    mutate({
      email: data.email,
      password: data.password,
    });
  };
  const onError: SubmitErrorHandler<LoginFormData> = (error) => {
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
          // name="email"
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
          // name="password"
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
      <p className="move-register" onClick={() => navigate("/auth/register")}>
        계정이 없으신가요?
      </p>
      <section className="kakao-auth">
        <p className="or">또는</p>
        <a href={KAKAO_AUTH_URI}>
          <KaKaoStyle />
        </a>
      </section>
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
    @media ${device.mobile} {
      font-size: 2.6rem;
    }
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
    width: 30vw;

    @media ${device.tablet} {
      width: 60vw;
    }
    @media ${device.mobile} {
      width: 80vw;
    }

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
      color: ${color.medium_gray2};
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
  .move-register {
    width: 100%;
    text-align: center;
    font-size: 1.3rem;
    color: ${color.Main};
    margin-top: 2rem;
    cursor: pointer;
    display: none;
    &:hover {
      text-decoration: underline;
    }

    @media ${device.tablet} {
      width: 60vw;
      display: block;
    }
  }

  .kakao-auth {
    position: relative;
    width: 100%;
    margin-top: 2rem;
    padding: 1rem 0;
    border-top: 1px solid ${color.medium_gray};

    .or {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      font-size: 1.2rem;
      color: ${color.medium_gray2};
      padding: 0 1rem;
    }

    a {
      cursor: pointer;
      margin-left: 50%;
    }
  }
`;

const ErrorMessage = styled.p`
  color: ${color.Main};
  margin: 0rem 0rem 1rem 1rem;
  font-size: 1.2rem;
`;

const KaKaoStyle = styled(KaKao)`
  margin-top: 1rem;
  transform: translateX(-50%);
`;
