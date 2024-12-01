import "./Home.css";

import ItemHomeEntrenamient from "../../components/Home/SectionHomeEntrenamient.tsx";
import SectionHomeRutine from "../../components/Home/SectionHomeRutine.tsx";
import SectionHomeExercise from "../../components/Home/SectionHomeExercise.tsx";

const Home = () => {
  return (
    <>
      <div
        className={`dark:bg-dark-1 bg-light-3  min-h-screen w-full flex flex-col p-2 `}
      >
        <ItemHomeEntrenamient />
        <SectionHomeRutine />
        <SectionHomeExercise />
      </div>
    </>
  );
};

export default Home;


