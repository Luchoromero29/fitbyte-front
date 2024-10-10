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
import { reqUpdateSerie } from "../../service/seriesService";

interface ItemSerieProps {
  index: number;
  serie: Serie;
  onDelete: (id: number) => void;
 
}

const RowSerie = ({ index, serie, onDelete }: ItemSerieProps) => {
  const preferenceUser = useSelector(
    (state: RootState) => state.preferenceUser
  );

  

  const [message, setMessage] = useState({
    active: false,
    title: "",
    message: "",
  });
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.id === "input-rep") {
      const repetition = Number(e.target.value);
      if (repetition >= 0 && repetition <= 999) {
        serie.repetition = repetition;
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
        serie.weight = weight;
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

  const handleConfirmChange = async () => {
    console.log("Actualizando la serie");
    await reqUpdateSerie(serie);
    console.log("Serie actualizada");
    
  }

  return (
    <tr className={`${checked ? 
        preferenceUser.theme === "dark" ? 
            "bg-green-700"  
            : "bg-green-500/80"  
        : preferenceUser.theme === "dark" ? 
            "odd:bg-black/20 even:bg-black/40" 
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
          onBlur={handleConfirmChange}
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
          onBlur={handleConfirmChange}
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
          theme={preferenceUser.theme}
        />
      )}
    </tr>
  );
};

export default RowSerie;
