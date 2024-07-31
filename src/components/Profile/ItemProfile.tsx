import Typography from "../Typography/Typography"

const ItemProfile = ( {label, value}: itemProfile) => {
  return (
    <div className="flex flex-col w-full bg-violet-1 p-4 rounded-xl shadow-md">
        <Typography variant="span-white">{label}</Typography>
        <Typography variant="span-light-white">{value}</Typography>
    </div>
  )
}

export default ItemProfile

interface itemProfile {
    label: string,
    value: string | number | undefined,
}