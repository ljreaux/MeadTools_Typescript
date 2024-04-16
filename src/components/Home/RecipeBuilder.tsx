import { Dispatch, SetStateAction, useEffect } from "react";
import { RecipeData } from "../../App";
import Title from "../Title";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
import Ingredient from "./Ingredient";
import { toSG } from "../../helpers/unitConverters";
import useBlend from "../../hooks/useBlend";
import useAbv from "../../hooks/useAbv";

export default function RecipeBuilder({
  ingredients,
  ingredientsList,
  FG,
  units,
  setRecipeData,
}: RecipeData & { setRecipeData: Dispatch<SetStateAction<RecipeData>> }) {
  const toBlend = ingredients.map((ingredient) => {
    return [toSG(ingredient.brix), ingredient.details[1]];
  });

  const { blend, runBlendingFunction } = useBlend(toBlend);

  function setIngredients(ingredientList: object) {
    setRecipeData((prev: RecipeData) => {
      return {
        ...prev,
        ingredientsList: ingredientList,
      };
    });
  }
  function setIndividual(index: number, ingredient: object) {
    setRecipeData((prev: RecipeData) => {
      const newIngredient = prev.ingredients.map((ing, i) =>
        i === index ? { ...ing, ...ingredient } : ing
      );
      console.log(newIngredient);
      return {
        ...prev,
        ingredients: newIngredient,
      };
    });
  }

  function addIngredientLine() {
    setRecipeData((prev: RecipeData) => {
      return {
        ...prev,
        ingredients: [
          ...prev.ingredients,
          {
            name: "Honey",
            brix: 79.6,
            details: [0, 0],
          },
        ],
      };
    });
  }

  function removeLine(index: number) {
    setRecipeData((prev: RecipeData) => {
      return {
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      };
    });
  }

  const { ABV, delle } = useAbv({ OG: blend.blendedValue, FG });

  useEffect(() => {
    const multiplier = units.weight === "kg" ? 0.453592 : 2.20462;
    setRecipeData((prev: RecipeData) => {
      return {
        ...prev,
        ingredients: prev.ingredients.map((ing) => ({
          ...ing,
          details: [
            Math.round(ing.details[0] * multiplier * 1000) / 1000,
            ing.details[1],
          ],
        })),
      };
    });
  }, [units.weight]);

  useEffect(() => {
    const multiplier = units.volume === "liter" ? 3.78541 : 0.264172;
    setRecipeData((prev: RecipeData) => {
      return {
        ...prev,
        ingredients: prev.ingredients.map((ing) => ({
          ...ing,
          details: [
            ing.details[0],
            Math.round(ing.details[1] * multiplier * 1000) / 1000,
          ],
        })),
      };
    });
    runBlendingFunction();
  }, [units.volume]);

  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <Title header="Recipe Builder" />
      <div className="grid grid-cols-4 text-center">
        <label htmlFor="ingredients">Ingredients</label>
        <label htmlFor="weight">
          Weight
          <select
            name="weightUnits"
            id="weightUnits"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={units.weight}
            onChange={(e) => {
              setRecipeData((prev: RecipeData) => {
                return {
                  ...prev,
                  units: {
                    ...prev.units,
                    weight: e.target.value,
                  },
                };
              });
            }}
          >
            <option value="lbs">lbs</option>
            <option value="kg">kg</option>
          </select>
        </label>
        <label htmlFor="brix">Sugar Percentage (Brix)</label>
        <label htmlFor="volume">
          Volume
          <select
            name="volumeUnits"
            id="volumeUnits"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={units.volume}
            onChange={(e) => {
              setRecipeData((prev: RecipeData) => {
                return {
                  ...prev,
                  units: {
                    ...prev.units,
                    volume: e.target.value,
                  },
                };
              });
            }}
          >
            <option value="gal">Gallons</option>
            <option value="liter">Liters</option>
          </select>
        </label>
      </div>
      {ingredients.map((ingredient, i) => (
        <Ingredient
          ingredient={ingredient}
          index={i}
          ingredientsList={ingredientsList}
          setIngredients={setIngredients}
          setIndividual={setIndividual}
          removeLine={removeLine}
          filterTerm={i <= 1 ? ["water", "juice"] : null}
          units={units}
        />
      ))}
      {ingredients.length < 9 && (
        <button onClick={addIngredientLine}>Add new Ingredient</button>
      )}
      <div className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2 col-span-4 items-center flex justify-center sm:gap-8 gap-4 my-4 group text-lg">
        <button
          type="button"
          className={`group w-fit text-sidebar hover:text-textColor transition-colors disabled:cursor-not-allowed`}
          disabled={ingredients.length > 9}
          onClick={addIngredientLine}
        >
          <FaPlusSquare className="group-hover:scale-125 group-hover:text-textColor " />
        </button>
        <button
          type="button"
          className={`group w-fit text-sidebar hover:text-textColor transition-colors disabled:cursor-not-allowed`}
          disabled={ingredients.length <= 4}
          onClick={() => removeLine(ingredients.length - 1)}
        >
          <FaMinusSquare className="group-hover:scale-125 group-hover:text-textColor" />
        </button>
      </div>
      <button
        className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2"
        onClick={runBlendingFunction}
      >
        Submit
      </button>{" "}
      {blend.blendedValue > 0 && (
        <div className="w-full grid grid-cols-4">
          <label htmlFor="estOG">Estimated OG:</label>
          <label htmlFor="estFG">Estimated FG:</label>
          <label htmlFor="abv">ABV:</label>
          <label htmlFor="delle">Delle Units</label>
          <p id="estOG">{Math.round(blend.blendedValue * 1000) / 1000}</p>
          <input
            type="number"
            value={FG}
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            onChange={(e) => {
              setRecipeData((prev: RecipeData) => {
                return {
                  ...prev,
                  FG: Number(e.target.value),
                };
              });
            }}
            onFocus={(e) => e.target.select()}
          />
          <p>{Math.round(ABV * 100) / 100}% ABV</p>
          <p>{Math.round(delle)} Delle Units</p>
          <label htmlFor="totalVolume" className="col-span-4">
            Total Volume
          </label>
          <p id="totalVolume">
            {Math.round(blend.totalVolume * 1000) / 1000} {units.volume}
          </p>
        </div>
      )}
    </div>
  );
}
