import { RootState } from "../../store/index.ts";
import { useSelector } from "react-redux";

import "./Home.css";

//import ItemHomeWelcome from "../../components/Home/ItemHomeWelcome.tsx";

import ItemHomeEntrenamient from "../../components/Home/SectionHomeEntrenamient.tsx";
import SectionHomeRutine from "../../components/Home/SectionHomeRutine.tsx";
import SectionHomeExercise from "../../components/Home/SectionHomeExercise.tsx";


const Home = () => {
  const preference = useSelector((state: RootState) => state.preferenceUser);
  return (
    <>
      <div
        className={`${
          preference?.theme === "dark" ? "bg-dark-1" : "bg-light-3"
        } min-h-screen w-full flex flex-col p-2 `}
      >
        <ItemHomeEntrenamient />
        <SectionHomeRutine />
        <SectionHomeExercise theme={preference?.theme}/>
      </div>
    </>
  );
};

export default Home;

{
  /* <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-2 m-2">
          <div className="row-span-1 col-span-2">
            <ItemHomeWelcome path="/user/home"/>
          </div>
          <div className="row-span-1 col-span-2 bg-violet-1/80 bento-item">
            <ItemHomePlans path="/user/home/plans"/>
          </div>

          <div className="row-span-1 col-span-1 bg-light-1 bento-item">
            <Typography variant="h5-black">Estadisticas</Typography>
          </div>
          <div className="row-span-1 col-span-1 bg-dark-3 bento-item">
            <Link to="/user/home/exercises">
              <div className="w-full h-full">
                <Typography variant="h5-white">Ejercicios</Typography>
              </div>
            </Link>
          </div>
          <div className="row-span-1 col-span-2 bg-violet-4/80 bento-item h-44">
            <Typography variant="h3-black">Clima de hoy </Typography>
          </div>
        </div> */
}
