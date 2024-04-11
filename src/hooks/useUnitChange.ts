import { useEffect, useState, Dispatch, SetStateAction } from "react";

export default function useUnitChange<
  T extends { units: string; batchSize: number }
>({
  stateObj,
  setterFunction,
  propertyToChange,
}: {
  stateObj: T;
  setterFunction: Dispatch<SetStateAction<T>>;
  propertyToChange: keyof T;
}) {
  const [allowChange, setAllowChange] = useState(false);
  useEffect(() => {
    if (allowChange) {
      let newState = stateObj[propertyToChange];
      if (stateObj.units === "gallon") newState /= 3.785;
      if (stateObj.units === "liter") newState *= 3.785;
      setterFunction({ ...stateObj, [propertyToChange]: newState });
    }
    setAllowChange(true);
  }, [stateObj.units]);
  return [stateObj, setterFunction];
}
