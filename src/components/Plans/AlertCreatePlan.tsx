import React, { useEffect, useState, useRef } from "react";
import Typography from "../Typography/Typography";
import "./AlertCreatePlan.css";
import { ButtonCancel, ButtonConfirm } from "../Buttons/Buttons";
import { CreatePlan } from "../../models";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


interface AlertCreatePlanProps {
  //setFormData: React.Dispatch<React.SetStateAction<CreatePlan | null>>; // Ajuste del tipo de setFormData
  onConfirm: (data: CreatePlan) => void;
  onCancel: () => void;
  active: boolean;
}

const AlertCreatePlan: React.FC<AlertCreatePlanProps> = ({
  onConfirm,
  onCancel,
  active,
}) => {

  const [isVisible, setIsVisible] = useState<boolean>(false); // Tipo explícito boolean
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300);
  };

  const handleConfirm = () => {
    const $form = document.querySelector("#form-create-plan") as HTMLFormElement;
    const formData = new FormData($form);
  
    if(user) {
      
      const newPlanData: CreatePlan = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        userId: user?.id
      };

      setIsVisible(false);
      setTimeout(() => onConfirm(newPlanData), 100); // Ajusta el tiempo según la duración de tu animación de salida
    }
    // Actualiza el estado y ejecuta la función de confirmación con el nuevo dato
  
  };
  

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      autoResize(textarea);
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isVisible ? "alert-create-plan-active" : "alert-create-plan-inactive"
      }`}
    >
      <div className={`${preferenceUser?.theme === "dark" ? "bg-dark-1" : "bg-light-1"} p-6 rounded shadow-lg w-96 flex flex-col gap-6`}>
        <div>
          <form id="form-create-plan" className="flex flex-col gap-3">
            <label className="flex flex-col gap-2">
              <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>Nombre del plan</Typography>
              <input
                type="text"
                name="name"
                
                className={`rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 ${preferenceUser?.theme === "dark" ? "text-white" : "text-black"} font-chopinBold`}
              />
            </label>
            <label className="flex flex-col gap-2">
              <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>Descripcion del plan</Typography>
              <textarea
                id="textarea-form-create-plan"
                name="description"
                ref={textareaRef}
                className={`autoresize rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 ${preferenceUser?.theme === "dark" ? "text-white" : "text-black"} font-chopinBold`}
                onInput={(e) => autoResize(e.currentTarget)}
              />
            </label>
          </form>
        </div>

        <div className="flex justify-end gap-3">
          <ButtonCancel label="Cancelar" onConfirm={handleCancel} color={preferenceUser?.theme === "dark" ? "white" : "black"}/>
          <ButtonConfirm label="Confirmar" onConfirm={handleConfirm} color="white"/>
        </div>
      </div>
    </div>
  );
};

export default AlertCreatePlan;
