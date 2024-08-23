import Typography from "./Typography/Typography";
import ArrowBackWhite from "../assets/icons/arrow-back-white.png";
import ArrowBackBlack from "../assets/icons/arrow-back-black.png";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";


interface HeaderPageProps {
  title: string;
  description?: string | null;
  path: string 
}

const HeaderPage = ({ title, description, path }: HeaderPageProps) => {
  
  const preference = useSelector((state: RootState) => state.preferenceUser);

  return (
    <header className="relative flex items-center justify-center w-full px-6 pt-3">
      <div className="absolute left-6">
        <Link to={path}>
          <img src={preference?.theme === "dark" ? ArrowBackWhite : ArrowBackBlack} className="h-8" />
        </Link>
      </div>
      <div className="text-center flex flex-col">
        <Typography variant={`h3-${preference?.theme === "dark" ? "white" : "black"}`}>{title}</Typography>
        <Typography variant={`span-light-${preference?.theme === "dark" ? "white" : "black"}`}>{description}</Typography>
      </div>
    </header>
  );
};

export default HeaderPage;
