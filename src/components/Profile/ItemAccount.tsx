import { useSelector } from "react-redux";
import Typography from "../Typography/Typography"
import { RootState } from "../../store";


const ItemAccount = ( {label, value, type, modifiable, onChange}: itemAccountProps) => {

  const preferenceUser = useSelector((state: RootState) => state.preferenceUser);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(onChange){
      console.log(e.target.value);
      
      onChange(e.target.value);
    }
  }

  return (
    <div className="flex flex-col w-full border border-violet-1 p-3 rounded-xl shadow-md">
        <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>{label}</Typography>
        {modifiable ? 
          <input type={type} className={`w-full rounded-lg ${preferenceUser?.theme === "dark" ? "bg-dark-1 text-white" : "bg-light-3 text-black" } font-chopinLight focus:outline-none`} defaultValue={value} onChange={handleChange}  /> 
          : <input type={type} className={`w-full rounded-lg ${preferenceUser?.theme === "dark" ? "bg-dark-1 text-white" : "bg-light-3 text-black" } font-chopinLight focus:outline-none`} defaultValue={value} readOnly /> 
        }
    </div>
  )
}

export default ItemAccount

interface itemAccountProps {
    label: string,
    value: string | number | undefined,
    type: string,
    modifiable: boolean,
    onChange?: (data: string) => void
}