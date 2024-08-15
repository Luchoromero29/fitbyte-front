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
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isVisible ? "alert-dialog-active" : "alert-dialog-inactive"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-lg w-96 flex flex-col gap-6">
        <Typography variant="h5-black">{title}</Typography>
        <Typography variant="span-light-black">{message}</Typography>
        <div className="flex justify-end">
        <ButtonCancel label="Aceptar" onConfirm={handleConfirm}/>
        </div>
      </div>
    </div>
  );
};

export default MessageDialog;
