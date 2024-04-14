import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { unitsTranslations } from "./units";
import { extraCalcsTranslations } from "./extraCalcs";
import { nutrientCalcTranslations } from "./nutrientCalc";
import { navBarTranslations } from "./navbar";
import { aboutTranslations } from "./about";
import { contactTranslations } from "./contact";

const [unitsEN, unitsDE] = unitsTranslations;
const [ExtraCalcsEN, ExtraCalcsDE] = extraCalcsTranslations;
const [NutrientCalcEN] = nutrientCalcTranslations;
const [NavbarEN] = navBarTranslations;
const [AboutEN] = aboutTranslations;
const [ContactEN] = contactTranslations;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          greeting: "Hello",
          ...unitsEN,
          ...ExtraCalcsEN,
          ...NutrientCalcEN,
          ...NavbarEN,
          ...AboutEN,
          ...ContactEN,
        },
      },
      de: {
        translation: {
          greeting: "Hallo",
          ...unitsDE,
          ...ExtraCalcsDE,
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
