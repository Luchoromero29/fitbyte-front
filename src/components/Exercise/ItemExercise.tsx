import { useEffect, useState } from "react";
import { Category, Exercise } from "../../models/index.js";
import Typography from "../Typography/Typography";
import { reqGetCategoryById } from "../../service/categoryService.js";

interface ItemExerciseProps {
  exercise: Exercise,
}

const ItemExercise = ({
exercise
}: ItemExerciseProps) => {
  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await reqGetCategoryById(exercise.categoryId);
        const result: Category = await response.json();
        setCategory(result);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    getCategory();
  }, []);

  return (
    <div className="bg-light-1 flex p-4 rounded-md h-auto shadow-xl">
      <ul className="grid grid-cols-3 grid-rows-1 sm:grid-cols-4 justify-between w-full gap-3 items-center">
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-3">
          <li>
            <Typography variant="h6-black">{exercise.name}</Typography>
          </li>
          <li>
            <Typography variant="span-light-black">{exercise.description}</Typography>
          </li>
          <li>
            {category && (
              <Typography variant="span-light-black">
                Necesitas: {category.name}
              </Typography>
            )}
          </li>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <img className="max-h-32 object-cover rounded-md shadow-xl" src={exercise.urlImage} alt={`imagen de ${exercise.name}`} />
        </div>
      </ul>
    </div>
  );
};

export default ItemExercise;
