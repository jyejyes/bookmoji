import React from "react";
import styled from "styled-components";
import { ReactComponent as Spinner } from "../../svg/ic-spinner.svg";
import { color } from "../style/theme";

const LoadingSpinner = () => {
  return <SpinnerStyle />;
};
export default LoadingSpinner;

const SpinnerStyle = styled(Spinner)`
  width: 5rem;
  animation: rotate 3s infinite;
  fill: ${color.Main};

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
