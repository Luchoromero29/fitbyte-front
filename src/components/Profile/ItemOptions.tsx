import { Link } from "react-router-dom";
import Typography from "../Typography/Typography";


interface ItemOptionsProps {
  label: string;
  path: string;
  
}
const ItemOptions = ({ label, path }: ItemOptionsProps) => {


  return (
    <>
      <div className={`p-4 border-2 dark:border-violet-1 dark:bg-violet-2/5 border-pink-3 bg-pink-2/5 rounded-xl w-full `}>
        <Link to={path} >
          <div className="">
            <Typography variant={`span-medium`}>{label}</Typography>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ItemOptions;
