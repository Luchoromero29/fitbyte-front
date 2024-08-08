import { useEffect, useState } from "react";
import { ButtonPink } from "../../components/Buttons";
import Typography from "../../components/Typography/Typography";
import AlertCreatePlan from "../../components/Plans/AlertCreatePlan";

import { CreatePlan, Plan } from "../../models";
import { reqCreatePlan, reqGetAllPlans } from "../../service/planService";
import ItemPlan from "../../components/Plans/ItemPlan";



export const Plans = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false); // Tipo explícito boolean
  //const [formData, setFormData] = useState<CreatePlan | null>(null); // Se usa null como valor inicial

  const [plans, setPlans] = useState<Array<Plan>>();

  useEffect(() => {
    const getAllPlans = async () => {
      const response = await reqGetAllPlans();
      const result: Array<Plan> = await response.json();
      setPlans(result);
    };
    getAllPlans();
  }, [showAlert]);

  const showAlertCreatePlan = () => {
    setShowAlert(true);
  };

  const createPlan = async (data: CreatePlan) => {
    const response = await reqCreatePlan(
      data.userId,
      data.name,
      data.description
    );
    const result = response.json();
    console.log(result);

    setShowAlert(false);
  };

  const cancelCreatePlan = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="pt-3 bg-dark-1 w-full h-full">
        <header className="flex gap-3 justify-center items-center">
          <Typography variant="h3-white">Planes</Typography>
          <div className="h-min">
            <ButtonPink onConfirm={showAlertCreatePlan} label="Crear" />
          </div>
        </header>
        <main className=" flex flex-col gap-4 p-6">
          {plans && plans.map((plan: Plan) => (
            <ItemPlan plan={plan}/>
          ))}
        </main>
        {showAlert && (
          <AlertCreatePlan
            onConfirm={createPlan}
            onCancel={cancelCreatePlan}
            active={showAlert}
          />
        )}
      </div>
    </>
  );
};
