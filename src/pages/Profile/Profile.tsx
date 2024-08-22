import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";

import Typography from "../../components/Typography/Typography";

import iconPencil from "../../assets/icons/arrow-rigth-white.png";
import { useEffect, useState } from "react";
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
              <Typography variant="span-white">
                {user?.name + " " + user?.lastname}
              </Typography>
              <Typography variant="span-light-white">{user?.email}</Typography>
            </div>
            <div className="flex justify-center items-center">
              <div>
                <img className="w-8" src={iconPencil} />
              </div>
            </div>
          </Link>
        </div>
        <ItemOptions label="Configuración" />
        <ItemOptions label="Preguntas frecuentes" />
        <ItemOptions label="Sobre nosotros" />
        <ItemOptions label="Ayuda" />
        <Logout />
      </div>
    </>
  );
};

export default Profile;
