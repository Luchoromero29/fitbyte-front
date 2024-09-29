import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Activity as ActivityModel, Serie } from "../../models";
import Typography from "../Typography/Typography";
import {
  reqCreateSerie,
  reqDeleteSerie,
  reqGetSeriesByActivityId,
  reqUpdateSerie,
} from "../../service/seriesService";
import { ButtonAddSerie, ButtonConfirmViolet } from "../Buttons/Buttons";
import { RootState } from "../../store";
import MessageDialog from "../Modal/MessageDialog";
import SelectFocusDialog from "../Modal/SelectFocusDialog";
import { Focus } from "../../models/types";
import { reqUpdateActivity } from "../../service/activityService";
import OptionsActivity from "./OptionsActivity";
import RowSerie from "../Serie/RowSerie";
import ThTable from "../ThTable";


interface ActivityProps {
  activity: ActivityModel;
  onDelete: (id: number) => void;
}

const Activity = ({ activity, onDelete }: ActivityProps) => {
  const preferenceUser = useSelector((state: RootState) => state.preferenceUser)

  const [viewAlert, setViewAlert] = useState<boolean>(false);
  const [series, setSeries] = useState<Array<Serie>>([]); // Inicializar como un array vacío
  const [isUpdateSeries, setIsUpdateSeries] = useState<boolean>(false);
  const [isUpdateFocus, setIsUpdateFocus] = useState<boolean>(false);
  const [isUpdateNote, setIsUpdateNote] = useState<boolean>(false);
  const [note, setNote] = useState<string>(activity.note);
  const [isNote, setIsNote] = useState<boolean>(activity.note !== "");

  useEffect(() => {
    const getSeriesByActivityId = async () => {
      const response = await reqGetSeriesByActivityId(activity.id);
      setSeries(response);
    };

    getSeriesByActivityId();

  }, [activity.id]); // Asegurar que activity.id sea una dependencia si cambia

  const deleteSerie = async (id: number) => {
    if (series.length === 1) {
      setViewAlert(true);
      return;
    }

    await reqDeleteSerie(id);
    setSeries((prevSeries) => prevSeries?.filter((serie) => serie.id !== id));
  };

  const handleAddSerie = async () => {
    try {
      const serie = {
        weight: 0,
        repetition: 0,
        unit: preferenceUser?.unitWeight || "KG",
        activityId: activity.id,
      };

      const data: Serie = await reqCreateSerie(serie);

      setSeries((prevItems) => [...(prevItems || []), data]); // Asegurarse de que prevItems no sea undefined
    } catch (error) {
      console.error("Error al agregar la serie:", error);
    }
  };

  const updateSerie = (
    index: number,
    newWeight?: number,
    newRepetition?: number
  ) => {
    setIsUpdateSeries(true);
    setSeries((prevState) => {
      // Hacer una copia del array de series
      const updatedSeries = [...prevState];

      // Modificar la serie específica en el índice dado
      updatedSeries[index] = {
        ...updatedSeries[index], // Copiar la serie actual
        weight:
          newWeight !== undefined ? newWeight : updatedSeries[index].weight, // Actualizar solo si se proporciona un nuevo peso
        repetition:
          newRepetition !== undefined
            ? newRepetition
            : updatedSeries[index].repetition, // Actualizar solo si se proporciona una nueva repetición
      };

      return updatedSeries;
    });
  };

  const handleConfirmUpdateActivity = async () => {
    if (isUpdateSeries) {
      for (let i = 0; i < series.length; i++) {
        if(series[i].weight === 0 || series[i].repetition === 0) {
          continue
        }
        await reqUpdateSerie(series[i]);
      }
      setIsUpdateSeries(false);
    }

    if (isUpdateNote) {
      activity.note = note;
      try {
        await reqUpdateActivity(activity);
      } catch (error) {
        console.error("Error al actualizar la nota:", error);
      }
      setIsUpdateNote(false);
    }
  };

  const handleChangeFocus = () => {
    setIsUpdateFocus(true);
  };

  const handleConfirmUpdateFocus = async (focus: Focus) => {
    activity.focus = focus;
    try {
      await reqUpdateActivity(activity);
    } catch (error) {
      console.error("Error al actualizar el enfoque:", error);
    }
    setIsUpdateFocus(false);
  };

  const handleUpdateNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsUpdateNote(true);
    setNote(e.target.value);
  };

  const handleAddNote = () => {
    if (note !== "") {
      handleUpdateNote({ target: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>)
      setIsNote(false)

      return
    } 
    setIsNote(true);
  }

  return (
    <div className={`${preferenceUser?.theme === "dark" ? "bg-black" : "bg-white"} gap-2 p-4 rounded-md flex flex-col`}>
      <header className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex justify-between items-center w-full">
            <Typography variant={`h5-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>{activity.name}</Typography>
            {(isUpdateSeries || isUpdateNote) && (
              <div className=" rounded-full p-1">
                <ButtonConfirmViolet
                  label="Actualizar"
                  onConfirm={handleConfirmUpdateActivity}
                  color={preferenceUser?.theme === "dark" ? "white" : "black"}
                  active={true}
                />
              </div>
            )}
          </div>
            <OptionsActivity activity={activity} onDelete={onDelete} addNote={handleAddNote}/>
        </div>
        <div className="flex gap-1">
          <Typography variant={`span-light-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>
            Enfoque del ejercicio:
          </Typography>
          <div
            className=" rounded-xl px-1 flex items-center"
            onClick={handleChangeFocus}
          >
            <Typography variant={`span-${preferenceUser?.theme === "dark" ? "white" : "black"}`}>{activity.focus}</Typography>
          </div>
          {isUpdateFocus && (
            <SelectFocusDialog
              title="Selecciona tu enfoque"
              message=""
              onConfirm={handleConfirmUpdateFocus}
              active={isUpdateFocus}
              onCancel={() => setIsUpdateFocus(false)}
            />
          )}
        </div>
      </header>
      <main>
        <table className="w-full">
          <thead className="">
            <tr className="text-center">
            <ThTable label="Serie" theme={preferenceUser.theme}/>
            <ThTable label="Reps" theme={preferenceUser.theme}/>
            <ThTable label={preferenceUser.unitWeight} theme={preferenceUser.theme}/>
            <ThTable label="Listo" theme={preferenceUser.theme}/>
            <ThTable label="" theme={preferenceUser.theme}/>
        
            </tr>
          </thead>
          <tbody className="w-full">
            {series?.map((serie, index) => (
              <RowSerie serie={serie} index={index + 1} onChange={updateSerie} onDelete={deleteSerie}/>
            ))}
          </tbody>

        </table>
        <div className="flex justify-center">
          <ButtonAddSerie
            label="AGREGAR SERIE"
            onConfirm={handleAddSerie}
            color={preferenceUser?.theme === "dark" ? "white" : "black"}
          />
        </div>
      </main>
      {isNote && (
        <div className={`${preferenceUser?.theme === "dark" ? "bg-black" : "bg-white"}}`}>
          <textarea
            placeholder="Nota"
            defaultValue={note}
            className={`${preferenceUser?.theme === "dark" ? "bg-black border-white text-white" : "bg-white  border-black text-black"} w-full border-2 rounded-md p-1 focus:outline-0`}
            onChange={handleUpdateNote}
          ></textarea>
        </div>
      )}
      {viewAlert && (
        <MessageDialog
          active={viewAlert}
          title="No puedes dejar el ejercicio sin serie"
          message=""
          onConfirm={() => setViewAlert(false)}
        />
      )}
    </div>
  );
};

export default Activity;
