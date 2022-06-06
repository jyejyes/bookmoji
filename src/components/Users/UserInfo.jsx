import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { color, device } from "../../components/style/theme";
import { userInfo } from "../../store/actions/userInfo";

const UserInfo = () => {
  //회원정보 state
  const [loading, setLoading] = useState(false);
  const [userInformation, setUserInformation] = useState({
    nickname: "",
    profileUrl: "",
  });
  const userIdx = localStorage.getItem("userIdx");

  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.userInfoReducer.nickname);

  //회원정보 api
  const userInfoApi = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`users/info?userIdx=${userIdx}`);
      dispatch(userInfo(res.data.result.nickname));
      setUserInformation({
        nickname: res.data.result.nickname,
        profileUrl: res.data.result.profileUrl,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  //실행
  useEffect(() => {
    userInfoApi();
  }, []);

  return (
    <UserInfoWrapper>
      {!loading ? (
        userInformation.profileUrl ? (
          <img
            src={userInformation.profileUrl}
            alt="유저이미지"
            className="user-image"
          />
        ) : (
          <img
            src="https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_small-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg"
            alt="유저이미지"
            className="user-image"
          />
        )
      ) : (
        <img
          src="https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_small-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg"
          alt="유저 이미지"
          className="user-image"
        />
      )}

      {!loading ? (
        <p className="name">{userNickname}</p>
      ) : (
        <p className="name">-</p>
      )}
    </UserInfoWrapper>
  );
};

export default UserInfo;

const UserInfoWrapper = styled.div`
  width: 100%;
  height: 15rem;
  position: relative;
  background: url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2190ㅎ");
  margin-bottom: 10rem;
  position: relative;
  .user-image {
    border-radius: 50%;
    border: 1px solid ${color.medium_gray};
    width: 7rem;
    position: absolute;
    bottom: -25%;
    left: 50%;
    transform: translateX(-50%);
  }

  .name {
    font-size: 2.2rem;
    font-family: "LeferiBaseType-BoldA";
    position: absolute;
    bottom: -50%;
    left: 50%;
    transform: translateX(-50%);
    @media ${device.mobile} {
      font-size: 2rem;
    }
  }
`;
