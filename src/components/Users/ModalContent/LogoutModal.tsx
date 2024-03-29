import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { color, mainColorButton, whiteButton } from "../../style/theme";

interface Props {
  handleOpenModal: () => void;
}

const LogoutModal = ({ handleOpenModal }: Props) => {
  const navigate = useNavigate();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userIdx");
    localStorage.removeItem("profileUrl");
    navigate("/");
  };

  return (
    <LogoutModalStyle>
      <h2>로그아웃을 하시겠습니까?</h2>
      <div className="buttons">
        <button className="action" onClick={handleLogout}>
          로그아웃
        </button>
        <button className="cancel" onClick={handleOpenModal}>
          취소
        </button>
      </div>
    </LogoutModalStyle>
  );
};

export default LogoutModal;

const LogoutModalStyle = styled.div`
  & > h2 {
    color: ${color.dark_gray2};
    font-size: 1.6rem;
  }
  .buttons {
    width: 20rem;
    margin-top: 3rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
  .action {
    ${whiteButton}
    width:100%;
    border-radius: 0.5rem;
    border: 1px solid ${color.medium_gray};
    color: ${color.medium_gray2};
  }
  .cancel {
    ${mainColorButton}
    width:100%;
    border-radius: 0.5rem;
  }
`;
