import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../common/Modal";
import {
  color,
  device,
  userButton,
  userSubject,
  userText,
} from "../style/theme";
import LogoutModal from "./ModalContent/LogoutModal";

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
        <button onClick={handleOpenModal} name="logout">
          계정 로그아웃
        </button>
      </LogoutWrapper>
      {isModalOpen && (
        <Modal handleOpenModal={handleOpenModal}>
          <LogoutModal handleOpenModal={handleOpenModal} />
        </Modal>
      )}
    </>
  );
};

export default Logout;

const LogoutWrapper = styled.div`
  width: 100%;
  padding: 3rem 0;
  border-top: 1px solid ${color.medium_gray};
  & > h2 {
    ${userSubject}
  }
  & > button {
    ${userButton}
    border: 1px solid red;
  }

  & > p {
    ${userText}
    @media ${device.mobile} {
      font-size: 1.4rem;
      word-break: keep-all;
      line-height: 2rem;
    }
  }
`;
