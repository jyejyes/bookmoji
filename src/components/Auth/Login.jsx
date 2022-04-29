import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  authButton,
  authInput,
  authLabel,
  color,
  flexCenter,
} from "../style/theme";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const onError = (error) => {
    console.log(error);
  };

  return (
    <LoginWrapper>
      <h1>로그인</h1>
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
