
import Typography from "../Typography/Typography";
import ItemOptionsConfiguration from "./ItemOptionsConfiguration";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { reqUpdatePreference } from "../../service/preferenceService";
import { addPreferenceUser } from "../../store/preferenceSlice";

interface ItemConfigurationThemeProps {
  label: string;
}

const ItemConfigurationTheme = ({ label }: ItemConfigurationThemeProps) => {
  
  const preference = useSelector((state: RootState) => state.preferenceUser);

  const dispatch = useDispatch();
  
  const html = document.documentElement;


  const handleChangeTheme = async (value: string) => {

    const confirmChangeTheme = async (value: string) => {
      const newPreference = {
        ...preference,
        theme: value,
      };

      await reqUpdatePreference(newPreference);

      if (preference.theme !== value) {
        dispatch(addPreferenceUser(newPreference));
      }
    };

    if (value === "dark" && !html.classList.contains("dark")) {
      html.classList.add("dark");
      confirmChangeTheme(value);
    } else if (value === "light" && html.classList.contains("dark")) {
      html.classList.remove("dark");
      confirmChangeTheme(value);
    }
  };

  const optionsTheme = [
    {
      label: "Claro",
      value: "light",
    },
    {
      label: "Oscuro",
      value: "dark",
    },
  ];

  return (
    <>
      <div className="flex flex-col p-3 dark:bg-black bg-white rounded-md shadow-md gap-2">
        <header className="dark:text-white text-black">
          <Typography variant="h5">{label}</Typography>
        </header>
        <main className="flex gap-2">
          {optionsTheme.map((option, index) => (
            <ItemOptionsConfiguration
              key={index}
              option={option}
              active={preference.theme === option.value}
              onClick={handleChangeTheme}
            />
          ))}
        </main>
      </div>
    </>
  );
};

export default ItemConfigurationTheme;
