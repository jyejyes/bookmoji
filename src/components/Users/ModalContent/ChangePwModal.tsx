import { useMutation } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { apiClient } from "../../../api/apiClient";
import { ChangePasswordFormData } from "../../../type/type";
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

const ChangePwModal = ({ handleOpenModal }: Props) => {
  const userIdx = Number(localStorage.getItem("userIdx"));
  const [success] = useState("");
  const [error, setError] = useState("");

  /**
   * @PATCH 비밀번호 변경 api
   */
  const { mutate } = useMutation(
    (changePasswordDatas: ChangePasswordFormData) =>
      apiClient.patch(`users/info/password`, changePasswordDatas),
    {
      onSuccess: ({ data }) => {
        if (data?.isSuccess) {
          alert(data?.message);
          handleOpenModal();
        }
        if (data?.code === 3017 || data?.code === 3018) setError(data?.message);
      },
      onError: (e) => {
        console.log(e);
      },
    }
  );

  //react-form-hook
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const onSubmit: SubmitHandler<ChangePasswordFormData> = (
    data: ChangePasswordFormData
  ) => {
    mutate({
      userIdx: userIdx,
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };
  const onError: SubmitErrorHandler<ChangePasswordFormData> = (error) => {
    console.log(error);
  };

  const pwRef = useRef<string>();
  pwRef.current = watch("newPassword");

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label>현재 비밀번호</label>
        <input
          autoComplete="off"
          type="password"
          placeholder="영문, 숫자의 조합으로 8자 이상 입력해주세요"
          {...register("currentPassword", {
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
        {errors.currentPassword && (
          <span>{errors.currentPassword.message}</span>
        )}
        {error && <span>{error}</span>}

        <label>변경할 비밀번호</label>
        <input
          autoComplete="off"
          type="password"
          placeholder="영문, 숫자의 조합으로 8자 이상 입력해주세요"
          {...register("newPassword", {
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
        {errors.newPassword && (
          <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
        )}

        <label>비밀번호 확인</label>
        <input
          autoComplete="off"
          type="password"
          placeholder="비밀번호와 동일하게 입력해주세요"
          {...register("pwCheck", {
            required: "비밀번호 확인을 입력해주세요.",
            validate: (value) => value === pwRef.current,
          })}
        />
        {errors.pwCheck && errors.pwCheck.type === "validate" && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
        {success && <p>{success} </p>}
        <button type="submit">변경하기</button>
      </form>
    </Wrapper>
  );
};

export default ChangePwModal;

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
    & > p {
      color: ${color.Main};
    }
  }
`;
const ErrorMessage = styled.span`
  color: ${color.Main};
  margin-bottom: 2rem;
  font-size: 1.2rem;
  width: 100%;
  text-align: start;
`;
