import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Activity as ActivityModel, Routine } from "../../models";
import { reqGetRoutineById } from "../../service/routineService";
import HeaderPage from "../../components/HeaderPage";
import {
  ButtonAddActivity,
  ButtonViolet,
} from "../../components/Buttons/Buttons";
import Activity from "../../components/Activity/Activity";
import { reqGetActivitiesByRoutineId } from "../../service/activityService";
import { TextIsEmpty } from "../../components/TextIsEmpty";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  reqGetActivePlanByUserId,
  reqUpdateActivePlanByUserId,
} from "../../service/activePlanService";
import LoadingDumbbell from "../../components/LoadingDumbbell";

//import { reqGetActivePlanByUserId, reqCreateActivePlan, reqUpdateActivePlan } from "../../service/activePlanService";

const RoutineDetails = () => {
  const { id } = useParams();

  const preferenceUser = useSelector(
    (state: RootState) => state.preferenceUser
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [routine, setRoutine] = useState<Routine>({
    id: 0,
    name: "",
    day: "Indefinido",
    planId: 0,
  });

  const [activities, setActivities] = useState<Array<ActivityModel>>();

  useEffect(() => {
    const getRoutine = async () => {
      if (id) {
        const response = await reqGetRoutineById(id);

        setRoutine(response);
      }
    };

    const getActivitiesByRoutineId = async () => {
      if (id) {
        const response = await reqGetActivitiesByRoutineId(id);
        if (response.length >= 1) setIsEmpty(false);
        setActivities(response);
      }
    };

    getRoutine();
    getActivitiesByRoutineId();
    setIsLoading(false);
  }, []);

  const handleDeleteActivity = (id: number) => {
    setActivities(activities?.filter((activity) => activity.id !== id));
    if (activities?.length === 1) setIsEmpty(true);
  };

  //Actualmente no hace nada, pero es necesaria para que no de error
  const handleCreateActivity = () => {};

  const handleInit = async () => {
    if (!user) return;

    const response = await reqGetActivePlanByUserId(user?.id);

    if (routine.planId !== response.id) {
      await reqUpdateActivePlanByUserId(preferenceUser?.userId, routine.planId);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center w-full gap-2">
        <HeaderPage
          title={routine?.name}
          path={`/user/home/plans/${routine.planId}`}
        />
        {!isEmpty && (
          <div className="flex items-center justify-end w-full px-6">
            <ButtonViolet label="Iniciar rutina" onConfirm={handleInit} />
          </div>
        )}

        <main className="w-full  flex flex-col px-1 gap-2">
          {isLoading ? (
            <LoadingDumbbell />
          ) : (
            <>
              {!isEmpty ? (
                <>
                  {activities?.map((activity: ActivityModel, index) => (
                    <Activity
                      key={index}
                      activity={activity}
                      onDelete={handleDeleteActivity}
                    />
                  ))}
                </>
              ) : (
                <TextIsEmpty label="Actividades" />
              )}
            </>
          )}
        </main>
        <div className="flex items-center justify-center mb-6">
          <Link to={`/user/home/plans/routine/${routine.id}/exercises`}>
            <ButtonAddActivity
              label="Agregar Actividad"
              onConfirm={handleCreateActivity}
              color={preferenceUser?.theme === "dark" ? "white" : "black"}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoutineDetails;
