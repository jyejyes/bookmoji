import React from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./components/style/globalStyle";
import MainPage from "./page/MainPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
