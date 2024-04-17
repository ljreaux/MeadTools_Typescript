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
import { IngredientListItem } from "./components/Home/Ingredient";
import { useTranslation } from "react-i18next";

export interface Additive {
  name: string;
  amount: number;
  unit: string;
}

export interface Ingredient {
  name: string;
  brix: number;
  details: number[];
  secondary: boolean;
  category: string;
}
export interface RecipeData {
  ingredients: Ingredient[];
  ingredientsList: IngredientListItem[];
  OG: number;
  volume: number;
  ABV: number;
  FG: number;
  offset: number;
  units: {
    weight: "lbs" | "kg";
    volume: "gal" | "liter";
  };
  sorbate?: number;
  sulfite?: number;
  additives: Additive[];
}

function App() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const [recipeData, setRecipeData] = useState<RecipeData>({
    ingredients: initialIngredients,
    ingredientsList: [],
    OG: 0,
    volume: 0,
    ABV: 0,
    FG: 0.996,
    offset: 0,
    units: {
      weight: language === "en" ? "lbs" : "kg",
      volume: language === "en" ? "gal" : "liter",
    },
    additives: [{ name: "", amount: 0, unit: "g" }],
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
