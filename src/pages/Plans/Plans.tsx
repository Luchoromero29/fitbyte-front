import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";
import { ButtonAddPink } from "../../components/Buttons/Buttons";
import Typography from "../../components/Typography/Typography";
import { CreatePlan, Plan } from "../../models";
import AlertCreatePlan from "../../components/Plans/AlertCreatePlan";
import {
  reqCreatePlan,
  reqGetAllPlansByUserId,
} from "../../service/planService";
import ItemPlan from "../../components/Plans/ItemPlan";

import { ErrorDialogI } from "../../models";
import ErrorDialog from "../../components/Modal/MessageDialog";
import { TextIsEmpty } from "../../components/TextIsEmpty";
import HeaderPage from "../../components/HeaderPage";

export const Plans = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false); // Tipo explícito boolean
  //const [formData, setFormData] = useState<CreatePlan | null>(null); // Se usa null como valor inicial
  const user = useSelector((state: RootState) => state.auth.user);

  const [plans, setPlans] = useState<Array<Plan>>();
  const [isEmpty, setIsEmpty] = useState(true);
  const [isError, setIsError] = useState<ErrorDialogI>({
    active: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    const getAllPlans = async () => {
      if (user) {
        const response = await reqGetAllPlansByUserId(user?.id);
        const result: Array<Plan> = await response.json();
        if (result.length > 0) {
          setPlans(result);
          setIsEmpty(false);
        }
      }
    };
    getAllPlans();
  }, [showAlert]);

  const showAlertCreatePlan = () => {
    setShowAlert(true);
  };

  const createPlan = async (data: CreatePlan) => {
    if (data.name === "") {
      setIsError({
        active: true,
        title: "El nombre no puede ser vacio",
        message: "",
      });
      setShowAlert(false);
      return;
    }

    await reqCreatePlan(data.userId, data.name, data.description);

    setShowAlert(false);
  };

  const cancelCreatePlan = () => {
    setShowAlert(false);
  };

  const removePlanFromList = (id: number) => {
    if (plans?.length === 1) setIsEmpty(true);
    setPlans(plans?.filter((plan) => plan.id !== id));
  };

  return (
    <>
      <div className=" bg-dark-1 w-full h-full flex flex-col items-center">
        <HeaderPage title="Planes" path="/user/home"/>
        <div className="fixed bottom-10">
          <ButtonAddPink onConfirm={showAlertCreatePlan} label="Crear" />
        </div>
        <main className=" flex flex-col gap-4 p-6">
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
          <ErrorDialog
            title={isError.title}
            message={isError.message || ""}
            onConfirm={() => setIsError({ ...isError, active: false })}
            active={isError.active}
          />
        )}
      </div>
    </>
  );
};
