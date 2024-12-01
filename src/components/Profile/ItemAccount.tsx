
import Typography from "../Typography/Typography"



const ItemAccount = ( {label, value, type, modifiable, onChange}: itemAccountProps) => {

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(onChange){    
      onChange(e.target.value);
    }
  }

  return (
    <div className="flex flex-col w-full border border-violet-1 p-3 rounded-xl ">
        <Typography variant={`span`}>{label}</Typography>
        {modifiable ? 
          <input type={type} className={`w-full rounded-lg dark:bg-dark-1/0 dark:text-white bg-light-3/0 text-black font-chopinLight focus:outline-none`} defaultValue={value} onChange={handleChange}  /> 
          : <input type={type} className={`w-full rounded-lg dark:bg-dark-1/0 dark:text-white bg-light-3/0 text-black font-chopinLight focus:outline-none`} defaultValue={value} readOnly /> 
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