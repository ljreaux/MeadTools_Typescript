import lodash from "lodash";
import { useTranslation } from "react-i18next";
const { t } = useTranslation();

export const additiveDosage = [
  {
    name: t(lodash.camelCase("FT Rouge")),
    dosage: 1.3,
    unit: "g",
  },
  {
    name: t(lodash.camelCase("Opti-Red")),
    dosage: 1,
    unit: "g",
  },
  {
    name: t(lodash.camelCase("FT Blanc Soft")),
    dosage: 0.2,
    unit: "g",
  },
  {
    name: t(lodash.camelCase("Opti-White")),
    dosage: 1.9,
    unit: "g",
  },
  {
    name: t(lodash.camelCase("Tannin Complex")),
    dosage: 0.2,
    unit: "g",
  },
  {
    name: t(lodash.camelCase("Tannin Riche Extra")),
    dosage: 0.2,
    unit: "g",
  },
  {
    name: t(lodash.camelCase("Bentonite")),
    dosage: 6,
    unit: "g",
  },
  {
    name: t(lodash.camelCase("Chitosan")),
    dosage: 1.5,
    unit: "ml",
  },
  {
    name: t(lodash.camelCase("Kieselsol")),
    dosage: 1,
    unit: "ml",
  },
  {
    name: t(lodash.camelCase("Sparkolloid")),
    dosage: 0.6,
    unit: "g",
  },
  {
    name: t(lodash.camelCase("Pectic Enzyme")),
    dosage: 0.4,
    unit: "tsp",
  },
  {
    name: t(lodash.camelCase("Lallzyme EX-V")),
    dosage: 75,
    unit: "mg",
  },
  {
    name: t(lodash.camelCase("Oak Chips")),
    dosage: 0.25,
    unit: "oz",
  },
  {
    name: t(lodash.camelCase("Oak Spirals")),
    dosage: 1,
    unit: "units",
  },
  {
    name: t(lodash.camelCase("Oak Cubes")),
    dosage: 0.5,
    unit: "oz",
  },
];
