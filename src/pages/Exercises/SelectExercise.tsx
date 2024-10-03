import { useEffect, useState } from "react";
import { reqGetAllExercise } from "../../service/exerciseService";
import { Exercise } from "../../models";
import HeaderPage from "../../components/HeaderPage";
import { useNavigate, useParams } from "react-router-dom";
import ItemExerciseSelectable from "../../components/Exercise/ItemExerciseSelectable";

import { useSelector } from "react-redux";

import { reqCreateActivity } from "../../service/activityService";
import { Focus } from "../../models/types";
import { RootState } from "../../store";
import SelectFocusDialog from "../../components/Modal/SelectFocusDialog";
import LoadingDumbbell from "../../components/LoadingDumbbell";

// interface SelectExerciseProps {
//     routineId: number
// }

const SelectExercise = () => {
  const preferenceUser = useSelector(
    (state: RootState) => state.preferenceUser
  );

  const [exercises, setExercises] = useState<Array<Exercise>>();
  const [exerciseActive, setExerciseActive] = useState<Exercise>();
  const [isUpdateFocus, setIsUpdateFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const getAllExercises = async () => {
      const response = await reqGetAllExercise();
      setExercises(response);
    };

    getAllExercises();
    setIsLoading(false);
  }, []);

  const handleSelect = (exercise: Exercise) => {
    setExerciseActive(exercise);
    if (preferenceUser.customMode) {
      setIsUpdateFocus(true);
    } else {
      handleConfirmCreateActivity("Personalizado");
    }
  };

  const handleConfirmCreateActivity = async (focus: Focus) => {
    try {
      if (exerciseActive) {
        const activity = {
          name: exerciseActive.name,
          note: "",
          rest: 60,
          postRest: 120,
          focus: focus,
          exerciseId: exerciseActive.id,
          routineId: Number(id),
        };
        await reqCreateActivity(activity);

        navigate(`/user/home/plans/routine/${id}`);
      }
    } catch (error) {
      console.error("Error al actualizar el enfoque:", error);
    } finally {
      setIsUpdateFocus(false);
    }
  };

  const handelCancelSelectActivity = () => {
    setIsUpdateFocus(false);
  };

  return (
    <div className="flex flex-col items-center">
      <HeaderPage
        title="Ejercicios"
        description={"Selecciona el ejercicio para tu actividad"}
        path={`/user/home/plans/routine/${id}`}
      />
      <main className="p-6 flex flex-col gap-3">
        {isLoading ? (
          <LoadingDumbbell />
        ) : (
          <>
            {exercises?.map((exercise: Exercise, index) => (
              <ItemExerciseSelectable
                key={index}
                exercise={exercise}
                active={exercise.id === exerciseActive?.id}
                handleSelect={handleSelect}
              />
            ))}
          </>
        )}
        {isUpdateFocus && preferenceUser.customMode && (
          <SelectFocusDialog
            title="Selecciona tu enfoque"
            message=""
            onConfirm={handleConfirmCreateActivity}
            onCancel={handelCancelSelectActivity}
            active={isUpdateFocus}
          />
        )}
      </main>
    </div>
  );
};

export default SelectExercise;
