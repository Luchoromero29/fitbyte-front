import { useSelector } from "react-redux"
import Typography from "./Typography/Typography"
import { RootState } from "../store";

interface TextIsEmptyProps {
    label: string
}

export const TextIsEmpty = ({label}: TextIsEmptyProps) => {

  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);

  return (
    <div className={`${preferenceUser?.theme === "dark" ? "bg-dark-3" : "bg-light-2"} p-3 rounded-md`}>
        <Typography variant={`span-medium-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>Primero se deben crear {label}</Typography>
    </div>
  )
}
