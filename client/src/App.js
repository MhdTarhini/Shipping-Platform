import "./App.css";
import "./utilities.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import HomeLayout from "./homeLayout/homeLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomeLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
