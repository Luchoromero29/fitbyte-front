import { Link } from "react-router-dom";
import Typography from "../Typography/Typography";

interface ItemOptionsProps {
  label: string;
  path: string;
}
const ItemOptions = ({ label, path }: ItemOptionsProps) => {
  return (
    <>
      <div className="p-4 border border-violet-1 rounded-xl w-full bg-violet-2/5">
        <Link to={path} >
          <div className="">
            <Typography variant="span-white">{label}</Typography>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ItemOptions;
