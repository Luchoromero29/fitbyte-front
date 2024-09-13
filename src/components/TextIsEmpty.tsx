import { useSelector } from "react-redux"
import Typography from "./Typography/Typography"
import { RootState } from "../store";

interface TextIsEmptyProps {
    label: string
}

export const TextIsEmpty = ({label}: TextIsEmptyProps) => {

  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);

  return (
    <div>
        <Typography variant={`h6-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>No se encontraron: {label}</Typography>
    </div>
  )
}
