import React, { useState } from "react";
import styled from "styled-components";
import { color, flexCenter, mainColorButton } from "../../style/theme";
import { apiClient } from "../../../api/apiClient";
import { useNavigate } from "react-router";

const DeleteUserModal = () => {
  const userIdx = localStorage.getItem("userIdx");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  // 탈퇴 이유 클릭시
  const handleClickReason = (e) => {
    setReason(e.target.htmlFor);
  };

  //8 : 탈퇴 api
  const deleteUserApi = async () => {
    try {
      const res = await apiClient.patch(`users/account?userIdx=${userIdx}`, {
        userIdx: userIdx,
        quitReason: reason,
      });
      if (res.data.isSuccess) {
        alert("회원 탈퇴에 성공하셨습니다. 하지만 언제든 돌아오세요.");
        navigate("/");
        localStorage.clear();
      }
      if (res.data.code !== 1000) {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickDelete = () => {
    deleteUserApi();
  };
  return (
    <Wrapper>
      <h2>북모지를 탈퇴하시나요? 😭</h2>
      <p>탈퇴 사유를 알려주세요! 서비스를 발전시킬 때 도움이 된답니다.</p>
      <form>
        <p>
          <input type="radio" id="not-match" name="delete" />
          <label htmlFor="not-match" onClick={handleClickReason}>
            서비스가 저와 맞지 않아요.
          </label>
        </p>
        <p>
          <input type="radio" id="uncomfortable" name="delete" />
          <label htmlFor="uncomfortable" onClick={handleClickReason}>
            사이트 이용이 불편해요.
          </label>
        </p>
        <p>
          <input type="radio" id="no-reason" name="delete" />
          <label htmlFor="no-reason" onClick={handleClickReason}>
            이유가 없어요.
          </label>
        </p>
      </form>
      <p>
        탈퇴 시 사용자 계정에 남아있는 정보는 다시 복구되지 않습니다.<br></br>
        그래도 탈퇴하시겠어요?
      </p>
      <button onClick={handleClickDelete}>계정 삭제하기</button>
    </Wrapper>
  );
};
export default DeleteUserModal;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  & > h2 {
    width: 27rem;
    text-align: center;

    color: ${color.dark_gray2};
    font-size: 1.6rem;
  }

  & > p {
    font-size: 1.3rem;
    color: ${color.medium_gray2};
    margin: 1rem 0;
    text-align: center;
    line-height: 2rem;
    word-break: keep-all;
  }

  & > button {
    ${mainColorButton}
    border-radius: 0.5rem;
    margin-top: 1rem;
    font-size: 1.4rem;
  }

  & > form {
    width: 100%;
    & > p {
      display: flex;
      position: relative;
      margin: 1.5rem 0;
    }

    input[type="radio"] + label {
      display: inline-block;
      position: relative;
      font-size: 1.4rem;
      color: ${color.dark_gray2};
      cursor: pointer;
      -webkit-user-select: none; //사파리
      -moz-user-select: none; // 파폭
      -ms-user-select: none; //익스
    }
    input[type="radio"] + label:before {
      margin-right: 0.5rem;
      content: "";
      display: inline-block;
      width: 14px;
      height: 14px;
      text-align: center;
      background: #fff;
      border: 1px solid ${color.medium_gray2};
      border-radius: 50%;
    }
    input[type="radio"]:checked + label:after {
      content: "";
      position: absolute;
      top: 2.3px;
      left: 2.4px;
      margin: auto 0;
      width: 11px;
      height: 11px;
      background: ${color.Main};
      border-radius: 50%;
    }
  }
`;
