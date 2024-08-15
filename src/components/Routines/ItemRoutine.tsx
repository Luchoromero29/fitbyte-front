import Typography from "../Typography/Typography";
import { Routine } from "../../models";
import arrowRight from "../../assets/icons/arrow-rigth-white.png";
import { Link } from "react-router-dom";

//ASSETS
import calendar from "../../assets/icons/calendar-white.png";
import timer from "../../assets/icons/timer-white.png"
import { useSelector } from "react-redux";
import { RootState } from "../../store";


interface RoutineProps {
  routine: Routine;
}

const ItemRoutine = ({ routine }: RoutineProps) => {

  const plan  = useSelector((state: RootState) => state.plan)

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
                <Typography variant="span-light-white">
                  {'15:00'}
                </Typography>
              </div>
            </div>
          </div>
          <div className=" flex items-center  col-span-1 row-span-2 justify-end">
            <img className="h-10" src={arrowRight} />
          </div>
        </div>
      </Link>
    </>
  );
};

export default ItemRoutine;
