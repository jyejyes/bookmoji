import React, { useState } from "react";
import styled from "styled-components";
import { color, device, flexCenter } from "../style/theme";
import { ReactComponent as Home } from "../../svg/ic-home.svg";
import { ReactComponent as Search } from "../../svg/ic-search.svg";
import { ReactComponent as Chart } from "../../svg/ic-chart.svg";
import { ReactComponent as User } from "../../svg/ic-user.svg";
import { useLocation, useNavigate } from "react-router";

const NavBar = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(useLocation().pathname);

  return (
    <BottomNav>
      <div name="home" onClick={() => navigate("/")}>
        <HomeStyle name="home" location={location} />
        <p>홈</p>
      </div>
      <div name="search" onClick={() => navigate("/m/search")}>
        <SearchStyle location={location} />
        <p>검색</p>
      </div>
      <div name="collect" onClick={() => navigate("/collect")}>
        <ChartStyle location={location} />
        <p>모아보기</p>
      </div>
      <div name="user" onClick={() => navigate("/users")}>
        <UserStyle location={location} />
        <p>마이 북모지</p>
      </div>
    </BottomNav>
  );
};

export default NavBar;

const BottomNav = styled.nav`
  display: none;
  width: 100%;
  height: 5.5rem;
  background: white;
  position: fixed;
  bottom: 0;
  border-top: 1px solid ${color.light_gray2};
  z-index: 100;

  @media ${device.mobile} {
    display: flex;
    & > div {
      z-index: 5;
      ${flexCenter}
      flex-direction:column;
      flex: 1;
      color: ${color.dark_gray};
      cursor: pointer;

      p {
        margin-top: 0.6rem;
        font-size: 1.1rem;
        color: ${(props) =>
          props.location === "/" ? color.Main : color.medium_gray2};
      }
    }
  }
`;

const HomeStyle = styled(Home)`
  fill: ${(props) =>
    props.location === "/" ? color.Main : color.medium_gray2};
  width: 2.3rem;
  &:hover {
    fill: ${color.Main};
  }
`;

const SearchStyle = styled(Search)`
  width: 1.8rem;
  stroke: ${(props) =>
    props.location === "/m/search" ? color.Main : color.medium_gray2};
`;

const ChartStyle = styled(Chart)`
  fill: ${(props) =>
    props.location === "/collect" ? color.Main : color.medium_gray2};
  width: 2.1rem;

  &:hover {
    fill: ${color.Main};
  }
`;

const UserStyle = styled(User)`
  fill: ${(props) =>
    props.location === "/users" ? color.Main : color.medium_gray2};
  width: 1.6rem;
  &:hover {
    fill: ${color.Main};
  }
`;
