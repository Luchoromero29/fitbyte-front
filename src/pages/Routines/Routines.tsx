import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { CreateRoutine, ErrorDialogI, Plan, Routine } from "../../models";
import {
  reqCreateRoutine,
  reqGetAllRoutinesByPlanId,
} from "../../service/routineService";
import ItemRoutine from "../../components/Routines/ItemRoutine";

import { TextIsEmpty } from "../../components/TextIsEmpty";
import { ButtonAddViolet } from "../../components/Buttons/Buttons";
import AlertCreateRoutine from "../../components/Routines/AlertCreateRoutine";
import ErrorDialog from "../../components/Modal/MessageDialog";
import { RootState } from "../../store";
import HeaderPage from "../../components/HeaderPage";
import { reqGetPlanById } from "../../service/planService";
import LoadingDumbbell from "../../components/LoadingDumbbell";

const Routines = () => {
  const { planId } = useParams<{ planId: string }>();

  const preferenceUser = useSelector(
    (state: RootState) => state.preferenceUser
  );
  const [plan, setPlan] = useState<Plan>(
    useSelector((state: RootState) => state.plan)
  );
  //const plan = useSelector((state: RootState) => state.plan);
  const [routines, setRoutines] = useState<Array<Routine>>();
  const [isEmpty, setIsEmpty] = useState(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<ErrorDialogI>({
    active: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const getAllRoutines = async () => {
      const data = await reqGetAllRoutinesByPlanId(Number(planId));
      if (data && data.length > 0) {
        setRoutines(data);
        setIsEmpty(false);
      }
    };

    const getPlanById = async () => {
      const data = await reqGetPlanById(Number(planId));
      setPlan(data);
    };

    getAllRoutines();
    getPlanById();
    setIsLoading(false);
  }, [showAlert]);

  const showAlertCreateRoutine = () => {
    setShowAlert(true);
  };

  const createRoutine = async (data: CreateRoutine) => {
    if (data.name === "" || data.day === null) {
      setIsError({
        active: true,
        title: "El nombre y/o dia no puede ser vacio",
        message: "",
      });
      setShowAlert(false);
      return;
    }

    await reqCreateRoutine(data.planId, data.name, data.day);
    setShowAlert(false);
  };

  const removeRoutineFromList = (id: number) => {
    if (routines?.length === 1) setIsEmpty(true);
    setRoutines(routines?.filter((routine) => routine.id !== id));
  };

  const cancelCreateRoutine = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div
        className={`${
          preferenceUser?.theme === "dark" ? "bg-dark-1" : "bg-light-3"
        } w-full h-full flex flex-col relative`}
      >
        <HeaderPage
          title="Rutinas"
          description={`Plan: ${plan.name}`}
          path="/user/home/plans"
        />
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2">
          <ButtonAddViolet
            onConfirm={showAlertCreateRoutine}
            label="Crear"
            color={preferenceUser?.theme === "dark" ? "white" : "black"}
          />
        </div>
        <main className="flex flex-col gap-2 p-1">
          {isLoading ? (
            <LoadingDumbbell />
          ) : (
            <>
              {!isEmpty ? (
                routines?.map((routine: Routine, index) => (
                  <ItemRoutine
                    key={index}
                    routine={routine}
                    onRoutineDelete={removeRoutineFromList}
                  />
                ))
              ) : (
                <TextIsEmpty label="Rutinas" />
              )}
            </>
          )}
        </main>
        {showAlert && (
          <AlertCreateRoutine
            onConfirm={createRoutine}
            onCancel={cancelCreateRoutine}
            active={showAlert}
          />
        )}
        {isError.active && (
          <ErrorDialog
            title={isError.title}
            message={isError.message || ""}
            onConfirm={() => setIsError({ ...isError, active: false })}
            active={isError.active}
            theme={preferenceUser?.theme}
          />
        )}
      </div>
    </>
  );
};

export default Routines;
