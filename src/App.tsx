import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login/Login.tsx"
import Home from "./pages/Home/Home.tsx"
import PrivateRoute from "./components/PrivateRoute.tsx";

const App: React.FC = () => {

  return (
    <BrowserRouter>

    
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/user/home" element={<Home/>} />
          </Route>
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
