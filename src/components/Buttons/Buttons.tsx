import React from "react";

import Typography from "../Typography/Typography";

import './Buttons.css'
import IconAddBlack from "../../assets/icons/add-white.png"

interface ButtonsProps {
  label: string;
  onConfirm: () => void;
  active?: boolean,
  color?: string
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


export const ButtonAddPink: React.FC<ButtonsProps> = ({
  onConfirm,
}) => {



  const handleConfirm = () => {
    onConfirm(); // Ajusta el tiempo según la duración de tu animación de salida
  };

  return (
    <div className="bg-pink-2 p-2 rounded-full shadow-2xl flex justify-center items-center ">
        <button className="" onClick={handleConfirm}>
            <img className="h-10" src={IconAddBlack}/>
        </button>
    </div>
  );
};

export const ButtonAddViolet: React.FC<ButtonsProps> = ({
  onConfirm,
}) => {



  const handleConfirm = () => {
    onConfirm(); // Ajusta el tiempo según la duración de tu animación de salida
  };

  return (
    <div className="bg-violet-2 p-2 rounded-full shadow-2xl flex justify-center items-center ">
        <button className="" onClick={handleConfirm}>
            <img className="h-10" src={IconAddBlack}/>
        </button>
    </div>
  );
};

export const ButtonAddActivity: React.FC<ButtonsProps> = ({
  label,
  onConfirm,
}) => {



  const handleConfirm = () => {
    onConfirm(); // Ajusta el tiempo según la duración de tu animación de salida
  };

  return (
    <div className=" p-2 rounded-full shadow-xl flex justify-center items-center outline outline-1 outline-violet-2 w-fit pr-4">
        <button className="flex items-center gap-2" onClick={handleConfirm}>
            <img className="h-8" src={IconAddBlack}/>
            <Typography variant="span-white">{label}</Typography>
        </button>
    </div>
  );
};

export const ButtonConfirmViolet: React.FC<ButtonsProps> = ({
  label,
  onConfirm,
  active,
  color
}) => {

  const handleConfirm = () => {
    onConfirm(); // Ajusta el tiempo según la duración de tu animación de salida
  };

  return (
    <div className={` px-4 py-2 rounded-full shadow-xl flex justify-center items-center outline outline-1 outline-violet-2 w-fit  ${active ? "" : "button-inactive"}`}>
        <button disabled={!active} className="flex items-center gap-2 " onClick={handleConfirm}>
            <Typography variant={`span-${color}`}>{label}</Typography>
        </button>
    </div>
  );
};


export const ButtonAddSerieBlack: React.FC<ButtonsProps> = ({
  label,
  onConfirm,
}) => {



  const handleConfirm = () => {
    onConfirm(); // Ajusta el tiempo según la duración de tu animación de salida
  };

  return (
    <div className=" p-2 flex justify-center items-center  w-fit">
        <button className="flex items-center gap-2" onClick={handleConfirm}>
            <Typography variant="span-black">{label}</Typography>
        </button>
    </div>
  );
};
