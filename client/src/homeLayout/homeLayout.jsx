import React from "react";
import Home from "../pages/viewMap/viewMap";
import Navbar from "../components/navbar/navbar";
import "./index.css";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="flex column home-page">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
