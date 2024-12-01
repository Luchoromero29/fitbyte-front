import { Link } from "react-router-dom";
import Typography from "../Typography/Typography";

import iconListViolet from "../../assets/icons/list-violet.png";


const SectionHomeExercise = () => {
  return (
    <>
      <div className="w-full my-3">
        <main
          className={`flex flex-col dark:bg-dark-2 bg-light-1
           rounded-lg px-3 py-4 w-full gap-2  shadow-sm`}
        >
          <Typography variant={`h4`}>
            Ejercicios
          </Typography>
          <Link to="/user/home/exercises" className={`flex items-center gap-2  dark:bg-dark-3 bg-light-2 p-2 rounded-lg text-center justify-center`}>
            <Typography
              variant={`span-medium`}
            >
              Ver todos los ejercicios
            </Typography>
            <img className="w-6" src={iconListViolet} alt="Lista" />
          </Link>
        </main>
      </div>
    </>
  );
};

export default SectionHomeExercise;
