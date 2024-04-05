import { useEffect } from "react";
export default function useUnitChange<
  T extends { units: string; batchSize: number }
>({
  stateObj,
  setterFunction,
  propertyToChange,
}: {
  stateObj: T;
  setterFunction: (value: object) => void;
  propertyToChange: keyof T;
}) {
  useEffect(() => {
    let newState = stateObj[propertyToChange];
    if (stateObj.units === "gallon") newState /= 3.785;
    if (stateObj.units === "liter") newState *= 3.785;
    setterFunction({ ...stateObj, [propertyToChange]: newState });
  }, [stateObj.units]);
  return [stateObj, setterFunction];
}
