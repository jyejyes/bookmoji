import React, { useState } from "react";
import styled from "styled-components";
import {
  color,
  device,
  userButton,
  userSubject,
} from "../../components/style/theme";
import Modal from "../common/Modal";
import UserButton from "../common/UserButton";

const ChangeInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickWhatBtn, setClickWhatBtn] = useState("");

  const handleOpenModal = (e) => {
    setIsModalOpen(!isModalOpen);
    setClickWhatBtn(e.target.name);
  };
  return (
    <ChangeInfoWrapper>
      <h2>개인정보 수정</h2>
      <p>닉네임 변경</p>
      <UserButton
        className="name"
        content="닉네임 변경"
        name="changeName"
        onClick={handleOpenModal}
      />
      <p>비밀번호 변경</p>
      <UserButton
        className="password"
        content="비밀번호 변경"
        name="changePw"
        onClick={handleOpenModal}
      />
      {isModalOpen && (
        <Modal handleOpenModal={handleOpenModal} whatBtn={clickWhatBtn} />
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
