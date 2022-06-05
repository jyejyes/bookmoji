import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import NavBar from "../components/common/NavBar";
import SearchBar from "../components/common/SearchBar";
import Header from "../components/Header/Header";
import { color, flexCenter } from "../components/style/theme";
import { removeRecentSearch } from "../store/actions/recentSearch";

const MobileSearch = () => {
  const recentWords = useSelector((state) => state.recentSearchReducer);
  const dispatch = useDispatch();

  const handleDeleteWord = (e) => {
    dispatch(removeRecentSearch(e.target.value));
  };
  return (
    <Wrapper>
      <Header />
      <main>
        <SearchBar />
        <section className="recent">
          <h3>최근 검색어</h3>
          <div className="recent-search-section">
            {recentWords.length === 0 ? (
              <></>
            ) : (
              recentWords.map((item, index) => (
                <div className="search-word" key={index}>
                  <p>{item}</p>
                  <button onClick={handleDeleteWord} value={item}>
                    𝖷
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
      <NavBar />
    </Wrapper>
  );
};

export default MobileSearch;

const Wrapper = styled.div`
  ${flexCenter}
  flex-direction:column;
  main {
    width: 90%;
    padding: 1rem 0;
  }

  .recent {
    padding: 2rem 1rem;
    & > h3 {
      font-size: 1.4rem;
      color: ${color.Main};
      font-weight: 900;
      padding: 1rem 0;
    }
  }

  .recent-search-section {
    overflow-y: scroll;
    .search-word {
      display: flex;
      align-items: center;
      justify-content: space-between;

      border-bottom: 1px solid ${color.medium_gray};
      p {
        width: 90%;
        padding: 1.5rem 0;
        font-size: 1.3rem;
        cursor: pointer;
        color: ${color.dark_gray2};
      }
      & > button {
        font-size: 1.3rem;
        color: ${color.medium_gray2};
        cursor: pointer;
      }
    }
  }
`;
