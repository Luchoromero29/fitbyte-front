import { useEffect, useState } from "react";
import Typography from "../../components/Typography/Typography";
import { reqGetAllExercise } from "../../service/exerciseService";
import { Exercise } from "../../models";
import HeaderPage from "../../components/HeaderPage";
import { useNavigate, useParams } from "react-router-dom";
import ItemExerciseSelectable from "../../components/Exercise/ItemExerciseSelectable";
import { ButtonConfirmViolet } from "../../components/Buttons/Buttons";
import { useDispatch } from "react-redux";
import { setExercise } from "../../store/exerciseSlice";
import { reqCreateActivity } from "../../service/activityService";
import { Focus } from "../../models/types";

// interface SelectExerciseProps {
//     routineId: number
// }

const SelectExercise = () => {
  
  const [exercises, setExercises] = useState<Array<Exercise>>();
  const [exerciseActive, setExerciseActive] = useState<Exercise>();

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const { id } = useParams();
  

  useEffect(() => {
    const getAllExercises = async () => {
      const response = await reqGetAllExercise();
      setExercises(response);
    };

    getAllExercises();
  }, []);

  const handleSelect = (exercise: Exercise) => {
    setExerciseActive(exercise)
  };

  const handleConfirmSelect = async () => {
    if (exerciseActive) {
      dispatch(setExercise(exerciseActive));
      
      const activity = {
        name: exerciseActive.name,
        note: "",
        rest: 60,
        postRest: 120,
        focus: "Fuerza" as Focus,
        exerciseId: exerciseActive.id,
        routineId: Number(id) 
      }
      await reqCreateActivity(activity)
      navigate(`/user/home/plans/routine/${id}`)
    }
  };

  return (
    <div className="flex flex-col items-center">
      <HeaderPage
        title="Ejercicios"
        description={"Selecciona el ejercicio para tu actividad"}
        path={`/user/home/plans/routine/${id}`}
      />
      <main className="p-6 flex flex-col gap-3">
        s
        {exercises?.map((exercise: Exercise, index) => (
          <ItemExerciseSelectable
            key={index}
            exercise={exercise}
            active={exercise.id === exerciseActive?.id}
            handleSelect={handleSelect}
          />
        ))}
      </main>

      <div>
        <ButtonConfirmViolet
          label="Seleccionar"
          onConfirm={handleConfirmSelect}
          active={exerciseActive ? true : false}
        />
      </div>
    </div>
  );
};

export default SelectExercise;
