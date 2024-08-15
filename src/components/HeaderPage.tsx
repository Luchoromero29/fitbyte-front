import Typography from "./Typography/Typography";
import ArrowBack from "../assets/icons/arrow-back-white.png";
import { Link } from "react-router-dom";


interface HeaderPageProps {
  title: string;
  description?: string | null;
  path: string 
}

const HeaderPage = ({ title, description, path }: HeaderPageProps) => {
  


  return (
    <header className="relative flex items-center justify-center w-full px-6 pt-3">
      <div className="absolute left-6">
        <Link to={path}>
          <img src={ArrowBack} className="h-8" />
        </Link>
      </div>
      <div className="text-center flex flex-col">
        <Typography variant="h3-white">{title}</Typography>
        <Typography variant="span-light-white">{description}</Typography>
      </div>
    </header>
  );
};

export default HeaderPage;
