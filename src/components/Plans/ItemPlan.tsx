import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";

import { ErrorDialogI, Plan } from "../../models";
import Typography from "../Typography/Typography";
import arrowRightWhite from "../../assets/icons/arrow-rigth-white.png";
import arrowRightBlack from "../../assets/icons/arrow-rigth-black.png";
import optionsWhite from "../../assets/icons/options-white.png";
import optionsBlack from "../../assets/icons/options-black.png";
import { addPlan } from "../../store/planSlice";

import AlertDialog from "../Modal/AlertDialog";
import { reqDeletePlan, reqUpdatePlan } from "../../service/planService";
import AlertEditPlan from "./AlertEditPlan";
import MessageDialog from "../Modal/MessageDialog";
import { RootState } from "../../store";

interface ItemPlanProps {
  plan: Plan;
  onPlanDelete: (id: number) => void;
}

const ItemPlan = ({ plan, onPlanDelete }: ItemPlanProps) => {
  const dispatch = useDispatch();

  const preferenceUser = useSelector(
    (state: RootState) => state.preferenceUser
  );

  const [showDialog, setShowDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isError, setIsError] = useState<ErrorDialogI>({
    active: false,
    title: "",
    message: "",
  });

  const setPlanState = () => {
    dispatch(addPlan(plan));
  };

  const handleDelete = () => {
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    await reqDeletePlan(plan.id);
    onPlanDelete(plan.id);
    setShowDialog(false);
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleConfirmEdit = async (name: string, description: string) => {
    if (name.length === 0) {
      setIsError({
        active: true,
        title: "El nombre no puede ser vacío",
        message: "",
      });
      setOpenEdit(false);
      return;
    }

    plan.name = name;
    plan.description = description;
    await reqUpdatePlan(plan);

    setOpenEdit(false);
  };

  const handleCancelEdit = () => {
    setOpenEdit(false);
  };

  return (
    <>
      <div
        className={`grid grid-cols-8 justify-between ${
          preferenceUser?.theme === "dark" ? "bg-black" : "bg-white"
        } p-3 rounded-md shadow-md`}
      >
        <Link
          to={`/user/home/plans/${plan.id}`}
          onClick={setPlanState}
          className="col-span-6 grid row-span-2 gap-3"
        >
          <div>
            <Typography
              variant={`h6-${
                preferenceUser?.theme === "dark" ? "white" : "black"
              }`}
            >
              {plan.name}
            </Typography>
            <Typography
              variant={`span-light-${
                preferenceUser?.theme === "dark" ? "white" : "black"
              }`}
            >
              {plan.description}
            </Typography>
          </div>
        </Link>

        <div className="flex items-center justify-end col-span-2 row-span-2">
          <Link
            to={`/user/home/plans/${plan.id}`}
            onClick={setPlanState}
            className="flex justify-end"
          >
            <img
              className="h-8"
              src={
                preferenceUser?.theme === "dark"
                  ? arrowRightWhite
                  : arrowRightBlack
              }
              alt="Arrow Right"
            />
          </Link>
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
        </div>
      </div>

      {showDialog && (
        <AlertDialog
          title={`Estas seguro que deseas eliminar el plan ${plan.name}`}
          message="Si lo eliminas no podrás recuperarlo"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          active={showDialog}
        />
      )}
      {openEdit && (
        <AlertEditPlan
          onConfirm={handleConfirmEdit}
          onCancel={handleCancelEdit}
          active={openEdit}
          plan={plan}
        />
      )}
      {isError.active && (
        <MessageDialog
          title={isError.title}
          message={isError.message || ""}
          onConfirm={() => setIsError({ ...isError, active: false })}
          active={isError.active}
        />
      )}
    </>
  );
};

export default ItemPlan;
