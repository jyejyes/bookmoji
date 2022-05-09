import React from "react";
import styled from "styled-components";
import DeleteUserModal from "../Users/ModalContent/DeleteUserModal";
import LogoutModal from "../Users/ModalContent/LogoutModal";
import { color } from "../style/theme";
import ReviewModal from "../ReviewModal";
import ChangeInfoModal from "../Users/ModalContent/ChangeNicknameModal";
import ChangePwModal from "../Users/ModalContent/ChangePwModal";

// 함수 props 로 넘기기
const Modal = ({ handleOpenModal, whatBtn, isbn }) => {
  // 모달 오픈시 배경 화면 스크롤 방지 - 일단은 필요없어서 주석처리함
  // document.body.style.overflow = "hidden";
  return (
    <ModalWrapper>
      <BackModal onClick={handleOpenModal} />
      <div className="modal">
        {whatBtn === "logout" && (
          <LogoutModal handleOpenModal={handleOpenModal} />
        )}
        {whatBtn === "deleteuser" && <DeleteUserModal />}
        {whatBtn === "book" && (
          <ReviewModal isbn={isbn} handleOpenModal={handleOpenModal} />
        )}
        {whatBtn === "changeName" && <ChangeInfoModal />}
        {whatBtn === "changePw" && <ChangePwModal />}
      </div>
    </ModalWrapper>
  );
};

export default Modal;

const ModalWrapper = styled.div`
  z-index: 200;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;

  .modal {
    background: ${color.white};
    z-index: 500;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 1rem;
    padding: 3rem;
    box-sizing: border-box;
  }
`;

// 배경
const BackModal = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
`;
