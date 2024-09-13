import Typography from "../../components/Typography/Typography";

interface InputRegisterProps {
  label: string;
  placeHolder?: string;
  color?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  type?: string;
  name: string;
}

const InputRegister = ({
  label,
  name,
  placeHolder,
  color,
  onChange,
  defaultValue,
  type,
}: InputRegisterProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <div>
      <label htmlFor={name} className="flex flex-col gap-1 items-start w-full">
        <Typography variant={`span-${color || "white"}`}>{label}</Typography>
        <input
          id={name}
          type={type || "text"}
          placeholder={placeHolder || ""}
          onChange={handleChange}
          defaultValue={defaultValue || ""}
          name={name}
          className={`w-full p-2 rounded-lg bg-light-1 border border-pink-1  text-dark-1 shadow-md`}
          required
        />
      </label>
    </div>
  );
};

export default InputRegister;
