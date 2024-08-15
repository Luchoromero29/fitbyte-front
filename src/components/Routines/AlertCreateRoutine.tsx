import React, { useEffect, useState } from "react";

import Typography from "../Typography/Typography";
import { ButtonCancel, ButtonPink } from "../Buttons/Buttons";
import { CreateRoutine } from "../../models";
//import { useSelector } from "react-redux";
//import { RootState } from "../../store";
import { Day } from "../../models/types";
import { useParams } from "react-router-dom";

interface AlertCreateRoutineProps {
  //setFormData: React.Dispatch<React.SetStateAction<CreatePlan | null>>; // Ajuste del tipo de setFormData
  onConfirm: (data: CreateRoutine) => void;
  onCancel: () => void;
  active: boolean;
}

const AlertCreateRoutine: React.FC<AlertCreateRoutineProps> = ({
  onConfirm,
  onCancel,
  active,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false); // Tipo explícito boolean
  const [selectedDay, setSelectedDay] = useState<Day | "">("");
  const daysOfWeek: Day[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value as Day);
  };
  //const user = useSelector((state: RootState) => state.auth.user);
  const { planId } = useParams();


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
    const $form = document.querySelector(
      "#form-create-routine"
    ) as HTMLFormElement;
    const formData = new FormData($form);

    if (planId) {
      const newRoutineData: CreateRoutine = {
        name: formData.get("name") as string,
        day: formData.get("day-select") as Day,
        planId: planId,
      };

      setIsVisible(false);
      setTimeout(() => onConfirm(newRoutineData), 100); // Ajusta el tiempo según la duración de tu animación de salida
    }
    // Actualiza el estado y ejecuta la función de confirmación con el nuevo dato
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isVisible ? "alert-create-plan-active" : "alert-create-plan-inactive"
      }`}
    >
      <div className="bg-violet-2 p-6 rounded shadow-lg w-96 flex flex-col gap-6">
        <div>
          <form id="form-create-routine" className="flex flex-col gap-3">
            <label className="flex flex-col gap-2">
              <Typography variant="span-white">Nombre de la rutina</Typography>
              <input
                type="text"
                name="name"
                className="rounded-md outline-none p-2 bg-dark-2 text-light-1"
              />
            </label>
            <label className="flex flex-col gap-2">
              <Typography variant="span-white">Día de la rutina</Typography>
              <select
                id="day-select"
                name="day-select"
                value={selectedDay}
                onChange={handleChange}
                className="rounded-md outline-none p-2 bg-dark-2 text-light-1"
              >
                <option value="" disabled>
                  Selecciona un día
                </option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    <Typography variant="span-light-white">{day}</Typography>
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>

        <div className="flex justify-end gap-3">
          <ButtonCancel label="Cancelar" onConfirm={handleCancel} />
          <ButtonPink label="Confirmar" onConfirm={handleConfirm} />
        </div>
      </div>
    </div>
  );
};

export default AlertCreateRoutine;
