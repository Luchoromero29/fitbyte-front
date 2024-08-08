import { Plan } from "../../models"
import Typography from "../Typography/Typography"
import arrowRight from "../../assets/icons/arrow-rigth-black.png"

interface ItemPlanProps {
    plan: Plan
}

const ItemPlan = ({plan}: ItemPlanProps) => {
  return (
    <>
        <div className="grid grid-cols-5 justify-between  bg-pink-4 p-3 rounded-md shadow-md">
          <div className="col-span-4 grid row-span-2 gap-3">
            <Typography variant="h6-black">{plan.name}</Typography>
            <Typography variant="span-light-black">{plan.description}</Typography>
          </div>
          <div className=" flex items-center col-span-1 row-span-2 justify-center">
            <img className="h-10" src={arrowRight} />
          </div>
        </div>
    </>
  )
}

export default ItemPlan