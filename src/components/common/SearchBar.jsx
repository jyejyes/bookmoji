import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { addRecentSearch } from "../../store/actions/recentSearch";
import { ReactComponent as Search } from "../../svg/ic-search.svg";
import { color, device } from "../style/theme";

const SearchBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const words = useSelector((state) => state.recentSearchReducer);

  const onInputSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(addRecentSearch(search));
      console.log(search);
      navigate(`/search/${search}`);
    }
  };

  useEffect(() => {
    console.log(words);
  }, [words]);

  return (
    <SearchBarWrapper>
      <div className="search">
        <SearchStyle />
        <input
          type="search"
          placeholder="책 이름, 저자, 출판사로 검색해보세요."
          onChange={onInputSearch}
          onKeyPress={onSubmitSearch}
          value={search}
        />
      </div>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  position: relative;
  input {
    width: 29rem;
    border: none;
    border-radius: 0.5rem;
    background: ${color.light_gray2};
    box-sizing: border-box;
    padding: 1rem 1rem 1rem 3.5rem;
    margin-right: 1rem;
    font-size: 1.4rem;
    color: ${color.dark_gray2};
    &:focus {
      outline: none;
    }

    @media ${device.tablet} {
      width: 22rem;
    }
    @media ${device.mobile} {
      display: block;
      width: 100%;
    }
  }
`;

const SearchStyle = styled(Search)`
  position: absolute;
  top: 50%;
  transform: translateY(-55%);
  left: 1.2rem;
  stroke: ${color.medium_gray2};
`;
