import axios from "axios";
import React, {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import {
  authButton,
  authInput,
  authLabel,
  color,
  device,
  flexCenter,
} from "../style/theme";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState(""); //사용자가 입력하는 이메일
  const [isOpenAuth, setIsOpenAuth] = useState(false); //인증칸 열리고 닫히고
  const [authCode, setAuthCode] = useState(""); //사용자가 입력하는 코드
  const [code, setCode] = useState(""); //이멜로 보내는 코드
  const [isSame, setIsSame] = useState(true); //코드 같은지

  const handleAuthCode = (e) => {
    setAuthCode(e.target.value);
  };

  const compareCode = () => {
    if (authCode === code) {
      setIsSame(true);
      setIsOpenAuth(false);
    } else {
      setIsSame(false);
    }
  };

  //이메일 인증
  const handleAuthEmail = async () => {
    setIsOpenAuth(true);
    try {
      const res = await apiClient.post(`users/auth/mail?email=${email}`);
      if (res.data.isSuccess) {
        setCode(res.data.result);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //회원가입 api
  const registerApi = async (data) => {
    try {
      setLoading(true);
      const res = await apiClient.post("users/signup", data);
      setLoading(false);
      if (!loading) {
        setResultData(res);
      }

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
    mode: "onChange",
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

  const emailValue = useRef();
  emailValue.current = watch("email");

  useEffect(() => {
    setEmail(emailValue.current);
  }, [emailValue.current]);

  return (
    <RegisterWrapper>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>이메일</label>
        <div className="email">
          <input
            type="text"
            placeholder="abcd@gmail.com"
            name="email"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "이메일 형식에 맞게 작성해주세요",
                validate: (value) => setEmail(value),
              },
            })}
          />
          <button type="text" onClick={handleAuthEmail}>
            이메일 인증
          </button>
        </div>
        {isOpenAuth && (
          <div className="email">
            <input type="text" onChange={handleAuthCode} value={authCode} />
            <button type="text" onClick={compareCode}>
              확인
            </button>
          </div>
        )}
        {!isSame && <ErrorMessage>인증번호를 다시 확인해주세요</ErrorMessage>}

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
              value:
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
              message: "영문, 숫자, 특수문자를 혼용해서 입력해주세요.",
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
          name="pwCheck"
          {...register("pwCheck", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) => value === pw.current,
          })}
        />
        {errors.pwCheck && errors.pwCheck.type == "validate" && (
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
        />
        {errors.nickname && (
          <ErrorMessage>{errors.nickname.message}</ErrorMessage>
        )}
        <button type="submit">가입하기</button>
      </form>
      <p className="move-login" onClick={() => navigate("/auth/login")}>
        이미 계정이 있으신가요?
      </p>
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
    @media ${device.mobile} {
      font-size: 2.6rem;
    }
  }
  label {
    ${authLabel}
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
    input {
      ${authInput}
    }
  }

  form > button {
    ${authButton}
    margin-top:2rem;
  }

  form .email {
    display: flex;

    button {
      background: ${color.Main};
      color: white;
      border-radius: 3rem;
      text-align: center;
      font-size: 1.2rem;
      width: 10rem;
      margin-bottom: 1rem;
      cursor: pointer;
    }
  }

  .move-login {
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
`;

const ErrorMessage = styled.p`
  color: ${color.Main};
  margin: 0rem 0rem 1rem 1rem;
  font-size: 1.2rem;
`;
