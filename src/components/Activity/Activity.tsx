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


interface ActivityProps {
  activity: ActivityModel;
}

const Activity = ({ activity }: ActivityProps) => {

  const user = useSelector((state: RootState) => state.auth.user);
  const [viewAlert, setViewAlert] = useState<boolean>(false);
  const [series, setSeries] = useState<Array<Serie>>([]); // Inicializar como un array vacío
  const [isUpdateSeries, setIsUpdateSeries] = useState<boolean>(false);

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
    setIsUpdateSeries(true)
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

  const handleConfirmUpdateSeries = async () => {
    for (let i = 0; i < series.length; i++) {
      console.log(series[i]);
      
      await reqUpdateSerie(series[i])
    }
    setIsUpdateSeries(false)
  }

  return (
    <div className="bg-light-1 gap-2 p-4 rounded-md flex flex-col">
      <header className="flex justify-between items-center">
        <Typography variant="h5-black">{activity.name}</Typography>
        {isUpdateSeries && (
          <div className=" rounded-full p-1">
            <ButtonConfirmViolet label="Actualizar" onConfirm={handleConfirmUpdateSeries} color="black" active={true}/>
          </div>
        )}
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
          className="bg-light-1 w-full border-2 rounded-md p-1 border-black"
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
