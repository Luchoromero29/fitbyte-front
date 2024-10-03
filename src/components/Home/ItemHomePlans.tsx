import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store";

import { Plan } from "../../models";

import { reqGetAllPlansByUserId } from "../../service/planService";

import Typography from "../Typography/Typography";
//import arrrowRightBlack from "../../assets/icons/arrow-rigth-black.png";
import arrrowRightWhite from "../../assets/icons/arrow-rigth-white.png";

interface ItemHomePlansProps {
  path: string;
}

const ItemHomePlans = ({ path }: ItemHomePlansProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const preferenceUser = useSelector(
    (state: RootState) => state.preferenceUser
  );

  const [plans, setPlans] = useState<Array<Plan>>([]);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    const getAllPlans = async () => {
      if (user) {
        const response = await reqGetAllPlansByUserId(user?.id);
        
        if (response.length > 0) {
          setPlans(response.slice(0, 3));
          setIsEmpty(false);
        }
      }
    };
    getAllPlans();
  }, []);

  return (
    <div className="h-full flex flex-col justify-center gap-2">
      <header className="">
        <Link to={path}>
          <div className="w-full h-full flex flex-col justify-center">
            <Typography variant="h5-white">Planes</Typography>
            {!isEmpty && (
              <Typography variant="span-light-white">Tus favoritos</Typography>
            )}
          </div>
        </Link>
      </header>
      <main className="flex flex-col gap-3 justify-center h-full ">
        {plans?.map((plan,index) => (
          <Link
            to={`/user/home/plans/${plan.id}`}
            className="flex justify-between p-2 items-center border-2 border-white rounded-2xl"
            key={index}
          >
            <Typography variant={`span-light-white`}>{plan.name}</Typography>
            <div className="">
              <img
                className="h-6"
                src={
                  preferenceUser?.theme === "dark"
                    ? arrrowRightWhite
                    : arrrowRightWhite
                }
              />
            </div>
          </Link>
        ))}
        {isEmpty && (
          <div className="h-full ">
            <Link to="/user/home/plans" className="h-full flex items-center">
              <Typography variant="span-white">
                Crea tu primer plan ahora!
              </Typography>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default ItemHomePlans;
