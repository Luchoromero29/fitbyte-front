import { useEffect, useState } from "react";

import { Exercise } from "../../models/index.ts";
import { reqGetAllExercise } from "../../service/exerciseService";
import Typography from "../../components/Typography/Typography";
import ItemExercise from "../../components/Exercise/ItemExercise.tsx";

import '../../App.css'

export const Exercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>();

  useEffect(() => {
    const getExercise = async () => {
      const response = await reqGetAllExercise();
      const result = await response.json();


      setExercises(result);
    };

    getExercise();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center bg-dark-1 w-full h-custom p-6 gap-3 ">
        <Typography variant="h3-white">Ejercicios</Typography>
        <div className="flex flex-col gap-4">
          {exercises &&
            exercises.map((exercise, index) => (
              <ItemExercise
                key={index}
                name={exercise.name}
                description={exercise.description}
                categoryId={exercise.categoryId}
                urlImage={exercise.urlImage}
              />
            ))}
        </div>
      </div>
    </>
  );
};
