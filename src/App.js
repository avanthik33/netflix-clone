import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/banner/Banner";
import NavBar from "./components/navBar/NavBar";
import SingleMovie from "./components/SingleMovie";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/singleMovie" element={<SingleMovie />} />
      </Routes>
    </div>
  );
}

export default App;
