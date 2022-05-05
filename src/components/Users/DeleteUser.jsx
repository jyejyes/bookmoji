import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/common/Modal";
import {
  color,
  userButton,
  userSubject,
  userText,
} from "../../components/style/theme";
import UserButton from "../common/UserButton";

const DeleteUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickWhatBtn, setClickWhatBtn] = useState("");

  const handleOpenModal = (e) => {
    setIsModalOpen(!isModalOpen);
    setClickWhatBtn(e.target.name);
    document.body.style.overflow = "unset";
  };
  return (
    <DeleteWrapper>
      <h2>계정 탈퇴</h2>
      <p>계정 탈퇴는 계정을 다시 복구할 수 없습니다.</p>
      <UserButton
        onClick={handleOpenModal}
        name="deleteuser"
        content="계정 탈퇴"
      />

      {isModalOpen && (
        <Modal handleOpenModal={handleOpenModal} whatBtn={clickWhatBtn} />
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

  & > p {
    ${userText}
  }
`;
