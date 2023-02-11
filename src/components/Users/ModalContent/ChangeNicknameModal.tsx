import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { apiClient } from "../../../api/apiClient";
import { queryKeys } from "../../../constant/queryKeys";
import { UserNicknameFormData } from "../../../type/type";
import {
  authLabel,
  changeInput,
  color,
  flexCenter,
  mainColorButton,
} from "../../style/theme";

interface Props {
  handleOpenModal: () => void;
}

const ChangeNicknameModal = ({ handleOpenModal }: Props) => {
  //state
  const userIdx = Number(localStorage.getItem("userIdx"));

  //API
  /**
   * @GET 회원 정보(닉네임) 불러오기
   */
  const { data: nickname } = useQuery(
    [queryKeys?.USER_NICKNAME_KEY],
    () => apiClient.get(`users/info?userIdx=${userIdx}`),
    {
      select: (nickname) => nickname?.data?.result?.nickname,
    }
  );

  /**
   * @PATCH 회원 정보(닉네임) 변경하기
   */
  const changeNicknameApi = async (newNickname: string) => {
    const { data } = await apiClient.patch(`users/info/nickname`, {
      userIdx: userIdx,
      nickname: newNickname,
    });
    return data;
  };
  const { mutate } = useMutation(changeNicknameApi, {
    onSuccess: (data) => {
      alert(data?.message);
      if (data?.isSuccess) {
        handleOpenModal();
      } else {
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  //react-form-hook 관련 state와 함수
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserNicknameFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const onSubmit: SubmitHandler<UserNicknameFormData> = (data) => {
    mutate(data.nickname);
  };
  const onError: SubmitErrorHandler<UserNicknameFormData> = (error) => {
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
        {errors?.nickname && <span>{errors?.nickname?.message}</span>}
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
