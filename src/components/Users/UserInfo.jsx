import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { color, device } from "../../components/style/theme";
import { profileUrl, userInfo } from "../../store/actions/userInfo";
import { storage } from "../../firebase/firebase";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";

const UserInfo = () => {
  //회원정보 state
  const [loading, setLoading] = useState(false);
  const [userInformation, setUserInformation] = useState({
    nickname: "",
    profileUrl: "",
  });
  const userIdx = localStorage.getItem("userIdx");

  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.userInfoReducer.nickname);
  const url = useSelector((state) => state.userInfoReducer.url);

  //회원정보 api
  const userInfoApi = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`users/info?userIdx=${userIdx}`);
      dispatch(userInfo(res.data.result.nickname));
      dispatch(profileUrl(res.data.result.profileImgUrl));
      setUserInformation({
        nickname: res.data.result.nickname,
        profileUrl: res.data.result.profileImgUrl,
      });

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  //이미지 변경 api
  const setUserImageApi = async (downloadUrl) => {
    try {
      const res = await apiClient.patch(`users/info/image`, {
        userIdx: userIdx,
        profileImgUrl: downloadUrl,
      });
    } catch (e) {
      console.log(e);
    }
  };

  //이미지 업로드
  // 업로드 하면 유저 정보 다시 불러와야댐!?
  const onUploadImage = (e) => {
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
      (snapshot) => {
        //몇퍼센트 업로드 되고 잇는지 확인하려고 넣은거
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(`업로드 에러남: ${error}`);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          dispatch(profileUrl(downloadUrl));
          setUserImageApi(downloadUrl);
        });
      }
    );
  };

  //실행
  useEffect(() => {
    userInfoApi();
  }, []);

  return (
    <UserInfoWrapper>
      <input className="image-file" type="file" onChange={onUploadImage} />
      {!loading ? (
        //로딩 됐을 때 프로필 이미지 있으면 프로필 이미지로 보여주고
        userInformation.profileUrl ? (
          <img src={url} alt="유저이미지" className="user-image"></img>
        ) : (
          //없으면 기본 이미지로 보여주라는거임
          <img
            src="https://an2-glx.amz.wtchn.net/assets/default/user/photo_file_name_small-ab0a7f6a92a282859192ba17dd4822023e22273e168c2daf05795e5171e66446.jpg"
            alt="유저이미지"
            className="user-image"
          />
        )
      ) : (
        // 로딩 안됐을 때 기본 이미지 보여주라는거임
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
