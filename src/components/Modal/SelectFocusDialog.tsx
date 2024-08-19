import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";
import "./AlertDialog.css";
//import { ButtonCancel } from "../Buttons/Buttons";
import { Focus } from "../../models/types";
import { ButtonCancel } from "../Buttons/Buttons";

interface SelectFocusDialogProps {
  title: string;
  message: string;
  onConfirm: (focus: Focus) => void;
  active: boolean;
}

const SelectFocusDialog: React.FC<SelectFocusDialogProps> = ({
  title,
  message,
  onConfirm,
  active,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const focus: Array<Focus> = [
    "Calentamiento",
    "Fallo",
    "Fuerza",
    "Hipertrofia",
  ];

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  const handleConfirm = (index: number) => {
    setIsVisible(false);

    setTimeout(() => onConfirm(focus[index]), 100); // Ajusta el tiempo según la duración de tu animación de salida
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => onConfirm("Indefinido"), 100)
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isVisible ? "alert-dialog-active" : "alert-dialog-inactive"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-lg w-96 flex flex-col gap-3">
        <Typography variant="h5-black">{title}</Typography>
        <Typography variant="span-light-black">{message}</Typography>
        <main>
          {focus.map((f, index) => (
            <div key={index} className="p-2" onClick={() => handleConfirm(index)}>
              {f}
            </div>
          ))}
        </main>
        <div className="flex justify-end">
          <ButtonCancel
            label="Cancelar"
            onConfirm={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectFocusDialog;
