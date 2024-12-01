import Typography from "../Typography/Typography";

interface ItemInfoActivityProps {
  label: string;
  value: string | number;
  onChange: () => void;
  pathImg?: string;
}

const ItemInfoActivity = ({
  label,
  value,
  onChange,
  pathImg,
}: ItemInfoActivityProps) => {
  return (
    <>
      <div
        className={`flex flex-col  items-center dark:bg-dark-1/60 bg-light-2 shadow-sm p-2 rounded-xl`}
        onClick={onChange}
      >
        <div className="flex gap-1 items-center dark:text-white">
          <Typography
            variant={`span-medium`}
          >
            {label}
          </Typography>
          {pathImg && <img className="w-5 h-5" src={pathImg} />}
        </div>
        <div className=" rounded-xl px-1 flex items-center">
          <Typography
            variant={`span-light`}
          >
            {value}
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ItemInfoActivity;
