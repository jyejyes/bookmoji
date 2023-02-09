import React from "react";
import styled from "styled-components";
import { userButton } from "../style/theme";

interface Props {
  content: string;
  name: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserButton = ({ content, name, onClick }: Props) => {
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
