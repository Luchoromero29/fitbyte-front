import { useState } from "react";
import { ButtonCancel, ButtonConfirm } from "../Buttons/Buttons";
import Typography from "../Typography/Typography";

interface EditRestProps {
  isVisible: boolean;
  title: string;
  message: string;
  onConfirm: (rest: number) => void;
  onCancel: () => void;
  theme: string;
  time: number;
}

const EditTime = ({
  isVisible,
  title,
  message,
  onConfirm,
  onCancel,
  theme,
  time,
}: EditRestProps) => {

const [value, setValue] = useState(time);

  const handleCancel = () => {
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm(value);
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isVisible ? "alert-dialog-active" : "alert-dialog-inactive"
      }`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-dark-2" : "bg-light-1"
        } p-6 rounded shadow-lg w-96 flex flex-col gap-3`}
      >
        <Typography variant={`h5-${theme === "dark" ? "white" : "black"}`}>
          {title}
        </Typography>
        <Typography
          variant={`span-light-${theme === "dark" ? "white" : "black"}`}
        >
          {message}
        </Typography>
        <main>
          <input
            type="number"
            name="rest"
            defaultValue={time}
            onChange={(e) => setValue(Number(e.target.value))}
            className={`rounded-md outline-none p-2 bg-light-1/0 border-2 border-violet-2 ${
              theme === "dark" ? "text-white" : "text-black"
            } font-chopinMedium w-full text-center`}
          />
        </main>
        <div className="flex justify-end">
          <ButtonCancel
            label="Cancelar"
            onConfirm={handleCancel}
            color={theme === "dark" ? "white" : "black"}
          />
          <ButtonConfirm
            label="Confirmar"
            onConfirm={handleConfirm}
            color={theme === "dark" ? "white" : "black"}
          />
        </div>
      </div>
    </div>
  );
};

export default EditTime;
