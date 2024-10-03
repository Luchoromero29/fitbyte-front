import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Typography from "../Typography/Typography";
import ItemSectionRutine from "./ItemSectionRutine";

import workoutViolet from "../../assets/icons/workout-violet.png";
import { useEffect, useState } from "react";
import { reqGetRoutineFromActivePlanByUserId  } from "../../service/routineService";
import { Link } from "react-router-dom";
import { Plan, Routine } from "../../models";
import { ButtonAddSerie } from "../Buttons/Buttons";
import LoadingDumbbell from "../LoadingDumbbell";
import plus from "../../assets/icons/add-violet.png";
import { reqGetActivePlanByUserId } from "../../service/activePlanService";

const SecctionHomeRutine = () => {
  const preference = useSelector((state: RootState) => state.preferenceUser);
  const [rutinesActivePlan, setRutinesActivePlan] = useState<Array<Routine>>(
    []
  );
  const [visibleRoutines, setVisibleRoutines] = useState<number>(4);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activePlan, setActivePlan] = useState<Plan>();

  useEffect(() => {
    // Solo realiza la solicitud si existe un userId
    if (!preference?.userId) return;

    const getRoutinesActivePlanByUserId = async () => {
      setIsLoading(true); // Inicia la carga al hacer la solicitud
      const rutinesActivePlan = await reqGetRoutineFromActivePlanByUserId(
        preference.userId
      );

      if (!("status" in rutinesActivePlan)) {
        setRutinesActivePlan(rutinesActivePlan);
      }

      setIsLoading(false);
    };

    const getActivePlan = async () => {
      setIsLoading(true); // Inicia la carga al hacer la solicitud
      const activePlan = await reqGetActivePlanByUserId(preference.userId);

      if (!("status" in activePlan)) {
        setActivePlan(activePlan);
      }
      setIsLoading(false);
    };

    getActivePlan();

    getRoutinesActivePlanByUserId();
    setIsLoading(false);
  }, [preference?.userId]); // Actualiza el efecto cuando cambia userId

  // Función para mostrar más rutinas
  const handleShowMore = () => {
    setVisibleRoutines((prevVisibleRoutines) => prevVisibleRoutines + 4); // Muestra 4 más cada vez que se hace clic
  };


  return (
    <>
      <section>
        <div className="flex gap-2 items-center">
          <Typography
            variant={`h4-${preference?.theme === "dark" ? "white" : "black"}`}
          >
            Rutinas
          </Typography>
          <Typography variant={`span-medium-violet`}>de plan activo</Typography>
        </div>
        <main className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-2 w-full">
            {isLoading ? (
              <div className="col-span-2">
                <LoadingDumbbell />
              </div>
            ) : (
              <>
                {rutinesActivePlan?.slice(0, visibleRoutines).map((routine) => (
                  <div className="col-span-1 row-span-1" key={routine.id}>
                    <Link to={`/user/home/plans/routine/${routine.id}`}>
                      <ItemSectionRutine
                        routine={routine}
                        theme={preference?.theme}
                        pathImg={workoutViolet}
                      />
                    </Link>
                  </div>
                ))}
                {visibleRoutines > rutinesActivePlan?.length && (
                  <>
                    {activePlan ? (
                      <Link to={`/user/home/plans/${activePlan?.id}`}>
                        <ItemSectionRutine
                          
                          label="Crear"
                          theme={preference?.theme}
                          pathImg={plus}
                        />
                      </Link>
                    ) : (
                      <Link to={`/user/home/plans`}>
                        <ItemSectionRutine
                          label="Crear"
                          theme={preference?.theme}
                          pathImg={plus}
                        />
                      </Link>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          {rutinesActivePlan && visibleRoutines < rutinesActivePlan.length && (
            <div className=" flex justify-center w-32">
              <ButtonAddSerie
                onConfirm={handleShowMore}
                label="Mostrar mas"
                color={`${preference?.theme === "dark" ? "white" : "black"}`}
              />
            </div>
          )}
        </main>
      </section>
    </>
  );
};

export default SecctionHomeRutine;
