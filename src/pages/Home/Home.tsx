import { RootState } from "../../store/index.ts";
import { useSelector } from "react-redux";
import Logout from "../../components/Logout.tsx";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <div>
        User Home
        <div>Bienvenido Usuario {user?.name}</div>
        <Logout />
      </div>
    </>
  );
};

export default Home;
