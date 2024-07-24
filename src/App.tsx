import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import AdminHome from "./pages/AdminHome/AdminHome.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AdminRoute from "./components/AdminRoutes.tsx";
import Navbar from "./components/Navbar.tsx";

const ProtectedLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/user/home" element={<Home />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/admin/home" element={<AdminHome />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
