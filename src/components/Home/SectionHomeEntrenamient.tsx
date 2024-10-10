import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Typography from "../Typography/Typography";
import { useEffect, useState } from "react";
import { reqGetActivePlanByUserId } from "../../service/activePlanService";
import { Plan } from "../../models";
import LoadingDumbbell from "../LoadingDumbbell";
import { Link } from "react-router-dom";
import { reqGetAllPlansByUserId } from "../../service/planService";
import plus from "../../assets/icons/add-violet.png";
import ItemPlanSectionEntrenamient from "./ItemPlanSectionEntrenamient";

const SectionHomeEntrenamient = () => {
  const preference = useSelector((state: RootState) => state.preferenceUser);
  const [activePlan, setActivePlan] = useState<Plan>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [plans, setPlans] = useState<Array<Plan>>([]);

  useEffect(() => {
    const getActivePlan = async () => {
      setIsLoading(true); // Empieza la carga
      const activePlanData = await reqGetActivePlanByUserId(preference?.userId);

      if (!("status" in activePlanData)) {
        setActivePlan(activePlanData);
      }
      setIsLoading(false); // Termina la carga
    };

    const getAllPlansByUserId = async () => {
      setIsLoading(true); // Empieza la carga
      const plansData = await reqGetAllPlansByUserId(preference?.userId);
      setPlans(plansData);
      setIsLoading(false); // Termina la carga
    };

    getActivePlan();
    getAllPlansByUserId();
  }, [preference?.userId]);

  return (
    <>
      <div
        className={`w-full ${
          preference?.theme === "dark" ? "bg-dark-2" : "bg-light-1"
        } rounded-lg p-4 h-fit`}
      >
        <div className="flex justify-between items-center">
          <Typography
            variant={`h4-${preference?.theme === "dark" ? "white" : "black"}`}
          >
            Entrenamiento
          </Typography>
          <div className={`bg-violet-1 p-2 rounded-full shadow-2xl`}>
            <Link to="/user/home/plans">
              <Typography variant={`span-medium-white`}>Ver planes</Typography>
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <LoadingDumbbell />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Typography
              variant={`span-medium-${
                preference?.theme === "dark" ? "white" : "black"
              }`}
            >
              Tus planes
            </Typography>

            <div className="flex gap-2 overflow-x-auto">
              {plans.map((plan) =>
                <div>
                  <ItemPlanSectionEntrenamient
                    label={plan.name}
                    isActive={plan.id === activePlan?.id}
                    theme={preference?.theme}
                    planId={plan.id}
                    key={plan.id}
                  />
                </div>
              )}
              <div className="flex flex-col items-center">
                <div
                  className={`${
                    preference?.theme === "dark" ? "bg-dark-3" : "bg-light-2"
                  } rounded-lg px-3 py-4 text-center flex shadow-md`}
                >
                  <Link to={`/user/home/plans`} className="flex gap-2 w-16">
                    <Typography
                      variant={`span-medium-${
                        preference?.theme === "dark" ? "white" : "black"
                      }`}
                    >
                      Crear
                    </Typography>
                    <img className="w-6" src={plus} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};



export default SectionHomeEntrenamient;
