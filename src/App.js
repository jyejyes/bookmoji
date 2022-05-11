import React from "react";
import { Route, Routes } from "react-router-dom";
import Access from "./components/common/Access";
import { GlobalStyle } from "./components/style/globalStyle";
import AuthPage from "./page/Auth/AuthPage";
import CollectPage from "./page/CollectPage";
import MainPage from "./page/MainPage";
import SearchPage from "./page/SearchPage";
import UserPage from "./page/UserPage";

function App() {
  const AccessUsersPage = Access(UserPage, true);
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/:auth" element={<AuthPage />} />
        <Route path="/search/:bookName" element={<SearchPage />} />
        <Route path="/users" element={<AccessUsersPage />} />
        <Route path="/collect" element={<CollectPage />} />
      </Routes>
    </>
  );
}

export default App;
