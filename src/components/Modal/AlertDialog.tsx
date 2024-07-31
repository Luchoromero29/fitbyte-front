import React, { useEffect, useState } from "react";
import Typography from "../Typography/Typography";
import "./AlertDialog.css";

interface AlertDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  active: boolean;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  active,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setIsVisible(true);
    }
  }, [active]);

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 300); // Ajusta el tiempo según la duración de tu animación de salida
  };

  const handleConfirm = () => {
    setIsVisible(false);
    setTimeout(onConfirm, 300); // Ajusta el tiempo según la duración de tu animación de salida
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
          <button
            onClick={handleCancel}
            className="bg-light-3 hover:bg-gray-400 py-2 px-4 rounded mr-2"
          >
            <Typography variant="span-black">Cancelar</Typography>
          </button>
          <button
            onClick={handleConfirm}
            className="bg-danger hover:bg-red-700 py-2 px-4 rounded"
          >
            <Typography variant="span-white">Confirmar</Typography>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
