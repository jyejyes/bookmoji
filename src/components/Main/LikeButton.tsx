import { useMutation } from "@tanstack/react-query";
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

  /**
   * 하트 클릭 함수
   */
  const handleClickLike: React.MouseEventHandler<SVGSVGElement> = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      deleteLiked.mutate();
    } else {
      createLiked.mutate();
    }
  };

  /**
   * @POST 16: 좋아요 생성 api
   */
  const createLiked = useMutation(
    () => apiClient.post(`likes?userIdx=${userIdx}&reviewIdx=${reviewIdx}`),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  /**
   * @POST 17: 좋아요 삭제 api
   */
  const deleteLiked = useMutation(
    () => apiClient.patch(`likes?userIdx=${userIdx}&reviewIdx=${reviewIdx}`),
    {
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return <LikeBtn liked={isLiked ? 1 : 0} onClick={handleClickLike} />;
};

export default LikeButton;

const LikeBtn = styled(Like)<{ liked: number }>`
  position: absolute;
  bottom: 5%;
  right: 2%;
  width: 8%;
  fill: ${(props) => (props.liked ? `${color.Main}` : `${color.medium_gray}`)};
  cursor: pointer;
  z-index: 10;
`;
