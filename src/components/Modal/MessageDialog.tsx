import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";
import "./AlertDialog.css";
import { ButtonCancel } from "../Buttons/Buttons";

interface MessageDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  active: boolean;
}

const MessageDialog: React.FC<MessageDialogProps> = ({
  title,
  message,
  onConfirm,
  active,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);


  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 100); // Ajusta el tiempo según la duración de tu animación de salida
  };

  
  return (
    <div
      className={`modal-class ${
        isVisible ? "alert-dialog-active" : "alert-dialog-inactive"
      }`}
    >
      <div className={`dark:bg-dark-2 bg-light-1 p-6 rounded shadow-lg w-96 flex flex-col gap-6`}>
        <Typography variant={`h5`}>{title}</Typography>
        <Typography variant={`span-medium`}>{message}</Typography>
        <div className="flex justify-end">
        <ButtonCancel label="Aceptar" onConfirm={handleConfirm}/>
        </div>
      </div>
    </div>
  );
};

export default MessageDialog;
