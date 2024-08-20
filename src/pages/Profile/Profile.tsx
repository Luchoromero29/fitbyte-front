import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";

import Typography from "../../components/Typography/Typography";
import ItemProfile from "../../components/Profile/ItemProfile";

import iconPencil from "../../assets/icons/pencil.png";
import { useEffect, useState } from "react";
import Logout from "../../components/Logout";
import ItemOptions from "../../components/Profile/ItemOptions";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const preference = useSelector((state: RootState) => state.preferenceUser);

  const birthdate = user?.birthdate;
  const [age, setAge] = useState(0);

  useEffect(() => {
    if (birthdate) {
      const birthdateDate = new Date(birthdate);
  
      const calculateAge = (birthdateDate: Date) => {
        const today = new Date();
  
        let age = today.getFullYear() - birthdateDate.getFullYear();
  
        const monthDifference = today.getMonth() - birthdateDate.getMonth();
        const dayDifference = today.getDate() - birthdateDate.getDate();
  
        if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
          age--;
        }
  
        setAge(age);
      };
      calculateAge(birthdateDate);
    }
  }, []);
  

  return (
    <>
      <div className="flex flex-col items-center p-6 gap-4">
        <div className="flex justify-between items-center w-full p-4">
          <div className="flex flex-col items-start ">
            <Typography variant="span-white">
              {user?.name + " " + user?.lastname}
            </Typography>
            <Typography variant="span-light-white">{user?.email}</Typography>
          </div>
          <div className="flex justify-center items-center">
            <Link to="/user/profile/edit">
              <div>
                <img className="w-8" src={iconPencil} />
              </div>
            </Link>
          </div>
        </div>
        <ItemOptions label="Configuración"/>
        <ItemOptions label="Preguntas frecuentes"/>
        <ItemOptions label="Sobre nosotros"/>
        <ItemOptions label="Ayuda"/>
        <Logout />
      </div>
    </>
  );
};

export default Profile;
