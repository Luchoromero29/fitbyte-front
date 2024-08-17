import { useEffect, useState } from "react";
import { Activity as ActivityModel, Serie } from "../../models";
import Typography from "../Typography/Typography";
import ItemSerie from "../Serie/ItemSerie";
import { reqCreateSerie, reqDeleteSerie, reqGetSeriesByActivityId } from "../../service/seriesService";
import { ButtonAddSerieBlack } from "../Buttons/Buttons";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AlertDialog from "../Modal/AlertDialog";
import MessageDialog from "../Modal/MessageDialog";

interface ActivityProps {
  activity: ActivityModel;
}

const Activity = ({ activity }: ActivityProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [viewAlert, setViewAlert] = useState<boolean>(false)
  const [series, setSeries] = useState<Array<Serie>>([]); // Inicializar como un array vacío

  useEffect(() => {
    const getSeriesByActivityId = async () => {
      const response = await reqGetSeriesByActivityId(activity.id);
      setSeries(response);
    };

    getSeriesByActivityId();
  }, [activity.id]); // Asegurar que activity.id sea una dependencia si cambia

  const deleteSerie = async (id: number) => {

    if(series.length === 1){
      setViewAlert(true)
      return
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

  return (
    <div className="bg-light-1 gap-2 p-4 rounded-md flex flex-col">
      <header>
        <Typography variant="h5-black">{activity.name}</Typography>
      </header>
      <main>
        {series?.map((serie, index) => (
          <ItemSerie key={serie.id} serie={serie} index={index + 1} onConfirm={deleteSerie} />
        ))}
        <div className="flex justify-center">
          <ButtonAddSerieBlack label="AGREGAR SERIE" onConfirm={handleAddSerie} />
        </div>
      </main>
      <div className="bg-light-1">
        <textarea
          placeholder="Nota"
          className="bg-light-1 w-full border-2 rounded-md p-1 border-black"
        ></textarea>
      </div>
      {viewAlert && (
        <MessageDialog active={viewAlert} title="No puedes dejar el ejercicio sin serie" message="" onConfirm={() => setViewAlert(false)}/>
      )}
    </div>
  );
};

export default Activity;
