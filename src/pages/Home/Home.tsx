import { RootState } from "../../store/index.ts";
import { useSelector } from "react-redux";
import Typography from "../../components/Typography/Typography.tsx";
import './Home.css'

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <div className="bg-dark-1 min-h-screen w-full flex justify-center ">
        <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-6 m-6">
          <div className="row-span-1 col-span-2 bg-light-1 bento-item h-44">
            <Typography variant="h3-black">Hola, {user?.name}!</Typography>
          </div>

          <div className="row-span-1 col-span-1 bg-pink-4 bento-item">
            <Typography variant="h5-black">Estadisticas</Typography></div>
          <div className="row-span-2 col-span-1 bg-violet-2 bento-item">
            <Typography variant="h5-white">Planes</Typography>  
          </div>
          <div className="row-span-1 col-span-1 bg-black bento-item">
            <Typography variant="h5-white">Ejercicios</Typography>  
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
