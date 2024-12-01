import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import ItemNavbar from "./ItemNavbar";
import Typography from "../Typography/Typography";
import { RootState } from "../../store";

import iconProfileWhite from "../../assets/icons/navbar/user-white.png";
import iconProfileBlack from "../../assets/icons/navbar/user-black.png";
import iconHomeWhite from "../../assets/icons/navbar/home-white.png";
import iconHomeBlack from "../../assets/icons/navbar/home-black.png";
import iconDashboardWhite from "../../assets/icons/navbar/wrench-white.png";
import iconDashboardBlack from "../../assets/icons/navbar/wrench-black.png";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.rolId === 1;
  const location = useLocation();
  const currentPath = location.pathname;
  const preference = useSelector((state: RootState) => state.preferenceUser);


  const isDark = preference?.theme === "dark";


  return (
    <>
      <div
        className={`dark:bg-dark-2 bg-light-1
        } shadow-2xl w-full h-auto  top-0 p-2 flex justify-between items-center`}
      >
        <div className="dark:text-white flex">
          <Typography variant={`logo`}>Fit</Typography>
          <Typography variant="logo-violet">Byte</Typography>
          <Typography variant={`logo`}>+</Typography>
        </div>
        <ul
          className={`grid  ${isAdmin ? "grid-cols-3" : "grid-cols-2"} gap-2`}
        >
          <ItemNavbar
            label=""
            src={isDark ? iconHomeWhite : iconHomeBlack}
            path="/user/home"
            active={currentPath.includes("/user/home")}
          />
          <ItemNavbar
            label=""
            src={
              isDark ? iconProfileWhite : iconProfileBlack
            }
            path="/user/profile"
            active={currentPath.includes("/user/profile")}
          />
          {isAdmin && (
            <ItemNavbar
              label=""
              src={
                isDark
                  ? iconDashboardWhite
                  : iconDashboardBlack
              }
              path="/admin/dashboard"
              active={currentPath.includes("/admin/dashboard")}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
