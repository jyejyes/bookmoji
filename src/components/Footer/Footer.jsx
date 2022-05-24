import React from "react";
import styled from "styled-components";
import { color, flexCenter } from "../style/theme";
import { ReactComponent as Github } from "../../svg/ic-github.svg";

const FooterSection = () => {
  return (
    <Footer>
      <div className="content">
        <h3>기획부터 디자인 개발까지~ 자급자족 북모지 프로젝트</h3>
        <a href="https://github.com/jyejyes/bookmoji">
          <GithubStyle />
        </a>
        <p className="copyright">© Copyright 2022 북모지</p>
      </div>
    </Footer>
  );
};

export default FooterSection;

const Footer = styled.footer`
  width: 100%;
  background: ${color.light_gray};
  padding: 3rem 0 8rem 0;

  ${flexCenter}

  h3 {
    font-size: 1.2rem;
    color: ${color.dark_gray};
  }
  .content {
    ${flexCenter}

    flex-direction: column;
    width: 93%;
  }
  .copyright {
    font-size: 1rem;
    color: ${color.medium_gray2};
  }
`;

const GithubStyle = styled(Github)`
  fill: ${color.dark_gray};
  margin: 1.5rem 0;
  cursor: pointer;
`;
