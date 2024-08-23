import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";

import Typography from "../../components/Typography/Typography";

import iconArrowRightWhite from "../../assets/icons/arrow-rigth-white.png";
import iconArrowRightBalck from "../../assets/icons/arrow-rigth-black.png";
import Logout from "../../components/Logout";
import ItemOptions from "../../components/Profile/ItemOptions";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const preference = useSelector((state: RootState) => state.preferenceUser);

  return (
    <>
      <div className="flex flex-col items-center p-6 gap-4">
        <div className="flex justify-between items-center w-full p-4">
          <Link to="/user/profile/account" className="flex justify-between items-center w-full">
            <div className="flex flex-col items-start ">
              <Typography variant={`span-${preference?.theme === "dark" ? "white" : "black"}`}>
                {user?.name + " " + user?.lastname}
              </Typography>
              <Typography variant={`span-light-${preference?.theme === "dark" ? "white" : "black"}`}>{user?.email}</Typography>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <img className="w-8" src={preference?.theme === "dark" ? iconArrowRightWhite : iconArrowRightBalck} />
              </div>
            </div>
          </Link>
        </div>
        <ItemOptions label="Configuración" path="/user/profile/configuration"/>
        <ItemOptions label="Preguntas frecuentes" path="/user/profile/frequent-questions"/>
        <ItemOptions label="Sobre nosotros" path="/user/profile/about"/>
        <ItemOptions label="Ayuda" path="/user/profile/help"/>
        <Logout />
      </div>
    </>
  );
};

export default Profile;
