import { useSelector } from "react-redux";
import { useState } from "react";
import "./ItemSerie.css";

import { RootState } from "../../store";
import SelectUnitDialog from "../Modal/SelectUnitDialog";
import Typography from "../Typography/Typography";

import { reqUpdateSerie } from "../../service/seriesService";

import { Serie } from "../../models";


import deleteBlack from "../../assets/icons/delete-black.png";
import deleteWhite from "../../assets/icons/delete-white.png";

interface ItemSerieProps {
  index: number;
  serie: Serie;
  onDelete: (id: number) => void;
  onChange: (index: number, weight?: number, repetition?: number) => void;
}

const ItemSerie = ({ index, serie, onDelete, onChange }: ItemSerieProps) => {
  
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);
  const [openEditUnit, setOpenEditUnit] = useState<boolean>(false);

  const handleDelete = () => {
    onDelete(serie.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index - 1);

    if (e.target.id === "input-rep") {
      const repetition = Number(e.target.value);
      onChange(index - 1, undefined, repetition);
    } else {
      const weight = Number(e.target.value);
      onChange(index - 1, weight, undefined);
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
    </>
  );
};

export default ItemSerie;
