import { RecipeData } from "../../App";
import { getRecipeById } from "../../helpers/Login";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({
  recipe,
  token,
  setRecipeData,
}: {
  recipe: { id: number; user_id: number; name: string };
  token: string | null;
  setRecipeData: React.Dispatch<React.SetStateAction<RecipeData>>;
}) {
  const navigate = useNavigate();
  return (
    <div>
      <p>{recipe.name}</p>
      <button
        onClick={() =>
          token &&
          getRecipeById(recipe.id, token)
            .then((res) => {
              const { recipeData } = res.recipe;
              setRecipeData(JSON.parse(recipeData));
              console.log(recipeData);
              navigate("/");
            })
            .catch((err) => alert(err))
        }
      >
        {recipe.id}
      </button>
    </div>
  );
}
