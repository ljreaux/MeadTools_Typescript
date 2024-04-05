import { useEffect, Dispatch, SetStateAction } from "react";
import { toSG, toBrix } from "../helpers/unitConverters";
import { Brix } from "../components/ExtraCalculators/Brix/Brix";

export default function useBrixUnitsChange<T extends { unit: string }>({
  stateObj,
  setterFunction,
  propertyToChange,
}: {
  stateObj: T;
  setterFunction: Dispatch<SetStateAction<Brix>>;
  propertyToChange: keyof T;
}) {
  useEffect(() => {
    console.log(stateObj);
    let newState = stateObj[propertyToChange];
    if (stateObj.unit === "SG")
      newState = Math.round(toSG(newState) * 1000) / 1000;
    if (stateObj.unit === "Brix")
      newState = Math.round(toBrix(newState) * 100) / 100;
    setterFunction((prev) => ({ ...prev, [propertyToChange]: newState }));
  }, [stateObj.unit]);

  return [stateObj, setterFunction];
}
