import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Activity as ActivityModel, Routine } from "../../models";
import { reqGetRoutineById } from "../../service/routineService";
import HeaderPage from "../../components/HeaderPage";
import { ButtonAddActivity } from "../../components/Buttons/Buttons";
import Activity from "../../components/Activity/Activity";
import { reqGetActivitiesByRoutineId } from "../../service/activityService";

const RoutineDetails = () => {
  const { id } = useParams();

  const [routine, setRoutine] = useState<Routine>({
    id: 0,
    name: "",
    duration: 0,
    day: "Indefinido",
    planId: 0,
  });

  const [activities, setActivities] = useState<Array<ActivityModel>>()

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
        console.log(response);
        
        setActivities(response);
      }
    };

    getRoutine();
    getActivitiesByRoutineId()
  }, []);

  const handleCreateActivity = () => {


    

  };

  return (
    <>
      <div className="flex flex-col items-center w-full gap-2">
        <HeaderPage
          title={routine?.name}
          path={`/user/home/plans/${routine.planId}`}
        />

        <main className="w-full p-6 flex flex-col gap-3">
          {activities?.map((activity: ActivityModel, index ) => (
            <Activity key={index} activity={activity}/>
          ))}
        </main>
        <div className="flex items-center justify-center mb-6">
          <Link to={`/user/home/plans/routine/${routine.id}/exercises`}>
            <ButtonAddActivity
              label="Agregar Actividad"
              onConfirm={handleCreateActivity}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoutineDetails;
