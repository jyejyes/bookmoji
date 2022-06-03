import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { createStore } from "redux";
import Access from "./components/common/Access";
import { GlobalStyle } from "./components/style/globalStyle";
import AuthPage from "./page/Auth/AuthPage";
import CollectPage from "./page/CollectPage";
import MainPage from "./page/MainPage";
import MobileSearch from "./page/MobileSearch";
import SearchPage from "./page/SearchPage";
import UserPage from "./page/UserPage";
import rootReducer from "./store";

function App() {
  const AccessUsersPage = Access(UserPage, true);
  const AccessCollectPage = Access(CollectPage, true);

  const store = createStore(rootReducer);

  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth/:auth" element={<AuthPage />} />
          <Route path="/search/:bookName" element={<SearchPage />} />
          <Route path="/m/search/" element={<MobileSearch />} />
          <Route path="/users" element={<AccessUsersPage />} />
          <Route path="/collect" element={<AccessCollectPage />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
