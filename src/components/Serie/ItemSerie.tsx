import { Serie } from "../../models";
import Typography from "../Typography/Typography";
import "./ItemSerie.css";
import deleteBlack from '../../assets/icons/delete-black.png'

interface ItemSerieProps {
  index: number;
  serie: Serie;
  onConfirm: (id: number) => void;
}

const ItemSerie = ({ index, serie, onConfirm }: ItemSerieProps) => {

    const handleDelete = () => {
      onConfirm(serie.id);
    }
    
    return (
    <>
      <div className="flex justify-between items-center p-1 gap-2">
        <div>
          <Typography variant="span-black">{index}</Typography>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex gap-2 items-center">
            <Typography variant="span-light-black">Rep</Typography>
            <input
              type="number"
              defaultValue={serie.repetition}
              className="w-12 p-1 rounded-md bg-light-1 text-dark-1 placeholder:text-dark-1 outline outline-1 outline-dark-1 text-center"
            />
          </div>
          <Typography variant="span-black">X</Typography>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              defaultValue={serie.weight}
              className="w-12 p-1 rounded-md bg-light-1 text-dark-1 placeholder:text-dark-1 outline outline-1 outline-dark-1 text-center"
            />
            <Typography variant="span-light-black">{serie.unit}</Typography>
          </div>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="w-5 h-5 form-checkbox text-black focus:ring-black " />
        </div>
        <div onClick={handleDelete}>
          <img className="h-5 w-5" src={deleteBlack} />
        </div>
      </div>
    </>
  );
};

export default ItemSerie;
