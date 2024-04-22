import { useNavigate } from "react-router-dom";

export default function RecipeCard({
  recipe,
  token,
}: {
  recipe: { id: number; user_id: number; name: string };
  token: string | null;
}) {
  const navigate = useNavigate();
  return (
    <div className="grid items-center justify-center gap-2">
      <p>{recipe.name}</p>
      <button
        onClick={() => token && navigate(`/recipes/${recipe.id}`)}
        className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2 mt-6"
      >
        View Recipe
      </button>
    </div>
  );
}
