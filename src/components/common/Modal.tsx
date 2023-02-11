import React from "react";
import styled from "styled-components";
import { color, device } from "../style/theme";

interface Props {
  children: React.ReactNode;
  handleOpenModal?: () => void;
}

// 함수 props 로 넘기기
const Modal = ({ children, handleOpenModal }: Props) => {
  return (
    <ModalWrapper>
      <BackModal onClick={handleOpenModal} />
      <div className="modal">{children}</div>
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
    @media ${device.mobile} {
      padding: 2rem;
    }
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
