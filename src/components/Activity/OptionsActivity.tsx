import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Typography from "../Typography/Typography";
import {  useState } from "react";
import AlertDialog from "../Modal/AlertDialog";
import { Activity } from "../../models";
import { reqDeleteActivity } from "../../service/activityService";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import optionsBlack from "../../assets/icons/options-black.png";
import optionsWhite from "../../assets/icons/options-white.png";

interface OptionsActivityProps {
  onDelete: (id: number) => void;
  addNote: () => void;
  activity: Activity
}
const OptionsActivity = ({onDelete, addNote, activity}: OptionsActivityProps) => {
  

  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const handleDelete = () => {
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    setShowAlert(false);
    await reqDeleteActivity(activity.id);
    onDelete(activity.id);
  }

  const handleCancelDelete = () => {
    setShowAlert(false);

  }

  return (
    <>
      <Popover>
  <PopoverTrigger asChild>
    <button className="flex justify-end">
      <img
        className="h-8"
        src={
          preferenceUser?.theme === "dark"
            ? optionsWhite
            : optionsBlack
        }
        alt="Options"
      />
    </button>
  </PopoverTrigger>
  <PopoverContent
    className={`w-40 p-2 ${
      preferenceUser?.theme === "dark" ? "bg-dark-2" : "bg-light-2"
    } shadow-lg `}
  >
    <div className="flex flex-col gap-1">
      <button
        className={`p-2 rounded-md transition duration-200 ease-in-out ${
          preferenceUser?.theme === "dark"
            ? "hover:bg-light-2/30 active:bg-dark-2/10"
            : "hover:bg-light-1 active:bg-light-1/10"
        }`}
        onClick={addNote}
      >
        <Typography
          variant={`span-${
            preferenceUser?.theme === "dark" ? "white" : "black"
          }`}
        >
          {activity.note === "" ? "Añadir nota" : "Eliminar nota"}
        </Typography>
      </button>
      <button
        onClick={handleDelete}
        className={`p-2 rounded-md transition duration-200 ease-in-out ${
          preferenceUser?.theme === "dark"
            ? "hover:bg-light-2/30 active:bg-dark-2/10"
            : "hover:bg-light-1 active:bg-light-1/10"
        }`}
      >
        <Typography
          variant={`span-${
            preferenceUser?.theme === "dark" ? "white" : "black"
          }`}
        >
          Eliminar
        </Typography>
      </button>
    </div>
  </PopoverContent>
</Popover>

      {showAlert && (
        <AlertDialog
          title="Estas seguro que quieres borrar esta actividad?"
          message=""
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          active={showAlert}
        />
      )}
    </>
  );
};

export default OptionsActivity;
