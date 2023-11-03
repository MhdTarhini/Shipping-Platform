import React from "react";
import Home from "../pages/home/home";
import Navbar from "../components/navbar/navbar";

function HomeLayout() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default HomeLayout;
