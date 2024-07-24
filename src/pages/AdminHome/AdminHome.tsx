import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Logout from "../../components/Logout";

const AdminHome = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
        AdminHome
        <div>Bienvenido Admin {user?.name} </div>
        <Logout />
    </div>
  );
};

export default AdminHome;
