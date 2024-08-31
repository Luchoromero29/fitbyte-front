import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import { Routine } from "../../models";
import { Day } from "../../models/types";

//ASSETS

import AlertDialog from "../Modal/AlertDialog";
import AlertEditRoutine from "./AlertEditRoutine";
import {
  reqDeleteRoutine,
  reqUpdateRoutine,
} from "../../service/routineService";

import Typography from "../Typography/Typography";

import optionsWhite from "../../assets/icons/options-white.png";
import optionsBlack from "../../assets/icons/options-black.png";
import arrowRightWhite from "../../assets/icons/arrow-rigth-white.png";
import arrowRightBlack from "../../assets/icons/arrow-rigth-black.png";
import calendarWhite from "../../assets/icons/calendar-white.png";
import calendarBlack from "../../assets/icons/calendar-black.png";
import timerWhite from "../../assets/icons/timer-white.png";
import timerBlack from "../../assets/icons/timer-black.png";

interface RoutineProps {
  routine: Routine;
  onRoutineDelete: (id: number) => void;
}

const ItemRoutine = ({ routine, onRoutineDelete }: RoutineProps) => {
  const preferenceUser = useSelector(
    (state: RootState) => state.preferenceUser
  );
  const plan = useSelector((state: RootState) => state.plan);

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleDelete = () => {
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    await reqDeleteRoutine(routine.id);
    onRoutineDelete(routine.id);
    setShowDialog(false);
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleConfirmEdit = async (name: string, day: Day) => {
    routine.name = name;
    routine.day = day;
    await reqUpdateRoutine(routine);

    setOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <div
        className={`grid grid-cols-5 justify-between  ${
          preferenceUser?.theme === "dark" ? "bg-black" : "bg-white"
        } p-3 rounded-md shadow-md  w-full`}
      >
        <Link
          to={`/user/home/plans/routine/${routine.id}`}
          className="w-full col-span-4 grid row-span-2 gap-3"
        >
          <Typography
            variant={`h6-${
              preferenceUser?.theme === "dark" ? "white" : "black"
            }`}
          >
            {routine.name}
          </Typography>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex gap-1 col-span-1 items-center">
              <img src={preferenceUser?.theme === "dark" ? calendarWhite : calendarBlack} className="h-6" />
              <Typography
                variant={`span-light-${
                  preferenceUser?.theme === "dark" ? "white" : "black"
                }`}
              >
                {routine.day}
              </Typography>
            </div>
            <div className="flex gap-1 col-span-1 items-center">
              <img src={preferenceUser?.theme === "dark" ? timerWhite : timerBlack} className="h-6" />
              <Typography
                variant={`span-light-${
                  preferenceUser?.theme === "dark" ? "white" : "black"
                }`}
              >
                {"15:00"}
              </Typography>
            </div>
          </div>
        </Link>
        <div className="flex items-center col-span-1 row-span-2 justify-end">
          <Link to={`/user/home/plans/routine/${routine.id}`}>
            <div className="w-full">
              <img
                className="h-8"
                src={
                  preferenceUser?.theme === "dark"
                    ? arrowRightWhite
                    : arrowRightBlack
                }
              />
            </div>
          </Link>
          <Link to={`/user/home/plans/${plan.id}`}>
            <Popover>
              <PopoverTrigger asChild>
                <img
                  className="h-8"
                  src={
                    preferenceUser?.theme === "dark"
                      ? optionsWhite
                      : optionsBlack
                  }
                />
              </PopoverTrigger>
              <PopoverContent
                className={`w-40 p-2 ${
                  preferenceUser?.theme === "dark" ? "bg-dark-2" : "bg-light-2"
                }`}
              >
                <div className="flex flex-col gap-1">
                <button
                  className={`p-2 rounded-md transition duration-200 ease-in-out ${
                    preferenceUser?.theme === "dark"
                      ? "hover:bg-light-2/30 active:bg-dark-2/10"
                      : "hover:bg-light-1 active:bg-light-1/10"
                  }`}
                  onClick={handleEdit}
                >
                  <Typography
                    variant={`span-${
                      preferenceUser?.theme === "dark" ? "white" : "black"
                    }`}
                  >
                    Editar
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
          </Link>
        </div>
      </div>
      {showDialog && (
        <AlertDialog
          title={`Estas seguro que deseas eliminar el plan ${plan.name}`}
          message="Si lo eliminas no podras recuperarlo"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          active={showDialog}
        />
      )}
      {openEdit && (
        <AlertEditRoutine
          routine={routine}
          onConfirm={handleConfirmEdit}
          onCancel={handleCancelEdit}
          active={openEdit}
        />
      )}
    </>
  );
};

export default ItemRoutine;
