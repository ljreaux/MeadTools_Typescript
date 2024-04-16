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
    <div className="flex items-center justify-center flex-col">
      {step}
      <div>
        <button
          className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
          onClick={back}
        >
          Back
        </button>
        <button
          className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed"
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
}
