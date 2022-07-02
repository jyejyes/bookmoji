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
import { composeWithDevTools } from "redux-devtools-extension"; // 리덕스 개발자 도구
import rootReducer from "./store/reducers";
import Oauth from "./components/Auth/Oauth";

const store = createStore(rootReducer, composeWithDevTools());

function App() {
  const AccessUsersPage = Access(UserPage, true);
  const AccessCollectPage = Access(CollectPage, true);

  return (
    <Provider store={store}>
      <GlobalStyle />
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/:auth" element={<AuthPage />} />
        <Route path="/search/:bookName" element={<SearchPage />} />
        <Route path="/m/search/" element={<MobileSearch />} />
        <Route path="/users" element={<AccessUsersPage />} />
        <Route path="/collect" element={<AccessCollectPage />} />
        <Route path="/oauth" element={<Oauth />} />
      </Routes>
    </Provider>
  );
}

export default App;
