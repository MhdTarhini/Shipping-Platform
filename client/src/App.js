import "./App.css";
import "./utilities.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import HomeLayout from "./homeLayout/homeLayout";
import { Provider } from "react-redux";
import { store } from "./rkt/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomeLayout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
