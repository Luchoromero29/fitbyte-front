import arrowRight from "../../assets/icons/arrow-rigth-white.png";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

//ASSETS
import { Routine } from "../../models";
import Typography from "../Typography/Typography";
import calendar from "../../assets/icons/calendar-white.png";
import timer from "../../assets/icons/timer-white.png";
import optionsWhite from "../../assets/icons/options-white.png";
import { useState } from "react";
import AlertDialog from "../Modal/AlertDialog";
import { reqDeleteRoutine } from "../../service/routineService";

interface RoutineProps {
  routine: Routine;
  onRoutineDelete: (id: number) => void;
}

const ItemRoutine = ({ routine, onRoutineDelete }: RoutineProps) => {
  const plan = useSelector((state: RootState) => state.plan);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleDelete = () => {
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    console.log("hola");
    await reqDeleteRoutine(routine.id);
    onRoutineDelete(routine.id);
    setShowDialog(false);
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Link to={`/user/home/plans/routine/${routine.id}`} className="w-full">
        <div className="grid grid-cols-5 justify-between  bg-black p-3 rounded-md shadow-md  w-full">
          <div className="col-span-4 grid row-span-2 gap-3">
            <Typography variant="h6-white">{routine.name}</Typography>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex gap-1 col-span-1 items-center">
                <img src={calendar} className="h-6" />
                <Typography variant="span-light-white">
                  {routine.day}
                </Typography>
              </div>
              <div className="flex gap-1 col-span-1 items-center">
                <img src={timer} className="h-6" />
                <Typography variant="span-light-white">{"15:00"}</Typography>
              </div>
            </div>
          </div>
          <div className=" flex items-center  col-span-1 row-span-2 justify-end">
            <div>
              <img className="h-8" src={arrowRight} />
            </div>
            <Link to={`/user/home/plans/${plan.id}`}>
              <Popover>
                <PopoverTrigger asChild>
                  <img className="h-8" src={optionsWhite} />
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2 bg-dark-2 ">
                  <div className="flex flex-col gap-1 ">
                    <div className="p-2  hover:bg-light-1/10 active:bg-light-1/10 rounded-md transition duration-200 ease-in-out">
                      <Typography variant="span-white ">Editar</Typography>
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
            </Link>
          </div>
        </div>
      </Link>
      {showDialog && (
        <AlertDialog
          title={`Estas seguro que deseas eliminar el plan ${plan.name}`}
          message="Si lo eliminas no podras recuperarlo"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          active={showDialog}
        />
      )}
    </>
  );
};

export default ItemRoutine;
