import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { authButton, authInput, authLabel, flexCenter } from "../style/theme";

const Register = () => {
  const { register, handleSubmit } = useForm();
  return (
    <RegisterWrapper>
      <h1>회원가입</h1>
      <form>
        <label>이메일</label>
        <input
          type="text"
          placeholder="이메일을 입력해주세요"
          name="email"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "이메일 형식에 맞게 작성해주세요",
            },
          })}
        />

        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          name="password"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "비번형식에 맞게 작성해주세요",
            },
          })}
        />

        <label>비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호와 동일하게 입력해주세요"
          name="password"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "비번확인 형식에 맞게 작성해주세요",
            },
          })}
        />

        <label>닉네임</label>
        <input
          type="text"
          placeholder="닉네임을 설정해주세요"
          name="password"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "비번확인 형식에 맞게 작성해주세요",
            },
          })}
        />

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
