import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { RootState } from "../../store";
import { reqGetActivePlanByUserId } from "../../service/activePlanService";

import { ActivePlan, Plan, Routine } from "../../models";

import Typography from "../Typography/Typography";
import { reqGetAllRoutinesByPlanId } from "../../service/routineService";
import { reqGetPlanById } from "../../service/planService";

interface ItemHomeWelcomeProps {
  path: string;
}

const ItemHomeWelcome = ({ path }: ItemHomeWelcomeProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [activePlan, setActivePlan] = useState<ActivePlan>();
  const [plan, setPlan] = useState<Plan>();
  const [dailyRoutine, setDailyRoutine] = useState<Routine>();

  useEffect(() => {
    const fetchActivePlan = async () => {
      if (user) {
        const response = await reqGetActivePlanByUserId(user?.id);
        if (response) {
          setActivePlan(response);
          return response;
        }
      }
    };

    const fetchPlanAndRoutines = async (activePlan: ActivePlan) => {
      const dataPlan = await reqGetPlanById(activePlan?.planId);
      setPlan(dataPlan);

      const routines = await reqGetAllRoutinesByPlanId(activePlan.id);
      const todayRoutine = routines?.find(
        (routine) =>
          routine.day ===
          [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
          ][new Date().getDay()]
      );

      setDailyRoutine(todayRoutine);
    };

    const getDailyRoutine = async () => {
      const activePlan = await fetchActivePlan();
      if (activePlan) {
        await fetchPlanAndRoutines(activePlan);
      }
    };

    getDailyRoutine();
  }, [user]);

  return (
    <div className="w-full h-full bg-white rounded-2xl p-3 flex flex-col gap-4">
      <header>
        <Typography variant="h4-black">Hola {user?.name}!</Typography>
      </header>
      <main className="">
        {activePlan && plan && dailyRoutine ? (
          <Link to={`/user/home/plans/routine/${dailyRoutine.id}`} className="flex flex-col">
            <div className="flex gap-2 items-center">
              <Typography variant="span-light-black">Tu rutina de hoy</Typography>
              <Typography variant="span-black">{dailyRoutine.name}</Typography>
              <Typography variant="span-light-black">del plan</Typography>
              <Typography variant="span-black">{plan?.name}</Typography>
            </div>
            <div className="flex items-center justify-center">
              <Typography variant="span-violet">Click aqui</Typography>
            </div>
          </Link>
        ) : (
          <Typography variant="span-light-black">
            ¡Bienvenido a nuestra plataforma de gestión de entrenamiento! Aquí podrás organizar y llevar un seguimiento de tus rutinas diarias de manera eficiente y efectiva.
          </Typography>
        )}

      </main>
    </div>
  );
};

export default ItemHomeWelcome;
