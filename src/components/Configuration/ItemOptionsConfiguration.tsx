import Typography from "../Typography/Typography"

interface Option {
  label: string
  value: string
}
interface ItemOptionsProps {
  option: Option
  color: string
  active: boolean,
  onClick: (value: string) => void
}

const ItemOptions = ({option, color, active, onClick}: ItemOptionsProps ) => {

  const handleClick = () => {
    onClick(option.value);
  }

  return (
    <>
        <div className={` px-2 py-1 rounded-full  flex justify-center items-center ${active ? "border-2 border-pink-1" : ""} `}
          onClick={handleClick}
        >
            <Typography variant={`span-${color}`}>{option.label}</Typography>
        </div>
    </>
  )
}

export default ItemOptions