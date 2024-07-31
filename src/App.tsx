import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AdminRoute from "./components/AdminRoutes.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import { Plans } from "./pages/Plans/Plans.tsx";

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
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/user/home" element={<Home />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/plans" element={<Plans />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<ProtectedLayout />}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
