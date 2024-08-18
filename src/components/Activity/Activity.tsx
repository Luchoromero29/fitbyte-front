import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Activity as ActivityModel, Serie } from "../../models";
import Typography from "../Typography/Typography";
import ItemSerie from "../Serie/ItemSerie";
import {
  reqCreateSerie,
  reqDeleteSerie,
  reqGetSeriesByActivityId,
  reqUpdateSerie,
} from "../../service/seriesService";
import { ButtonAddSerieBlack, ButtonConfirmViolet } from "../Buttons/Buttons";
import { RootState } from "../../store";
import MessageDialog from "../Modal/MessageDialog";
import SelectFocusDialog from "../Modal/SelectFocusDialog";
import { Focus } from "../../models/types";
import { reqUpdateActivity } from "../../service/activityService";

interface ActivityProps {
  activity: ActivityModel;
}

const Activity = ({ activity }: ActivityProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [viewAlert, setViewAlert] = useState<boolean>(false);
  const [series, setSeries] = useState<Array<Serie>>([]); // Inicializar como un array vacío
  const [isUpdateSeries, setIsUpdateSeries] = useState<boolean>(false);
  const [isUpdateFocus, setIsUpdateFocus] = useState<boolean>(false);
  const [isUpdateNote, setIsUpdateNote] = useState<boolean>(false);
  const [note, setNote] = useState<string>(activity.note);

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
        unit: "KG",
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

      // Devolver el nuevo array actualizado
      console.log(updatedSeries);

      return updatedSeries;
    });
  };

  const handleConfirmUpdateActivity = async () => {
    if (isUpdateSeries) {
      for (let i = 0; i < series.length; i++) {
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
    if (focus === "Indefinido") {
      setIsUpdateFocus(false);
      return;
    }

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

  return (
    <div className="bg-light-1 gap-2 p-4 rounded-md flex flex-col">
      <header className="flex flex-col ">
        <div className="flex justify-between items-center">
          <Typography variant="h5-black">{activity.name}</Typography>
          {(isUpdateSeries || isUpdateNote) && (
            <div className=" rounded-full p-1">
              <ButtonConfirmViolet
                label="Actualizar"
                onConfirm={handleConfirmUpdateActivity}
                color="black"
                active={true}
              />
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Typography variant="span-light-black">
            Enfoque del ejercicio:
          </Typography>
          <div
            className="outline outline-2 outline-violet-1 rounded-xl px-1 flex items-center"
            onClick={handleChangeFocus}
          >
            <Typography variant="span-black">{activity.focus}</Typography>
          </div>
          {isUpdateFocus && (
            <SelectFocusDialog
              title="Selecciona tu enfoque"
              message=""
              onConfirm={handleConfirmUpdateFocus}
              active={isUpdateFocus}
            />
          )}
        </div>
      </header>
      <main>
        {series?.map((serie, index) => (
          <ItemSerie
            key={serie.id}
            serie={serie}
            index={index + 1}
            onDelete={deleteSerie}
            onChange={updateSerie}
          />
        ))}
        <div className="flex justify-center">
          <ButtonAddSerieBlack
            label="AGREGAR SERIE"
            onConfirm={handleAddSerie}
          />
        </div>
      </main>
      <div className="bg-light-1">
        <textarea
          placeholder="Nota"
          defaultValue={note}
          className="bg-light-1 w-full border-2 rounded-md p-1 border-black"
          onChange={handleUpdateNote}
        ></textarea>
      </div>
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
