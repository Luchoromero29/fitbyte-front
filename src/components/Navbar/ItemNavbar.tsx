import { Link } from "react-router-dom";
import './ItemNavbar.css'
import Typography from "../Typography/Typography.tsx";

const ItemNavbar = ({ label, src, path, active }: itenNavbar) => {
  
  return (
    <li className={`flex flex-col align-center justify-center w-full p-3  ${active ? 'item-navbar-active' : ''}`}>
      <Link to={path}>
        <div className="flex flex-col justify-center items-center">
          <img src={src} className="w-8" />
          <Typography variant="span-white">{label}</Typography>
        </div>
      </Link>
    </li>
  );
};

export default ItemNavbar;

interface itenNavbar {
  label: string;
  src: string;
  path: string;
  active: boolean;
}
