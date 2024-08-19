import React from "react";
import Typography from "../Typography/Typography";
import "./AlertDialog.css";
//import { ButtonCancel } from "../Buttons/Buttons";

import { ButtonCancel } from "../Buttons/Buttons";

interface SelectUnitDialogProps {
  title: string;
  message: string;
  onConfirm: (unit: string) => void;
  onCancel: () => void
  active: boolean;
}

const SelectUnitDialog: React.FC<SelectUnitDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  active,
}) => {

  const units = [
    "KG",
    "LB",
  ];


  const handleConfirm = (index: number) => {
    setTimeout(() => onConfirm(units[index]), 100); // Ajusta el tiempo según la duración de tu animación de salida
  };

  const handleCancel = () => {
    onCancel();
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        active ? "alert-dialog-active" : "alert-dialog-inactive"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-lg w-96 flex flex-col gap-3">
        <Typography variant="h5-black">{title}</Typography>
        <Typography variant="span-light-black">{message}</Typography>
        <main>
          {units.map((f, index) => (
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

export default SelectUnitDialog;
