import React, { isValidElement, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { apiClient } from "../../../api/apiClient";
import { userInfo } from "../../../store/actions/userInfo";
import {
  authInput,
  authLabel,
  changeInput,
  color,
  flexCenter,
  mainColorButton,
} from "../../style/theme";

const ChangeNicknameModal = ({ handleOpenModal }) => {
  const [nickname, setNickname] = useState("");
  const userIdx = localStorage.getItem("userIdx");

  const dispatch = useDispatch();

  //api 호출 1 : 회원 정보(닉네임) 불러오기
  const nicknameApi = async () => {
    try {
      const res = await apiClient.get(`users/info?userIdx=${userIdx}`);
      setNickname(res.data.result.nickname);
    } catch (e) {
      console.log(e);
    }
  };

  //api 호출 2 : 닉네임 변경
  const changeNicknameApi = async (newNickname) => {
    try {
      const res = await apiClient.patch(`users/info/nickname`, {
        userIdx: userIdx,
        nickname: newNickname,
      });
      if (res.data.isSuccess) {
        dispatch(userInfo(newNickname));
        alert(res.data.message);
        handleOpenModal();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    nicknameApi();
  }, []);
  //react-form-hook 관련 state와 함수
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit = (data) => {
    changeNicknameApi(data.nickname);
  };
  const onError = (error) => {
    console.log(error);
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>현재 닉네임</label>
        <input type="text" defaultValue={nickname} readOnly />
        <label>새 닉네임</label>
        <input
          type="text"
          {...register("nickname", {
            required: "변경할 닉네임을 입력해주세요",
            minLength: {
              value: 2,
              message: "2글자 이상 입력해주세요",
            },
          })}
        />
        {errors.nickname && <span>{errors.nickname.message}</span>}
        <button type="submit">변경하기</button>
      </form>
    </Wrapper>
  );
};

export default ChangeNicknameModal;

const Wrapper = styled.div`
  & > form {
    ${flexCenter}
    flex-direction:column;
    & > label {
      ${authLabel};
      width: 100%;
      color: ${color.medium_gray2};
      margin-top: 0;
    }
    & > input {
      width: 25rem;
      ${changeInput}
    }
    & > span {
      color: ${color.Main};
      margin-bottom: 2rem;
      font-size: 1.2rem;
      width: 100%;
      text-align: start;
    }
    & > button {
      ${mainColorButton}
      border-radius: 0.5rem;
      font-size: 1.4rem;
      margin-top: 1rem;
    }
  }
`;
