import { Ingredient as IngredientType } from "../../App";
import { FormEvent } from "react";
import { FaMinusSquare } from "react-icons/fa";
import { useEffect } from "react";
import getAllIngredients from "../../helpers/getAllIngredients";
import useWeightOrVol from "../../hooks/useWeightOrVol";

import { toSG } from "../../helpers/unitConverters";

function IngredientOptions({ ingredients, setIngredients }) {
  useEffect(() => {
    (async () => {
      const ingredients = await getAllIngredients();
      setIngredients(ingredients);
    })();
  }, []);
  return (
    <>
      {ingredients.map((ingredient) => (
        <option value={ingredient.name}>{ingredient.name}</option>
      ))}
    </>
  );
}
export default function Ingredient({
  ingredient,
  index,
  ingredientsList: ingredients,
  filterTerm,
  setIngredients,
  removeLine,

  setIndividual,
}: {
  ingredient: IngredientType;
  index: number;
  ingredientsList: object[];
  filterTerm: null | string[];
  setIngredients: (obj: object) => void;
  removeLine: (index: number) => void;
  setIndividual: (index: number, obj: object) => void;
}) {
  const { array } = useWeightOrVol(
    ingredient.details,
    ingredient.brix,
    "weight"
  );

  const filtered = filterTerm
    ? ingredients.filter(
        (ingredient) =>
          ingredient.category === filterTerm[0] ||
          ingredient.category === filterTerm[1]
      )
    : ingredients;
  function changeIngredient(e: FormEvent<EventTarget>, index: number) {
    const target = e.target as HTMLSelectElement;
    const { sugar_content: brix, name } = ingredients.find(
      (ingredient) => ingredient.name === target.value
    );

    setIndividual(index, {
      brix: Number(brix),
      name,
      details: [
        ingredient.details[0],
        Math.round(
          (ingredient.details[0] / 8.345 / toSG(Number(brix))) * 10000
        ) / 10000,
      ],
    });
  }

  function handleChange(
    e: FormEvent<EventTarget>,
    index: number,
    detailIndex: number | null
  ) {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);
    if (typeof detailIndex === "number") {
      const otherIndex = detailIndex === 0 ? 1 : 0;
      const detailCopy = [];
      detailCopy[detailIndex] = value;
      detailCopy[otherIndex] =
        otherIndex === 0
          ? Math.round(value * 8.345 * toSG(ingredient.brix) * 10000) / 10000
          : Math.round((value / 8.345 / toSG(ingredient.brix)) * 10000) / 10000;

      console.log(detailCopy);
      setIndividual(index, {
        details: detailCopy,
      });
    } else {
      console.log(ingredient.details);
      setIndividual(index, {
        brix: value,
        details: [
          ingredient.details[0],
          Math.round((ingredient.details[0] / 8.345 / toSG(value)) * 10000) /
            10000,
        ],
      });
    }
  }
  return (
    <div className="flex w-full">
      <div key={index} className="grid grid-cols-4 w-full">
        <select
          name="ingredientList"
          id="ingredientList"
          value={ingredient.name}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
          onChange={(e) => changeIngredient(e, index)}
        >
          <IngredientOptions
            ingredients={filtered}
            setIngredients={setIngredients}
          />
        </select>
        <input
          type="number"
          name="ingredientWeight"
          value={ingredient.details[0]}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
          onChange={(e) => handleChange(e, index, 0)}
          onFocus={(e) => e.target.select()}
        />
        <input
          type="number"
          name="ingredientBrix"
          value={ingredient.brix}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
          onChange={(e) => handleChange(e, index, null)}
          onFocus={(e) => e.target.select()}
        />
        <input
          type="number"
          name="ingredientVolume"
          value={ingredient.details[1]}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
          onChange={(e) => handleChange(e, index, 1)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      {index > 3 && (
        <button onClick={() => removeLine(index)}>
          <FaMinusSquare />
        </button>
      )}
    </div>
  );
}
