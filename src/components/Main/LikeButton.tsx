import { useState } from "react";
import styled from "styled-components";
import { apiClient } from "../../api/apiClient";
import { ReactComponent as Like } from "../../svg/ic-heart.svg";
import { color } from "../style/theme";

interface Props {
  reviewIdx: number;
  hasLiked: boolean;
}

const LikeButton = ({ reviewIdx, hasLiked }: Props) => {
  const userIdx = localStorage.getItem("userIdx");
  const [isLiked, setIsLiked] = useState(hasLiked);
  const handleClickLike: React.MouseEventHandler<SVGSVGElement> = (e) => {
    setIsLiked(!isLiked);
    if (isLiked) {
      deleteLikeApi();
    } else {
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

const LikeBtn = styled(Like)<{ liked: boolean }>`
  position: absolute;
  bottom: 5%;
  right: 2%;
  width: 8%;
  fill: ${(props) => (props.liked ? `${color.Main}` : `${color.medium_gray}`)};
  cursor: pointer;
  z-index: 10;
`;
