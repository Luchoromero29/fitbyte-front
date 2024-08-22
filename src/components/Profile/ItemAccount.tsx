import Typography from "../Typography/Typography"


const ItemAccount = ( {label, value, type, modifiable, onChange}: itemAccountProps) => {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(onChange){
      console.log(e.target.value);
      
      onChange(e.target.value);
    }
  }

  return (
    <div className="flex flex-col w-full border border-violet-1 p-3 rounded-xl shadow-md">
        <Typography variant="span-white">{label}</Typography>
        {modifiable ? 
          <input type={type} className="w-full rounded-lg bg-dark-1 text-white focus:outline-none" defaultValue={value} onChange={handleChange}  /> 
          : <input type={type} className="w-full rounded-lg bg-dark-1 text-white focus:outline-none" defaultValue={value} readOnly /> 
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