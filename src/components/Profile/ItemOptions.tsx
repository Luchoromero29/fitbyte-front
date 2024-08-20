import Typography from "../Typography/Typography"


interface ItemOptionsProps {
    label: string,
}
const ItemOptions = ({label}: ItemOptionsProps) => {
  return (
    <>
        <div className="p-4 border border-violet-1 rounded-xl w-full bg-violet-2/5">
            <div className="">
                <Typography variant="span-white">{label}</Typography>
            </div>
        </div>
    </>
  )
}

export default ItemOptions