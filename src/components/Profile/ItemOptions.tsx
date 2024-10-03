import { Link } from "react-router-dom";
import Typography from "../Typography/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ItemOptionsProps {
  label: string;
  path: string;
  
}
const ItemOptions = ({ label, path }: ItemOptionsProps) => {

  const preference = useSelector((state: RootState) => state.preferenceUser);

  return (
    <>
      <div className={`p-4 border-2 ${preference?.theme === "dark" ? "border-violet-1 bg-violet-2/5" : "border-pink-3 bg-pink-2/5"} rounded-xl w-full `}>
        <Link to={path} >
          <div className="">
            <Typography variant={`span-medium-${preference.theme === "dark" ? "white" : "black"}`}>{label}</Typography>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ItemOptions;
