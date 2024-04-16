import { useState } from "react";
import ExtraCalcs from "./components/ExtraCalculators/ExtraCalcs";
import Navbar from "./components/Navs/Navbar";
import { Route, Routes } from "react-router-dom";
import BottomBar from "./components/Navs/BottomBar";
import About from "./components/About/About";
import ContactUs from "./components/About/ContactUs";
import NutrientCalc from "./components/Nutrients/NutrientCalc";
import Home from "./components/Home/Home";
import { initialIngredients } from "./components/Home/initialIngredients";

export interface Ingredient {
  name: string;
  brix: number;
  details: number[];
}
export interface RecipeData {
  ingredients: Ingredient[];
  ingredientsList: object[];
  FG: number;
  units: {
    weight: "lbs" | "kg";
    volume: "gal" | "liter";
  };
}

function App() {
  const [recipeData, setRecipeData] = useState<RecipeData>({
    ingredients: initialIngredients,
    ingredientsList: [],
    FG: 0.996,
    units: {
      weight: "lbs",
      volume: "gal",
    },
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [opened, setOpened] = useState({
    menu: false,
    calcs: false,
    extraCalcs: false,
    account: false,
    links: false,
  });

  return (
    <div className="grid">
      <Navbar
        token={token}
        setToken={setToken}
        opened={opened}
        setOpened={setOpened}
      />
      <main
        className="flex items-center justify-center w-full min-h-[100vh]"
        onClick={() => setOpened((prev) => ({ ...prev, menu: false }))}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Home recipeData={recipeData} setRecipeData={setRecipeData} />
            }
          />
          <Route path="/NuteCalc" element={<NutrientCalc />} />
          <Route path="/ExtraCalcs/*" element={<ExtraCalcs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <BottomBar />
      </main>
    </div>
  );
}

export default App;
