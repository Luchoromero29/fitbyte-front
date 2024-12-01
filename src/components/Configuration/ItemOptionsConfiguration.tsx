import Typography from "../Typography/Typography"

interface Option {
  label: string
  value: string
}
interface ItemOptionsProps {
  option: Option
  active: boolean,
  onClick: (value: string) => void
}

const ItemOptions = ({option, active, onClick}: ItemOptionsProps ) => {

  const handleClick = () => {
    onClick(option.value);
  }

  return (
    <>
        <div className={` dark:text-white px-2 py-1 rounded-full  flex justify-center items-center ${active ? "border-2 border-violet-1" : ""} `}
          onClick={handleClick}
        >
            <Typography variant={`span`}>{option.label}</Typography>
        </div>
    </>
  )
}

export default ItemOptions