import { useEffect, useState } from "react";
import { Category } from "../../models/index.js";
import Typography from "../Typography/Typography";
import { reqGetCategoryById } from "../../service/categoryService.js";

interface ItemExerciseProps {
  name: string;
  description: string;
  categoryId: number;
  urlImage: string;
}

const ItemExercise = ({
  name,
  description,
  categoryId,
  urlImage,
}: ItemExerciseProps) => {
  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await reqGetCategoryById(categoryId);
        const result: Category = await response.json();
        setCategory(result);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    getCategory();
  }, [categoryId]);

  return (
    <div className="bg-pink-3 flex p-4 rounded-md h-auto shadow-xl">
      <ul className="grid grid-cols-3 grid-rows-1 sm:grid-cols-4 justify-between w-full gap-3 items-center">
        <div className="flex flex-col gap-2 col-span-2 sm:col-span-3">
          <li>
            <Typography variant="h6-white">{name}</Typography>
          </li>
          <li>
            <Typography variant="span-light-white">{description}</Typography>
          </li>
          <li>
            {category && (
              <Typography variant="span-light-white">
                Necesitas: {category.name}
              </Typography>
            )}
          </li>
        </div>
        <div className="col-span-1 flex justify-center items-center">
          <img className="max-h-32 object-cover rounded-md shadow-xl" src={urlImage} alt={`imagen de ${name}`} />
        </div>
      </ul>
    </div>
  );
};

export default ItemExercise;
