import React, { useState } from "react";


import Typography from "../Typography/Typography";
import { ButtonCancel, ButtonPink } from "../Buttons/Buttons";
import { Day } from "../../models/types";
import { Routine } from "../../models";


interface AlertEditRoutineProps {
  //setFormData: React.Dispatch<React.SetStateAction<CreatePlan | null>>; // Ajuste del tipo de setFormData
  onConfirm: (name: string, day: Day) => void;
  onCancel: () => void;
  active: boolean;
  routine: Routine
}

const AlertEditRoutine: React.FC<AlertEditRoutineProps> = ({
  onConfirm,
  onCancel,
  active,
  routine
}) => {
  const [selectedDay, setSelectedDay] = useState<Day | "">(routine.day);
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
  //const user = useSelector((state: RootState) => state.auth.user)

  const handleCancel = () => {
    setTimeout(onCancel, 300);
  };

  const handleConfirm = () => {
    const $form = document.querySelector(
      "#form-edit-routine"
    ) as HTMLFormElement;
    const formData = new FormData($form);
    const name = formData.get("name") as string;
    const day = formData.get("day-select") as Day;
    
      setTimeout(() => onConfirm(name, day), 100); // Ajusta el tiempo según la duración de tu animación de salida
    }
    // Actualiza el estado y ejecuta la función de confirmación con el nuevo dato
  

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        active ? "alert-create-plan-active" : "alert-create-plan-inactive"
      }`}
    >
      <div className="bg-violet-2 p-6 rounded shadow-lg w-96 flex flex-col gap-6">
        <div>
          <form id="form-edit-routine" className="flex flex-col gap-3">
            <label className="flex flex-col gap-2">
              <Typography variant="span-white">Nombre de la rutina</Typography>
              <input
                type="text"
                name="name"
                defaultValue={routine.name}
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
                  <option key={day} value={day} >
                    {day}
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

export default AlertEditRoutine;
