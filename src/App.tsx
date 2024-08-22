import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login.tsx";
import Home from "./pages/Home/Home.tsx";
import PrivateRoute from "./components/PrivateRoutes.tsx";
import AdminRoute from "./components/AdminRoutes.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";
import Profile from "./pages/Profile/Profile.tsx";
import { Plans } from "./pages/Plans/Plans.tsx";
import Register from "./pages/Register/Register.tsx";
import { Exercises } from "./pages/Exercises/Exercises.tsx";
import LoginRoutes from "./components/LoginRoutes.tsx";
import LandingPage from "./pages/Landing/LandingPage.tsx";
import Routines from "./pages/Routines/Routines.tsx";
import RoutineDetails from "./pages/Routines/RoutineDetails.tsx";
import SelectExercise from "./pages/Exercises/SelectExercise.tsx";
import Register2 from "./pages/Register/Register2.tsx";
import AccountDetails from "./pages/Profile/AccountDetails.tsx";

const ProtectedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-dark-1 ">
        <Outlet />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA DE LANDING  */}
        <Route path="/" element={<LandingPage />} />
        

        {/* RUTAS DE INGRESO */}
        <Route element={<LoginRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register2 />} />
        </Route>

        {/* RUTAS DE USUARIOS  */}
        <Route element={<PrivateRoute />}>
          <Route element={<ProtectedLayout />}>
            <Route path="/user/home" element={<Home />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/profile/account" element={<AccountDetails />} />
            <Route path="/user/home/plans" element={<Plans />} />
            <Route path="/user/home/plans/:planId" element={<Routines />} />
            <Route path="/user/home/plans/routine/:id" element={<RoutineDetails />} />
            <Route path="/user/home/plans/routine/:id/exercises" element={<SelectExercise />} />
            <Route path="/user/home/exercises" element={<Exercises />} />
          </Route>
        </Route>

        {/* RUTAS DE ADMINISTRADOR  */}
        <Route element={<AdminRoute />}>
          <Route element={<ProtectedLayout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
