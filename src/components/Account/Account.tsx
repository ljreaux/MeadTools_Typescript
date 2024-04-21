import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../helpers/Login";
import Loading from "../Loading";
import RecipeCard from "./RecipeCard";
import { RecipeData } from "../../App";

interface UserInfo {
  id: number;
  email: string;
  google_id: string | null;
  role: "user" | "admin";
  recipes: { id: number; user_id: number; name: string }[];
}

export default function Account({
  token,
  setToken,
  setRecipeData,
}: {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setRecipeData: React.Dispatch<React.SetStateAction<RecipeData>>;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate("/login");
    else
      (async () => {
        const user = await getUserInfo(token);
        if (user) {
          setUserInfo(user);
          console.log(user);
        } else {
          alert("Login failed");
          navigate("/login");
        }
      })();
  }, [token]);
  return (
    <div>
      {userInfo ? (
        <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
          <h1>Account</h1>
          <div>
            <h2>Hello {userInfo.email}</h2>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken(null);
              }}
            >
              Logout
            </button>
            {userInfo.recipes.map((recipe) => (
              <RecipeCard
                recipe={recipe}
                token={token}
                setRecipeData={setRecipeData}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
