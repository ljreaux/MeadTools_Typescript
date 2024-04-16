import { Ingredient as IngredientType } from "../../App";
import { FormEvent } from "react";
import { FaMinusSquare } from "react-icons/fa";
import { useEffect } from "react";
import getAllIngredients from "../../helpers/getAllIngredients";
import { toSG } from "../../helpers/unitConverters";

export interface IngredientListItem {
  id: number;
  name: string;
  sugar_content: string;
  water_content: string;
  category: string;
}

function IngredientOptions({
  ingredients,
  setIngredients,
}: {
  ingredients: IngredientListItem[];
  setIngredients: (obj: IngredientListItem[]) => void;
}) {
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
  units,
  setIngredients,
  removeLine,
  setChecked,
  setIndividual,
}: {
  ingredient: IngredientType;
  index: number;
  ingredientsList: IngredientListItem[];
  filterTerm: null | string[];
  units: {
    weight: "lbs" | "kg";
    volume: "gal" | "liter";
  };
  setIngredients: (obj: IngredientListItem[]) => void;
  removeLine: (index: number) => void;
  setChecked: (index: number) => void;
  setIndividual: (index: number, obj: Partial<IngredientType>) => void;
}) {
  const converter =
    units.weight === "kg" && units.volume === "liter"
      ? (8.345 * 0.453592) / 3.78541
      : units.weight === "kg"
      ? 8.345 * 0.453592
      : units.volume === "liter"
      ? 8.345 / 3.78541
      : 8.345;

  const filtered = filterTerm
    ? ingredients.filter(
        (ingredient) =>
          ingredient.category === filterTerm[0] ||
          ingredient.category === filterTerm[1]
      )
    : ingredients;
  function changeIngredient(e: FormEvent<EventTarget>, index: number) {
    const target = e.target as HTMLSelectElement;
    const {
      sugar_content: brix,
      name,
      category,
    } = ingredients.find((ingredient) => ingredient.name === target.value) || {
      sugar_content: 0,
      name: "error",
      category: "error",
    };

    setIndividual(index, {
      brix: Number(brix),
      name,
      details: [
        ingredient.details[0],
        Math.round(
          (ingredient.details[0] / converter / toSG(Number(brix))) * 10000
        ) / 10000,
      ],
      secondary: false,
      category,
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
          ? Math.round(value * converter * toSG(ingredient.brix) * 10000) /
            10000
          : Math.round((value / converter / toSG(ingredient.brix)) * 10000) /
            10000;

      setIndividual(index, {
        details: detailCopy,
      });
    } else {
      setIndividual(index, {
        brix: value,
        details: [
          ingredient.details[0],
          Math.round(
            (ingredient.details[0] / converter / toSG(value)) * 10000
          ) / 10000,
        ],
      });
    }
  }
  return (
    <div
      className={`flex w-full py-[.25rem] ${
        index == 1 ? "border-dotted border-b-[1px] border-textColor" : null
      }`}
    >
      <div key={index} className="grid grid-cols-5 w-full items-center">
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
        <input
          type="checkbox"
          className="h-5"
          checked={ingredient.secondary}
          onChange={() => setChecked(index)}
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
