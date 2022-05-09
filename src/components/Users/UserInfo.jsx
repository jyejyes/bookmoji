import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { color } from "../../components/style/theme";

const UserInfo = () => {
  //회원정보 state
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ nickname: "", profileUrl: "" });
  const userIdx = localStorage.getItem("userIdx");

  //회원정보 api
  const userInfoApi = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`users/info?userIdx=${userIdx}`);
      setUserInfo({
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
        userInfo.profileUrl ? (
          <img
            src={userInfo.profileUrl}
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
        <p className="name">{userInfo.nickname}</p>
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
  background: url("https://previews.123rf.com/images/gmast3r/gmast3r1605/gmast3r160500005/55962922-%EC%82%B0-%EB%B2%94%EC%9C%84-%EC%97%AC%EB%A6%84-%EA%B0%80%EB%A1%9C-%EA%B0%80%EB%A1%9C-%EB%B0%B0%EB%84%88-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg");
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
  }
`;
