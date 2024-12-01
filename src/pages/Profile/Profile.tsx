import Logout from "../../components/Logout";
import ItemOptions from "../../components/Profile/ItemOptions";
import HeaderPage from "../../components/HeaderPage";

const Profile = () => {


  return (
    <>
      <HeaderPage title="Perfil" path="/user/home"/>
      <div className="flex flex-col items-center p-1  gap-2">
        <ItemOptions label="Cuenta" path="/user/profile/account"/>
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
