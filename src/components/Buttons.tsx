import React from "react";
import Typography from "./Typography/Typography";

interface ButtonsProps {
  label: string;
  onConfirm: () => void;
}

export const ButtonViolet: React.FC<ButtonsProps> = ({
  label,
  onConfirm,
}) => {



  const handleConfirm = () => {
    onConfirm(); // Ajusta el tiempo según la duración de tu animación de salida
  };

  return (
    <div className="bg-violet-1 p-2 rounded-md shadow-md">
        <button onClick={handleConfirm}>
            <Typography variant="span-white">{label}</Typography>
        </button>
    </div>
  );
};

export const ButtonPink: React.FC<ButtonsProps> = ({
  label,
  onConfirm,
}) => {



  const handleConfirm = () => {
    onConfirm(); // Ajusta el tiempo según la duración de tu animación de salida
  };

  return (
    <div className="bg-pink-1 p-2 rounded-md shadow-md">
        <button onClick={handleConfirm}>
            <Typography variant="span-white">{label}</Typography>
        </button>
    </div>
  );
};

export const ButtonCancel: React.FC<ButtonsProps> = ({
  label,
  onConfirm,
}) => {



  const handleConfirm = () => {
    onConfirm(); // Ajusta el tiempo según la duración de tu animación de salida
  };

  return (
    <div className="bg-light-2 p-2 rounded-md shadow-md">
        <button onClick={handleConfirm}>
            <Typography variant="span-black">{label}</Typography>
        </button>
    </div>
  );
};



