import { useEffect, useState } from "react";

import { Exercise } from "../../models/index.ts";
import { reqGetAllExercise } from "../../service/exerciseService";
import Typography from "../../components/Typography/Typography";
import ItemExercise from "../../components/Exercise/ItemExercise.tsx";

import '../../App.css'
import HeaderPage from "../../components/HeaderPage.tsx";
import { RootState } from "../../store/index.ts";
import { useSelector } from "react-redux";

export const Exercises = () => {

  const [exercises, setExercises] = useState<Exercise[]>();
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);

  useEffect(() => {
    const getExercise = async () => {
      const response = await reqGetAllExercise();
      setExercises(response);
    };

    getExercise();
  }, []);

  return (
    <>
      <div className={`flex flex-col items-center ${preferenceUser?.theme === "dark" ? "bg-dark-1" : "bg-light-3"} w-full h-full gap-3 `}>
        <HeaderPage title="Ejercicios" path="/user/home"/>
        <main className="flex flex-col gap-4 p-6 w-full">
          {exercises &&
            exercises.map((exercise, index) => (
              <ItemExercise
                key={index}
                exercise={exercise}
              />
            ))}
        </main>
      </div>
    </>
  );
};
