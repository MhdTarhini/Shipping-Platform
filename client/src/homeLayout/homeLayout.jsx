import React from "react";
import Home from "../pages/home/home";
import Navbar from "../components/navbar/navbar";
import "./index.css";

function HomeLayout() {
  return (
    <div className="flex column home-page">
      <Navbar />
      <Home />
    </div>
  );
}

export default HomeLayout;
