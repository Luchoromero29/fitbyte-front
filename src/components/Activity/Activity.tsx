import { useEffect, useState } from "react"
import Typography from "../Typography/Typography"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Exercise } from "../../models"


interface Serie {
  repeticiones: number;
  kilos: number;
}

const Activity = () => {

    const exerciseActive = useSelector((state: RootState) => state.exercise)
    const [exercise, setExercise] = useState<Exercise>()

    useEffect(() => {
        if (exerciseActive) {
          setExercise(exerciseActive)
        }
    },[exerciseActive])

    
    const [series, setSeries] = useState<Serie[]>([{ repeticiones: 0, kilos: 0 }]);
  
    // const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   setDescripcion(e.target.value);
    // };
  
    const handleSerieChange = (index: number, key: keyof Serie, value: number) => {
      const nuevasSeries = [...series];
      nuevasSeries[index][key] = value;
      setSeries(nuevasSeries);
    };
  
    const agregarSerie = () => {
      setSeries([...series, { repeticiones: 0, kilos: 0 }]);
    };

    return (
      <div className="bg-gray-800 p-4 rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-2">{exercise?.name}</h2>
        <textarea
          className="bg-gray-700 p-2 rounded-md w-full text-white mb-4"
          value={exercise?.description}

          rows={3}
        />
        <div>
          {series.map((serie, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="number"
                className="bg-gray-700 p-2 rounded-md text-white w-20 mr-2"
                value={serie.repeticiones}
                onChange={(e) => handleSerieChange(index, 'repeticiones', parseInt(e.target.value))}
                placeholder="Reps"
              />
              <input
                type="number"
                className="bg-gray-700 p-2 rounded-md text-white w-20"
                value={serie.kilos}
                onChange={(e) => handleSerieChange(index, 'kilos', parseInt(e.target.value))}
                placeholder="Kilos"
              />
            </div>
          ))}
          <button
            onClick={agregarSerie}
            className="bg-purple-700 p-2 rounded-md w-full mt-2 text-white"
          >
            Agregar Serie
          </button>
        </div>
      </div>
    );

}

export default Activity