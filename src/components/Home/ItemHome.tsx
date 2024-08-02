import { Link } from "react-router-dom"
import Typography from "../Typography/Typography"

interface ItemHomeProps {
    path: string
}

const ItemHome = ({path}: ItemHomeProps) => {
  return (
    <Link to={path} className="h-full w-full">
        <Typography variant=""> </Typography>
    </Link>
  )
}

export default ItemHome