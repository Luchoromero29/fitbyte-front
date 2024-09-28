import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";
import { ButtonCancel, ButtonConfirm } from "../Buttons/Buttons";
import { CreateRoutine } from "../../models";
//import { useSelector } from "react-redux";
//import { RootState } from "../../store";
import { Day } from "../../models/types";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AlertCreateRoutineProps {
  onConfirm: (data: CreateRoutine) => void;
  onCancel: () => void;
  active: boolean;
}

const AlertCreateRoutine: React.FC<AlertCreateRoutineProps> = ({
  onConfirm,
  onCancel,
  active,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<Day | "">("");
  const [name, setName] = useState<string>("");
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser); 

  const daysOfWeek: Day[] = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const { planId } = useParams<{ planId: string }>();

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
    if (planId && name && selectedDay) {
      const newRoutineData: CreateRoutine = {
        name,
        day: selectedDay,
        planId: planId,
      };

      setIsVisible(false);
      setTimeout(() => onConfirm(newRoutineData), 100); 
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isVisible ? "alert-create-plan-active" : "alert-create-plan-inactive"
      }`}
    >
      <div className={`${preferenceUser?.theme === "dark" ? "bg-dark-1" : "bg-light-1"} p-6 rounded shadow-lg w-96 flex flex-col gap-6`}>
        <div>
          <form id="form-create-routine" className="flex flex-col gap-3">
            <label className="flex flex-col gap-2">
              <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>Nombre de la rutina</Typography>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 ${preferenceUser?.theme === "dark" ? "text-white" : "text-black"} font-chopinBold`}
              />
            </label>
            <label className="flex flex-col gap-2">
              <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>Día de la rutina</Typography>
              <select
                id="day-select"
                name="day-select"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value as Day)}
                className={`rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 ${preferenceUser?.theme === "dark" ? "text-white" : "text-black"} font-chopinBold`}
              >
                <option value="" disabled>
                  Selecciona un día
                </option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
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

export default AlertCreateRoutine;
