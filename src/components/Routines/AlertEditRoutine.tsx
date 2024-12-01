import React, { useState } from "react";
import Typography from "../Typography/Typography";
import { ButtonCancel, ButtonConfirm } from "../Buttons/Buttons";
import { Day } from "../../models/types";
import { Routine } from "../../models";

import "./AlertRoutine.css"


interface AlertEditRoutineProps {
  onConfirm: (name: string, day: Day) => void;
  onCancel: () => void;
  active: boolean;
  routine: Routine;
}

const AlertEditRoutine: React.FC<AlertEditRoutineProps> = ({
  onConfirm,
  onCancel,
  active,
  routine,
}) => {
  const [selectedDay, setSelectedDay] = useState<Day | "">(routine.day);
  const [name, setName] = useState<string>(routine.name);


  const daysOfWeek: Day[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const handleChangeDay = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDay(event.target.value as Day);
  };

  const handleCancel = () => {
    setTimeout(onCancel, 300);
  };

  const handleConfirm = () => {
    if (name && selectedDay) {
      setTimeout(() => onConfirm(name, selectedDay), 100); // Ajusta el tiempo según la animación
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        active ? "alert-create-plan-active" : "alert-create-plan-inactive"
      }`}
    >
      <div
        className={`dark:bg-dark-1 bg-light-1
         p-6 rounded shadow-lg w-96 flex flex-col gap-6`}
      >
        <div>
          <form id="form-edit-routine" className="flex flex-col gap-3">
            <label className="flex flex-col gap-2">
              <Typography
                variant={`span`}
              >
                Nombre de la rutina
              </Typography>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 dark:text-white text-black
                 font-chopinBold`}
              />
            </label>
            <label className="flex flex-col gap-2">
              <Typography
                variant={`span`}
              >
                Día de la rutina
              </Typography>
              <select
                id="day-select"
                name="day-select"
                value={selectedDay}
                onChange={handleChangeDay}
                className={`rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 dark:text-white text-black
                 font-chopinBold`}
              >
                <option value="" disabled>
                  Selecciona un día
                </option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    <Typography variant={`span`}>{day}</Typography>
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>

        <div className="flex justify-end gap-3">
          <ButtonCancel label="Cancelar" onConfirm={handleCancel} />
          <ButtonConfirm label="Confirmar" onConfirm={handleConfirm} />
        </div>
      </div>
    </div>
  );
};

export default AlertEditRoutine;
