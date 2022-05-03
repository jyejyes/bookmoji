import React from "react";
import styled from "styled-components";
import {
  color,
  userButton,
  userSubject,
  userText,
} from "../../components/style/theme";

const ChangeInfo = () => {
  return (
    <ChangeInfoWrapper>
      <h2>개인정보 수정</h2>
      <p>닉네임 변경</p>
      <button className="name">닉네임 변경</button>
      <p>비밀번호 변경</p>
      <button className="password">비밀번호 변경</button>
    </ChangeInfoWrapper>
  );
};

export default ChangeInfo;

const ChangeInfoWrapper = styled.div`
  width: 100%;
  padding: 3rem 0;
  border-top: 1px solid ${color.medium_gray};
  h2 {
    ${userSubject}
  }
  button {
    ${userButton}
  }
  p {
    font-size: 1.5rem;
    color: ${color.dark_gray2};
    margin: 2rem 0 1rem 0;
  }
`;
