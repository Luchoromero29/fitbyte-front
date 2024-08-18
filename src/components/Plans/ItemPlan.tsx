import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Plan } from "../../models";
import Typography from "../Typography/Typography";
import arrowRight from "../../assets/icons/arrow-rigth-white.png";
import optionsWhite from "../../assets/icons/options-white.png";
import { addPlan } from "../../store/planSlice";

import { Popover, PopoverContent, PopoverTrigger } from "../Popover/Popover";
import AlertDialog from "../Modal/AlertDialog";
import { reqDeletePlan } from "../../service/planService";

interface ItemPlanProps {
  plan: Plan;
  onPlanDelete: (id: number) => void;
}

const ItemPlan = ({ plan, onPlanDelete }: ItemPlanProps) => {
  const dispatch = useDispatch();

  const [showDialog, setShowDialog] = useState(false);

  const setPlanState = () => {
    dispatch(addPlan(plan));
  };

  const handleDelete = () => {
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    console.log("hola");
    await reqDeletePlan(plan.id);
    onPlanDelete(plan.id);
    setShowDialog(false);
  };

  const cancelDelete = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Link to={`/user/home/plans/${plan.id}`} onClick={setPlanState}>
        <div className="grid grid-cols-8 justify-between  bg-black p-3 rounded-md shadow-md ">
          <div className="col-span-6 grid row-span-2 gap-3">
            <Typography variant="h6-white">{plan.name}</Typography>
            <Typography variant="span-light-white">
              {plan.description}
            </Typography>
          </div>
          <div className="flex items-center justify-end  col-span-2 row-span-2 ">
            <div className="flex justify-end">
              <img
                className="col-span-1 h-8 flex justify-end"
                src={arrowRight}
              />
            </div>
            <Link
              to={`/user/home/plans`}
              className="col-span-1 flex justify-end"
            >
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

export default ItemPlan;
{
  /* <div className="grid grid-cols-5 justify-between  bg-pink-4 p-3 rounded-md shadow-md outline outline-1 outline-white">
<Link to={`/user/home/plans/${plan.id}`} onClick={setPlanState} className="col-span-4 grid row-span-2 gap-3">
  <div className="col-span-4 grid row-span-2 gap-3">
    <Typography variant="h6-white">{plan.name}</Typography>
    <Typography variant="span-light-white">
      {plan.description}
    </Typography>
  </div>
</Link>
<div className="flex  items-center justify-centers gap-2  col-span-1 row-span-2 justify-end">
  <Link to={`/user/home/plans/${plan.id}`} onClick={setPlanState}>
    <img className="h-10" src={arrowRight} />
  </Link>
  <img className="h-10" src={optionsWhite} />
</div>
</div> */
}
