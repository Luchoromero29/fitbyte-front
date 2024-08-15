import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Routine } from "../../models";
import { reqGetRoutineById } from "../../service/routineService";
import HeaderPage from "../../components/HeaderPage";
import { ButtonAddActivity } from "../../components/Buttons/Buttons";
import Activity from "../../components/Activity/Activity";

const RoutineDetails = () => {
  const { id } = useParams();

  const [routine, setRoutine] = useState<Routine>({
    id: 0,
    name: "",
    duration: 0,
    day: "Indefinido",
    planId: 0,
  });

  useEffect(() => {
    const getRoutine = async () => {
      if (id) {
        const response = await reqGetRoutineById(id);
        setRoutine(response);
      }
    };

    getRoutine();
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

        <main className="w-full p-6">
          <Activity />
        </main>
        <div className="">
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
