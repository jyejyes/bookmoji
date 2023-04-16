import React, { useState } from "react";
import styled from "styled-components";
import { color, device, userSubject } from "../style/theme";
import Modal from "../common/Modal";
import UserButton from "../common/UserButton";
import ChangeNicknameModal from "./ModalContent/ChangeNicknameModal";
import ChangePwModal from "./ModalContent/ChangePwModal";

const ChangeInfo = () => {
  const [isOpenNicknameModal, setIsOpenNicknameModal] = useState(false);
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);

  /**
   * 닉네임 모달 토글
   */
  const handleToggleNicknameModal = () => {
    setIsOpenNicknameModal(!isOpenNicknameModal);
  };
  /**
   * 비밀번호 모달 토글
   */
  const handleTogglePasswordModal = () => {
    setIsOpenPasswordModal(!isOpenPasswordModal);
  };

  return (
    <ChangeInfoWrapper>
      <p>체리픽 테스트 하고싶어</p>
      <h2>개인정보 수정</h2>
      <p>닉네임 변경</p>
      <UserButton
        content="닉네임 변경"
        name="changeName"
        onClick={handleToggleNicknameModal}
      />
      <p>비밀번호 변경</p>
      <UserButton
        content="비밀번호 변경"
        name="changePw"
        onClick={handleTogglePasswordModal}
      />
      {/* 닉네임 모달 */}
      {isOpenNicknameModal && (
        <Modal handleOpenModal={handleToggleNicknameModal}>
          <ChangeNicknameModal handleOpenModal={handleToggleNicknameModal} />
        </Modal>
      )}
      {/* 비밀번호 모달 */}
      {isOpenPasswordModal && (
        <Modal handleOpenModal={handleTogglePasswordModal}>
          <ChangePwModal handleOpenModal={handleTogglePasswordModal} />
        </Modal>
      )}
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
  p {
    font-size: 1.5rem;
    color: ${color.dark_gray2};
    margin: 2rem 0 1rem 0;
    @media ${device.mobile} {
      font-size: 1.4rem;
    }
  }
`;
