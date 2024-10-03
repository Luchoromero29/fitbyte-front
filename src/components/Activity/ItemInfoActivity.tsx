import Typography from "../Typography/Typography";

interface ItemInfoActivityProps {
  label: string;
  value: string | number;
  onChange: () => void;
  theme: string;
  pathImg?: string;
}

const ItemInfoActivity = ({
  label,
  value,
  onChange,
  theme,
  pathImg,
}: ItemInfoActivityProps) => {
  return (
    <>
      <div
        className={`flex flex-col  items-center ${theme === "dark" ? "bg-dark-3" : "bg-light-2"} p-2 rounded-xl`}
        onClick={onChange}
      >
        <div className="flex gap-1 items-center">
          <Typography
            variant={`span-medium-${theme === "dark" ? "white" : "black"}`}
          >
            {label}
          </Typography>
          {pathImg && <img className="w-5 h-5" src={pathImg} />}
        </div>
        <div className=" rounded-xl px-1 flex items-center">
          <Typography
            variant={`span-light-${theme === "dark" ? "white" : "black"}`}
          >
            {value}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ItemInfoActivity;
