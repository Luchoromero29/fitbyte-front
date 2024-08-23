import { Link } from "react-router-dom"
import Typography from "../Typography/Typography"

interface ItemHomeProps {
    path: string
}

const ItemHome = ({path}: ItemHomeProps) => {
  return (
    <div>
      <Link to={path} className="h-full w-full">
        <Typography variant=""> </Typography>
      </Link>
    </div>
  )
}

export default ItemHome