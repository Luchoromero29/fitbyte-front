import { useEffect, useState } from "react";
import { Routine } from "../../models";
import Typography from "../Typography/Typography";
import { reqGetTimeForRoutine } from "../../service/routineService";


interface ItemSectionRutineProps {

  pathImg: string;
  routine?: Routine;
  label?: string;
}

const ItemSectionRutine = ({
  
  pathImg,
  routine,
  label
}: ItemSectionRutineProps) => {

  const [duration, setDuration] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getTimeForRoutine = async () => {
      try {
        if(!routine) return;
        const duration = await reqGetTimeForRoutine(routine.id);
        setDuration(duration);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener el tiempo de la rutina", error);
      }
    };
  
    getTimeForRoutine();
  }, [routine?.id]);  

  return (
    <>
      <div
        className={` flex flex-col items-center w-full dark:text-white dark:bg-dark-2 bg-light-1 text-black
        } rounded-lg py-2 px-4 min-h-24 justify-center`}
      >
        <div  className="flex flex-col items-center text-center">
          <img className="w-8" src={pathImg} />
          <Typography
            variant={`span-medium`}
          >
            {routine?.name || label}
          </Typography>
        </div>
        <div className="flex w-fit">
            <Typography variant={`span-light`}>
             {!isLoading && routine && `${duration} min`}
            </Typography>
        </div>
      </div>
    </>
  );
};

export default ItemSectionRutine;
