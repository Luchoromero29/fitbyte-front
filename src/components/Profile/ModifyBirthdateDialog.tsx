import React, {  useState } from "react";
import Typography from "../Typography/Typography";
//import { ButtonCancel } from "../Buttons/Buttons";
import { ButtonCancel, ButtonConfirmModal } from "../Buttons/Buttons";

interface ModifyBirthdateDialogProps {
  title: string;
  message: string;
  onConfirm: (date: string) => void;
  onCancel: () => void;
  active: boolean;
}

const ModifyBirthdateDialog: React.FC<ModifyBirthdateDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  active,
}) => {

    const [date, setDate] = useState<string>();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        
      setDate(e.target.value)
    }

  const handleConfirm = () => {
    if(date) {
        setTimeout(() => onConfirm(date), 100); // Ajusta el tiempo según la duración de tu animación de salida
    }
  };

  const handleCancel = () => {

    setTimeout(() => onCancel(), 100)
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
          <input type="date" className="w-full rounded-lg bg-white text-black focus:outline-none" onChange={handleChange}/>
        </main>
        <div className="flex justify-end items-center">
          <ButtonCancel
            label="Cancelar"
            onConfirm={handleCancel}
          />
          <ButtonConfirmModal label="Confirmar" onConfirm={handleConfirm}/>
        </div>
      </div>
    </div>
  );
};

export default ModifyBirthdateDialog;
