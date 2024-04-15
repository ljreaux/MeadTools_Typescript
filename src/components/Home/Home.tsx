import useMultiStepForm from "../../hooks/useMultiStepForm";
import RecipeBuilder from "./RecipeBuilder";
import { RecipeData } from "../../App";
import { Dispatch, SetStateAction } from "react";

export default function Home({
  recipeData,
  setRecipeData,
}: {
  recipeData: RecipeData;
  setRecipeData: Dispatch<SetStateAction<RecipeData>>;
}) {
  const { next, back, step } = useMultiStepForm([
    <RecipeBuilder {...recipeData} setRecipeData={setRecipeData} />,
    <div></div>,
  ]);
  return (
    <div>
      {step}
      <button onClick={back}>Back</button>
      <button onClick={next}>Next</button>
    </div>
  );
}
