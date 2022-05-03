import React from "react";
import styled from "styled-components";
import { color, flexCenter, mainColorButton } from "../../style/theme";

const DeleteUserModal = () => {
  return (
    <Wrapper>
      <h2>북모지를 탈퇴하시나요? 😭</h2>
      <p>탈퇴 사유를 알려주세요! 서비스를 발전시킬 때 도움이 된답니다.</p>
      <form>
        <div>
          <label htmlFor="a">서비스가 저와 맞지 않아요.</label>
          <input type="radio" name="delete" />
        </div>
        <div>
          <label htmlFor="b">사이트 이용이 불편해요.</label>
          <input type="radio" name="delete" />
        </div>
        <div>
          <label htmlFor="b">이유가 없어요.</label>
          <input type="radio" name="delete" />
        </div>
      </form>
      <p>
        탈퇴 시 사용자 계정에 남아있는 정보는 다시 복구되지 않습니다.<br></br>
        그래도 탈퇴하시겠어요?
      </p>
      <button>계정 삭제하기</button>
    </Wrapper>
  );
};
export default DeleteUserModal;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  & > h2 {
    color: ${color.dark_gray2};
    font-size: 1.6rem;
  }

  & > p {
    font-size: 1.3rem;
    color: ${color.medium_gray2};
    margin: 1rem 0;
    text-align: center;
    line-height: 2rem;
  }

  & > button {
    ${mainColorButton}
    border-radius: 0.5rem;
    margin-top: 1rem;
    font-size: 1.4rem;
  }

  & > form {
    width: 100%;

    div {
      padding: 2rem 0;
      border-bottom: 1px solid ${color.medium_gray};
    }

    label {
      font-size: 1.4rem;
      color: ${color.dark_gray};
    }
  }
`;
