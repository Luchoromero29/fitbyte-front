import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { reqUpdatePreference } from "../../service/preferenceService";
import { addPreferenceUser } from "../../store/preferenceSlice";
import Switch from "../Switch";
import Typography from "../Typography/Typography";
import MessageDialog from "../Modal/MessageDialog";
import infoViolet from "../../assets/icons/info-violet.png";
import { useState } from "react";

interface ItemConfigurationCustomModeProps {
  label: string;
}

const ItemConfigurationCustomMode = ({
  label,
}: ItemConfigurationCustomModeProps) => {
  const preference = useSelector((state: RootState) => state.preferenceUser);
  const dispatch = useDispatch();

  const [showMessage, setShowMessage] = useState(false);


const handleChangeCustomMode = async (isOn: boolean) =>{
    const newPreference = {
        ...preference,
        customMode: isOn
    }
    dispatch(addPreferenceUser(newPreference));
    await reqUpdatePreference(newPreference);
}

  const handleShowMessage = () => {
    console.log("Mostrando");

    setShowMessage(true);
  };

  return (
    <>
      <div
        className={`flex flex-col p-3 ${
          preference.theme === "dark" ? "bg-black" : "bg-white"
        } rounded-md shadow-md gap-2`}
      >
        <header className="flex items-center justify-between">
          <Typography
            variant={`h5-${preference.theme === "dark" ? "white" : "black"}`}
          >
            {label}
          </Typography>
          <div onClick={handleShowMessage}>
            <img  className="w-6" src={infoViolet} />
          </div>
        </header>
        <main className="flex gap-2">
          <Switch onToggle={handleChangeCustomMode} value={preference.customMode} theme={preference.theme}/>
          {showMessage && (
            <MessageDialog
            active={showMessage}
            onConfirm={() => setShowMessage(false)}
            title="Que es el modo personalizado?"
            message="El modo personalizado permite que los usuarios puedan ajustar sus enfoques de entrenamiento como hipertofia, fuerza, etc, llevando estadisticas mas precisas y con mayor informacion"
            theme={preference.theme}
          />
          )}
        </main>
      </div>
    </>
  );
};

export default ItemConfigurationCustomMode;
