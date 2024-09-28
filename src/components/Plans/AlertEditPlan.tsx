import React, { useEffect, useRef, useState } from "react";
import Typography from "../Typography/Typography";
import "./AlertCreatePlan.css";
import { ButtonCancel, ButtonConfirm } from "../Buttons/Buttons";
import { Plan } from "../../models";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AlertEditPlanProps {
  onConfirm: (name: string, description: string) => void;
  onCancel: () => void;
  active: boolean;
  plan: Plan;
}

const AlertEditPlan: React.FC<AlertEditPlanProps> = ({
  onConfirm,
  onCancel,
  active,
  plan,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false); // Control de visibilidad del modal
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300); // Delay para que coincida con la animación de salida
  };

  const handleConfirm = () => {
    const $form = document.querySelector("#form-edit-plan") as HTMLFormElement;
    const formData = new FormData($form);

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    setIsVisible(false);
    setTimeout(() => onConfirm(name, description), 100); // Ajuste de tiempo para la animación
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
          <form id="form-edit-plan" className="flex flex-col gap-3">
            <label className="flex flex-col gap-2">
              <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>
                Nombre del plan
              </Typography>
              <input
                type="text"
                name="name"
                defaultValue={plan?.name}
                className={`rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 ${
                  preferenceUser?.theme === "dark" ? "text-white" : "text-black"
                } font-chopinBold`}
              />
            </label>
            <label className="flex flex-col gap-2">
              <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>
                Descripción del plan
              </Typography>
              <textarea
                id="textarea-form-edit-plan"
                name="description"
                ref={textareaRef}
                defaultValue={plan?.description}
                className={`autoresize rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 ${
                  preferenceUser?.theme === "dark" ? "text-white" : "text-black"
                } font-chopinBold`}
                onInput={(e) => autoResize(e.currentTarget)}
              />
            </label>
          </form>
        </div>

        <div className="flex justify-end gap-3">
          <ButtonCancel label="Cancelar" onConfirm={handleCancel} color={preferenceUser?.theme === "dark" ? "white" : "black"}/>
          <ButtonConfirm label="Confirmar" onConfirm={handleConfirm} color="white" />
        </div>
      </div>
    </div>
  );
};

export default AlertEditPlan;
