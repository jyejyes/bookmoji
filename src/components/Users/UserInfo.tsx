import React from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { color, device } from "../style/theme";
import { storage } from "../../firebase/firebase";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { useMutation, useQuery } from "@tanstack/react-query";

const UserInfo = () => {
  //회원정보 state
  const userIdx = localStorage.getItem("userIdx");

  //@GET 회원정보 불러오기 api
  const { data: userInformation } = useQuery(
    ["user"],
    () => apiClient.get(`users/info?userIdx=${userIdx}`),
    {
      select: (userInformation) => userInformation.data.result,
      onError: (error) => console.log(error),
    }
  );

  //@PATCH 이미지 변경 api
  const { data, mutate } = useMutation(
    (downloadUrl: string) =>
      apiClient.patch(`users/info/image`, {
        userIdx: userIdx,
        profileImgUrl: downloadUrl,
      }),
    {
      onSuccess: () => {
        console.log(data);
      },
    }
  );

  //이미지 업로드
  // 업로드 하면 유저 정보 다시 불러와야댐!?
  const onUploadImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return; //e.target.file typescript null 오류를 위해 넣어줌.

    e.preventDefault();

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // 읽기 끝날때마다
    };
    const uniqueKey = new Date().getTime();
    const newName = file.name;
    // const newName
    const metaData = {
      contentType: file.type,
    };
    const storageRef = sRef(storage, newName + uniqueKey);
    const uploadTask = uploadBytesResumable(storageRef, file, metaData);
    //업로드 관리
    uploadTask.on(
      "state_changed",

      (error) => {
        console.log(`업로드 에러남: ${error}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          mutate(downloadUrl);
        });
      }
    );
  };

  return (
    <UserInfoWrapper>
      <input className="image-file" type="file" onChange={onUploadImage} />
      <img
        src={
          userInformation?.profileImgUrl ??
          "https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_small-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg"
        }
        alt="유저이미지"
        className="user-image"
      ></img>
      <p className="name">{userInformation?.nickname ?? "-"}</p>
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
    height: 7rem;
    position: absolute;
    bottom: -25%;
    left: 50%;
    transform: translateX(-50%);
  }
  .image-file {
    border-radius: 50%;
    width: 7rem;
    height: 7rem;
    position: absolute;
    bottom: -25%;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    z-index: 3;
    opacity: 0;
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
