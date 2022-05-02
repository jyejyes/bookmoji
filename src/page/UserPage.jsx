import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/common/Modal";
import Header from "../components/Header/Header";
import { flexCenter } from "../components/style/theme";
import ChangeInfo from "./Users/ChangeInfo";
import DeleteUser from "./Users/DeleteUser";
import Logout from "./Users/Logout";
import UserInfo from "./Users/UserInfo";

const UserPage = () => {
  return (
    <>
      <Header />
      <UserWrapper>
        <UserInfo />
        <ChangeInfo />
        <Logout />
        <DeleteUser />
      </UserWrapper>
    </>
  );
};

export default UserPage;

const UserWrapper = styled.div`
  width: 100%;
  height: 100%;
  ${flexCenter}
  flex-direction:column;
  & > div {
    width: 60%;
  }
`;
