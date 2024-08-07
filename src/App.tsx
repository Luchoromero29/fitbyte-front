import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import AdminRoute from "./components/AdminRoutes.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import { Plans } from "./pages/Plans/Plans.tsx";
import Register from "./pages/Register/Register.tsx";
import { Exercises } from "./pages/Exercises/Exercises.tsx";


const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

const App: React.FC = () => {


  

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/user/home" element={<Home />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/home/plans" element={<Plans />} />
            <Route path="/user/home/exercises" element={<Exercises />} />
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
