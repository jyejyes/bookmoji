import { useEffect, useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { ReactComponent as Like } from "../../svg/ic-heart.svg";
import { color } from "../style/theme";

const LikeButton = ({ reviewIdx, hasLiked }) => {
  const userIdx = localStorage.getItem("userIdx");
  const [isLiked, setIsLiked] = useState(hasLiked);
  const handleClickLike = (e) => {
    setIsLiked(!isLiked);
    //라이크 true 상태에서 한 번 더 누르는거니까 삭제
    if (isLiked) {
      deleteLikeApi();
    }
    //라이크 false 상태에서 한 번 더 누르는거니까 생성
    else {
      createLikeApi();
    }
  };

  //16번 : 좋아요 생성 api
  const createLikeApi = async () => {
    try {
      const res = await apiClient.post(
        `likes?userIdx=${userIdx}&reviewIdx=${reviewIdx}`
      );
      if (!res.data.isSuccess) {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  //17번 : 좋아요 삭제 api
  const deleteLikeApi = async () => {
    try {
      const res = await apiClient.patch(
        `likes?userIdx=${userIdx}&reviewIdx=${reviewIdx}`
      );
      if (!res.data.isSuccess) {
        alert(res.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <LikeBtn liked={isLiked} onClick={handleClickLike} />;
};

export default LikeButton;

const LikeBtn = styled(Like)`
  position: absolute;
  bottom: 5%;
  right: 2%;
  width: 8%;
  fill: ${(props) => (props.liked ? `${color.Main}` : `${color.medium_gray}`)};
  cursor: pointer;
  z-index: 10;
`;
