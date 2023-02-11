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
import DeleteUserModal from "./ModalContent/DeleteUserModal";

const DeleteUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = "unset";
  };
  return (
    <DeleteWrapper>
      <h2>계정 탈퇴</h2>
      <p>계정 탈퇴는 계정을 다시 복구할 수 없습니다.</p>
      <button onClick={handleOpenModal} name="deleteuser">
        계정 탈퇴
      </button>

      {isModalOpen && (
        <Modal handleOpenModal={handleOpenModal}>
          <DeleteUserModal />
        </Modal>
      )}
    </DeleteWrapper>
  );
};
export default DeleteUser;

const DeleteWrapper = styled.div`
  width: 100%;
  padding: 3rem 0;
  border-top: 1px solid ${color.medium_gray};
  & > h2 {
    ${userSubject}
  }
  & > button {
    ${userButton}
    border:1px solid red;
  }
  & > p {
    ${userText}
    @media ${device.mobile} {
      font-size: 1.4rem;
      word-break: keep-all;
    }
  }
`;
