import { useEffect, useState } from "react";

import { Exercise } from "../../models/index.ts";
import { reqGetAllExercise } from "../../service/exerciseService";
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
      <div className={`flex flex-col items-center  w-full h-full  `}>
        <HeaderPage title="Ejercicios" path="/user/home"/>
        <main className="flex flex-col gap-2 p-2 w-full">
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
