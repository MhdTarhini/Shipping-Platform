import "./App.css";
import "./utilities.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import HomeLayout from "./homeLayout/homeLayout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./rkt/presistConfig";
import ViewMap from "./pages/viewMap/viewMap";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/v1" element={<HomeLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="view" element={<ViewMap />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
