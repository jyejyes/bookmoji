import React from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./components/style/globalStyle";
import AuthPage from "./page/Auth/AuthPage";
import MainPage from "./page/MainPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth/:auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
