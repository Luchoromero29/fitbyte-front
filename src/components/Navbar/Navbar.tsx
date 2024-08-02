import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


import ItemNavbar from "./ItemNavbar";
import Typography from "../Typography/Typography";
import { RootState } from "../../store";

import iconProfile from "../../assets/icons/navbar/user.png";
import iconHome from "../../assets/icons/navbar/home.png";
import iconDashboard from "../../assets/icons/navbar/wrench.png"

const Navbar = () => {

  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.rolId === 1
  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <>
      <div className="bg-dark-2 w-full h-auto  top-0 p-2 flex justify-between items-center">
        <div>
          <Typography variant="logo-white">Fit</Typography>
          <Typography variant="logo-violet">Byte</Typography>
          <Typography variant="logo-white">+</Typography>
        </div>
        <ul className={`grid  ${isAdmin ? "grid-cols-3" : "grid-cols-2" } gap-2`}>
          <ItemNavbar
            label=""
            src={iconHome}
            path="/user/home"
            active={currentPath.includes("/user/home")}
          />
          <ItemNavbar
            label=""
            src={iconProfile}
            path="/user/profile"
            active={currentPath.includes("/user/profile")}
          />
          {isAdmin && 
          <ItemNavbar
            label=""
            src={iconDashboard}
            path="/admin/dashboard"
            active={currentPath.includes("/admin/dashboard")}
          />}
        </ul>
        {/* <ul className="grid w-full grid-cols-3">
          <ItemNavbar
            label="Planes"
            src={iconDumbbell}
            path="/user/plans"
            active={currentPath === "/user/plans"}
          />
          <ItemNavbar
            label="Home"
            src={iconHome}
            path="/user/home"
            active={currentPath === "/user/home"}
          />
          <ItemNavbar
            label="Perfil"
            src={iconProfile}
            path="/user/profile"
            active={currentPath === "/user/profile"}
          />
        </ul> */}
      </div>
    </>
  );
};

export default Navbar;
