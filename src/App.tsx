import React, { useState, useEffect } from "react";
/** Components */
import { Navbar } from "./components";
/** Screens */
import { Home, Detail } from "./screens";
/** React Router Dom */
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen overflow-y-scroll">
      <Navbar />
      <div className="max-w-[1440px] p-4 w-full">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/detail" element={<Detail />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
