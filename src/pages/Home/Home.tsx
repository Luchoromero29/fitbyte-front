import { RootState } from "../../store/index.ts";
import { useSelector } from "react-redux";
import Typography from "../../components/Typography/Typography.tsx";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const preference = useSelector((state: RootState) => state.preferenceUser);
  return (
    <>
      <div className={`${preference?.theme === "dark" ? "bg-dark-1" : "bg-light-3"} min-h-screen w-full flex justify-center `}>
        <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-6 m-6">
          <div className="row-span-1 col-span-2 bg-light-1 bento-item h-44">
            <Typography variant="h3-black">Hola, {user?.name}!</Typography>
          </div>

          <div className="row-span-1 col-span-1 bg-pink-2 bento-item">
            <Typography variant="h5-black">Estadisticas</Typography>
          </div>

          <div className="row-span-2 col-span-1 bg-violet-2 bento-item">
            <Link to="/user/home/plans">
              <div className="w-full h-full">
                <Typography variant="h5-white">Planes</Typography>
              </div>
            </Link>
          </div>
          <div className="row-span-1 col-span-1 bg-black bento-item">
            <Link to="/user/home/exercises">
              <div className="w-full h-full">
                <Typography variant="h5-white">Ejercicios</Typography>
              </div>
            </Link>
          </div>
          <div className="row-span-1 col-span-2 bg-pink-5 bento-item h-44">
            <Typography variant="h3-black">Clima de hoy </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
