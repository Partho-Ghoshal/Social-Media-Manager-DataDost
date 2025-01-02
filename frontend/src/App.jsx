import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Youtube from "./pages/Youtube";

const App = () => (
  <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh]">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/youtube" element={<Youtube />} />
    </Routes>
  </div>
);

export default App;
