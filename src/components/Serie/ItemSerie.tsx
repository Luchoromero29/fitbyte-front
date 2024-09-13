import { useSelector } from "react-redux";
import { useState } from "react";
import "./ItemSerie.css";

import { RootState } from "../../store";
import SelectUnitDialog from "../Modal/SelectUnitDialog";
import Typography from "../Typography/Typography";

import { reqUpdateSerie } from "../../service/seriesService";

import { ErrorDialogI, Serie } from "../../models";


import deleteBlack from "../../assets/icons/delete-black.png";
import deleteWhite from "../../assets/icons/delete-white.png";
import MessageDialog from "../Modal/MessageDialog";

interface ItemSerieProps {
  index: number;
  serie: Serie;
  onDelete: (id: number) => void;
  onChange: (index: number, weight?: number, repetition?: number) => void;
}

const ItemSerie = ({ index, serie, onDelete, onChange }: ItemSerieProps) => {
  
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);
  const [openEditUnit, setOpenEditUnit] = useState<boolean>(false);
  const [message, setMessage] = useState<ErrorDialogI>();

  const handleDelete = () => {
    onDelete(serie.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index - 1);

    if (e.target.id === "input-rep") {
      const repetition = Number(e.target.value);
      if(repetition >= 0 && repetition <= 999) {
        onChange(index - 1, undefined, repetition);
      } else {
        const newValue = Math.round(repetition/10)
        e.target.value = newValue < 0 ? "0" : String(newValue);
        
        setMessage({
          active: true,
          title: "Repeticion fuera de rango",
          message: "",
        });
      }
    } else {
      const weight = Number(e.target.value);
      if (weight >= 0 && weight <= 999) {
        onChange(index - 1, weight, undefined);
      } else {
        const newValue = Math.round(weight/10)
        e.target.value = newValue < 0 ? "0" : String(newValue);
        setMessage({
          active: true,
          title: "Peso fuera de rango",
          message: "",
        });
      }
    }
  };

  const handleChangeUnit = () => {
    setOpenEditUnit(true);
  }

  const handleConfirmEditUnit = async (unit: string ) => {
      serie.unit = unit;
      await reqUpdateSerie(serie);
      setOpenEditUnit(false);

  } 

   const handleCancelEditUnit = () => {
    setOpenEditUnit(false);
   }
  return (
    <>
      <div className="flex justify-between items-center p-1 gap-2">
        <div>
          <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>{index}</Typography>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <Typography variant={`span-light-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>Rep</Typography>
            <input
              type="number"
              id="input-rep"
              defaultValue={serie.repetition}
              min={0}
              max={999}
              className={`w-12 p-1 rounded-md 
                ${preferenceUser?.theme === "dark" 
                  ? "bg-black text-white outline-white" 
                  : "bg-light-1 text-dark-1 outline-dark-1"} 
                outline outline-1 text-center`}
              onChange={handleChange}
            />
          </div>
          <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>X</Typography>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              id="input-weight"
              defaultValue={serie.weight}
              onChange={handleChange}
              min={0}
              max={999}
              className={`w-12 p-1 rounded-md 
                ${preferenceUser?.theme === "dark" 
                  ? "bg-black text-white outline-white" 
                  : "bg-light-1 text-dark-1 outline-dark-1"} 
                outline outline-1 text-center`}
            />
            <div onClick={handleChangeUnit}>
              <Typography variant={`span-light-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>{serie.unit}</Typography>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-5 h-5 form-checkbox text-black focus:ring-black "
          />
        </div>
        <div onClick={handleDelete}>
          <img className="h-5 w-5" src={preferenceUser?.theme === "dark" ? deleteWhite : deleteBlack} />
        </div>
      </div>
      {openEditUnit && (
        <SelectUnitDialog title="Seleciona la unidad para esta serie" 
        message=""
        onConfirm={handleConfirmEditUnit}
        onCancel={handleCancelEditUnit}
        active={openEditUnit}
        />
      )}
      {message?.active && (
        <MessageDialog
          title={message.title}
          message={message.message || ""}
          onConfirm={() => setMessage({...message, active: false })}
          active={message.active}
        />
      )}
    </>
  );
};

export default ItemSerie;
