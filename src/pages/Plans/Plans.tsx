import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ButtonAddPink } from "../../components/Buttons/Buttons";
import { ActivePlan, CreatePlan, Plan } from "../../models";
import AlertCreatePlan from "../../components/Plans/AlertCreatePlan";
import {
  reqCreatePlan,
  reqDeletePlan,
  reqGetAllPlansByUserId,
} from "../../service/planService";
import ItemPlan from "../../components/Plans/ItemPlan";
import { ErrorDialogI } from "../../models";
import { TextIsEmpty } from "../../components/TextIsEmpty";
import HeaderPage from "../../components/HeaderPage";
import MessageDialog from "../../components/Modal/MessageDialog";
import {
  reqGetActivePlanByUserId,
  reqCreateActivePlan,
  reqUpdateActivePlan,
} from "../../service/activePlanService";

export const Plans = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [plans, setPlans] = useState<Array<Plan>>([]);
  const [activePlan, setActivePlan] = useState<ActivePlan>();
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isError, setIsError] = useState<ErrorDialogI>({
    active: false,
    title: "",
    message: "",
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);

  // Obtener todos los planes y el plan activo del usuario
  useEffect(() => {
    const getAllPlans = async () => {
      
        if (user) {
          const plansData = await reqGetAllPlansByUserId(user.id);
          setPlans(plansData);
          setIsEmpty(plansData.length === 0);

          const activePlanData = await reqGetActivePlanByUserId(user.id);

          
          if (!("status" in activePlanData)) {
            setActivePlan(activePlanData);
          }
        }
    };

    getAllPlans();
  }, [user, showAlert]);

  // Mostrar alerta de creación de plan
  const showAlertCreatePlan = () => {
    setShowAlert(true);
  };

  // Crear un nuevo plan
  const createPlan = async (data: CreatePlan) => {
    if (data.name.trim() === "") {
      setIsError({
        active: true,
        title: "El nombre no puede ser vacío",
        message: "",
      });
      setShowAlert(false);
      return;
    }

    try {
      const newPlan = await reqCreatePlan(data.userId, data.name, data.description);
      
      // Si no hay planes o el plan activo es null, establecer el nuevo plan como activo
      if (isEmpty && !activePlan && user) {
        const newActivePlan = await reqCreateActivePlan(newPlan.id, user.id);
        setActivePlan({ id: newActivePlan.id, planId: newPlan.id, userId: user.id });
        setIsEmpty(false);
      } else if (activePlan?.planId === null && user) {
        // Si el plan activo es null, actualizar el plan activo con el nuevo plan
        const updatedActivePlan = await reqUpdateActivePlan(activePlan.id, newPlan.id);
        setActivePlan(updatedActivePlan);
      }

      setPlans((prevPlans) => [...prevPlans, newPlan]);
    } catch (error) {
      setIsError({
        active: true,
        title: "Error al crear el plan",
        message: error instanceof Error ? error.message : "",
      });
    } finally {
      setShowAlert(false);
    }
  };

  // Cancelar la creación del plan
  const cancelCreatePlan = () => {
    setShowAlert(false);
  };

  // Eliminar un plan de la lista
  const removePlanFromList = async (id: number) => {
    try {
      await reqDeletePlan(id);
      setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));

      if (plans.length === 1) {
        setIsEmpty(true);
      }
    } catch (error) {
      setIsError({
        active: true,
        title: "Error al eliminar el plan",
        message: error instanceof Error ? error.message : "",
      });
    }
  };

  return (
    <div
      className={`${
        preferenceUser?.theme === "dark" ? "bg-dark-1" : "bg-light-3"
      } w-full h-full flex flex-col items-center`}
    >
      <HeaderPage title="Planes" path="/user/home" />
      <div className="fixed bottom-10">
        <ButtonAddPink
          onConfirm={showAlertCreatePlan}
          label="Crear"
          color={preferenceUser?.theme === "dark" ? "white" : "black"}
        />
      </div>
      <main className="flex flex-col gap-4 p-6 w-full">
        {!isEmpty ? (
          plans?.map((plan: Plan, index) => (
            <ItemPlan
              key={index}
              plan={plan}
              onPlanDelete={removePlanFromList}
            />
          ))
        ) : (
          <TextIsEmpty label="Planes" />
        )}
      </main>
      {showAlert && (
        <AlertCreatePlan
          onConfirm={createPlan}
          onCancel={cancelCreatePlan}
          active={showAlert}
        />
      )}
      {isError.active && (
        <MessageDialog
          title={isError.title}
          message={isError.message || ""}
          onConfirm={() => setIsError({ ...isError, active: false })}
          active={isError.active}
        />
      )}
    </div>
  );
};
