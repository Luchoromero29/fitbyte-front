import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import optionsBlack from "../../assets/icons/options-black.png";
import Typography from "../Typography/Typography";
import { act, useState } from "react";
import AlertDialog from "../Modal/AlertDialog";
import { Activity } from "../../models";
import { reqDeleteActivity } from "../../service/activityService";

interface OptionsActivityProps {
  onDelete: (id: number) => void;
  addNote: () => void;
  activity: Activity
}
const OptionsActivity = ({onDelete, addNote, activity}: OptionsActivityProps) => {
  
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
          <img className="h-8" src={optionsBlack} />
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2 bg-dark-2 ">
          <div className="flex flex-col gap-1 ">
            <div 
            className="p-2  hover:bg-light-1/10 active:bg-light-1/10 rounded-md transition duration-200 ease-in-out"
            onClick={addNote}
            >
              <Typography variant="span-white ">{activity.note === "" ? "Anadir nota" : "Eliminar nota"}</Typography>
            </div>
            <div
              onClick={handleDelete}
              className="p-2  hover:bg-light-1/10 active:bg-light-1/10 rounded-md transition duration-200 ease-in-out"
            >
              <Typography variant="span-white">Eliminar</Typography>
            </div>
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
