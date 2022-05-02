import React from "react";
import styled from "styled-components";
import {
  color,
  userButton,
  userSubject,
  userText,
} from "../../components/style/theme";

const DeleteUser = () => {
  return (
    <DeleteWrapper>
      <h2>계정 탈퇴</h2>
      <p>계정 탈퇴는 계정을 다시 복구할 수 없습니다.</p>
      <button>계정 탈퇴</button>
    </DeleteWrapper>
  );
};
export default DeleteUser;

const DeleteWrapper = styled.div`
  width: 100%;
  padding: 3rem 0;
  border-top: 1px solid ${color.medium_gray};
  h2 {
    ${userSubject}
  }
  button {
    ${userButton}
    border: 1px solid red;
  }
  p {
    ${userText}
  }
`;
