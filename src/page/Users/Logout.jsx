import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/common/Modal";
import {
  color,
  userButton,
  userSubject,
  userText,
} from "../../components/style/theme";

const Logout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "unset";
  };
  return (
    <>
      <LogoutWrapper>
        <h2>계정 로그아웃</h2>
        <p>계정 로그아웃은 언제든지 다시 돌아올 수 있습니다. </p>
        <button onClick={handleOpenModal}>계정 로그아웃</button>
      </LogoutWrapper>
      {isModalOpen && <Modal handleOpenModal={handleOpenModal} />}
    </>
  );
};

export default Logout;

const LogoutWrapper = styled.div`
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
