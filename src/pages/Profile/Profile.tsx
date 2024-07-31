import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Link } from "react-router-dom";

import Typography from "../../components/Typography/Typography";
import ItemProfile from "../../components/Profile/ItemProfile";

import iconPencil from "../../assets/icons/pencil.png";
import { useEffect, useState } from "react";
import Logout from "../../components/Logout";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

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
            <Typography variant="span-black">
              {user?.name + " " + user?.lastname}
            </Typography>
            <Typography variant="span-light-black">{user?.email}</Typography>
          </div>
          <div className="flex justify-center items-center">
            <Link to="/user/profile/edit">
              <div>
                <img className="w-8" src={iconPencil} />
              </div>
            </Link>
          </div>
        </div>
        <ItemProfile label="Edad" value={age} />
        <ItemProfile label="Peso" value={user?.weight + " " + user?.unit} />
        <ItemProfile label="Altura" value={user?.height} />
        <ItemProfile label="Indice de masa corporal" value={user?.BMI.toFixed(2)} />
        <Logout />
      </div>
    </>
  );
};

export default Profile;
