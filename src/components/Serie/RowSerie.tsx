import { useState } from "react";
import deleteBlack from "../../assets/icons/delete-black.png";
import deleteWhite from "../../assets/icons/delete-white.png";
import { Serie } from "../../models";
import MessageDialog from "../Modal/MessageDialog";
import Typography from "../Typography/Typography";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import "./ItemSerie.css";
import CheckBox from "../CheckBox";

interface ItemSerieProps {
  index: number;
  serie: Serie;
  onDelete: (id: number) => void;
  onChange: (index: number, weight?: number, repetition?: number) => void;
}

const RowSerie = ({ index, serie, onDelete, onChange }: ItemSerieProps) => {
  const preferenceUser = useSelector(
    (state: RootState) => state.preferenceUser
  );
  console.log(preferenceUser);
  

  const [message, setMessage] = useState({
    active: false,
    title: "",
    message: "",
  });
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index - 1);

    if (e.target.id === "input-rep") {
      const repetition = Number(e.target.value);
      if (repetition >= 0 && repetition <= 999) {
        onChange(index - 1, undefined, repetition);
      } else {
        const newValue = Math.round(repetition / 10);
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
        const newValue = Math.round(weight / 10);
        e.target.value = newValue < 0 ? "0" : String(newValue);
        setMessage({
          active: true,
          title: "Peso fuera de rango",
          message: "",
        });
      }
    }
  };

  const handleDelete = () => {
    onDelete(serie.id);
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <tr className={`${checked ? 
        preferenceUser.theme === "dark" ? 
            "bg-green-700"  
            : "bg-green-500/80"  
        : preferenceUser.theme === "dark" ? 
            "odd:bg-dark-1 even:bg-black" 
            : "odd:bg-gray-100 even:bg-white"}
        preferenceUser.theme === "dark" ? 
    "odd:bg-dark-1 even:bg-black" 
    : "odd:bg-gray-100 even:bg-white"
     text-center rounded-lg items-center`}>
      <td>
        <Typography
          variant={`span-${
            preferenceUser.theme === "dark" ? "white" : "black"
          }`}
        >
          {index}
        </Typography>
      </td>
      <td>
        <input
          type="number"
          id="input-rep"
          defaultValue={serie.repetition}
          min={0}
          max={999}
          className={`w-12 p-1 rounded-md 
                ${
                  preferenceUser?.theme === "dark"
                    ? "bg-black/0 text-white"
                    : "bg-white/0 text-black"
                } 
                font-chopinLight
                outline-none
                 text-center`}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="number"
          id="input-weight"
          defaultValue={serie.weight}
          min={0}
          max={999}
          className={`w-12 p-1 rounded-md 
                ${
                  preferenceUser?.theme === "dark"
                    ? "bg-black/0 text-white "
                    : "bg-white/0 text-black"
                } 
                font-chopinLight
                outline-none
                 text-center`}
          onChange={handleChange}
        />
      </td>
      <td className="items-center">
        <CheckBox onChange={handleCheck} theme={preferenceUser.theme}/> 
      </td>
      <td>
        <div onClick={handleDelete}>
          <img
            className="h-5 w-5"
            src={preferenceUser?.theme === "dark" ? deleteWhite : deleteBlack}
          />
        </div>
      </td>
      {message?.active && (
        <MessageDialog
          title={message.title}
          message={message.message || ""}
          onConfirm={() => setMessage({ ...message, active: false })}
          active={message.active}
        />
      )}
    </tr>
  );
};

export default RowSerie;
