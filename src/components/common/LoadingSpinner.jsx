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
  //   transform: rotate(360deg);
  //   transition: all 0.5s ease;
  fill: ${color.Main};
`;
