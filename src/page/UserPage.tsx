import React from "react";
import styled from "styled-components";
import Header from "../components/Header/Header";
import { device, flexCenter } from "../components/style/theme";
import UserInfo from "../components/Users/UserInfo";
import ChangeInfo from "../components/Users/ChangeInfo";
import Logout from "../components/Users/Logout";
import DeleteUser from "../components/Users/DeleteUser";
import FooterSection from "../components/Footer/Footer";
import NavBar from "../components/common/NavBar";

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
      <NavBar />
      <FooterSection />
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
    @media ${device.tablet} {
      width: 75%;
    }
    @media ${device.mobile} {
      width: 80%;
    }
  }
`;
