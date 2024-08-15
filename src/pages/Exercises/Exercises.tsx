import { useEffect, useState } from "react";

import { Exercise } from "../../models/index.ts";
import { reqGetAllExercise } from "../../service/exerciseService";
import Typography from "../../components/Typography/Typography";
import ItemExercise from "../../components/Exercise/ItemExercise.tsx";

import '../../App.css'
import HeaderPage from "../../components/HeaderPage.tsx";

export const Exercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>();

  useEffect(() => {
    const getExercise = async () => {
      const response = await reqGetAllExercise();
      setExercises(response);
    };

    getExercise();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-dark-1 w-full h-custom gap-3 ">
        <HeaderPage title="Ejercicios" path="/user/home"/>
        <main className="flex flex-col gap-4 p-6 ">
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
