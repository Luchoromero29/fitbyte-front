import { Link } from "react-router-dom";
import Typography from "../Typography/Typography";

interface ItemPlanSectionEntrenamientProps {
  label: string;
  isActive: boolean;
  planId: number;
}

const ItemPlanSectionEntrenamient = ({label, isActive,  planId}: ItemPlanSectionEntrenamientProps) => {
  return (
    <div className="flex flex-col items-center h-18 min-w-fit">
      <div
        className={`dark:bg-dark-3 bg-light-2
        rounded-lg px-3 py-4 w-fit text-center flex shadow-md`}
      >
        <Link to={`/user/home/plans/${planId}`}>
          <Typography
            variant={`span-medium`}
          >
            {label}
          </Typography>
        </Link>
      </div>
      {isActive && (
        <div>
          <Typography variant={`span-medium-violet`}>Activo</Typography>
        </div>
      )}
    </div>
  );
};

export default ItemPlanSectionEntrenamient;
