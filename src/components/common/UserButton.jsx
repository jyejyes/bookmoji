import React from "react";
import styled from "styled-components";
import { userButton } from "../style/theme";

const UserButton = ({ content, name, onClick }) => {
  return (
    <UserBtn name={name} onClick={onClick}>
      {content}
    </UserBtn>
  );
};
export default UserButton;

const UserBtn = styled.button`
  ${userButton};
`;
