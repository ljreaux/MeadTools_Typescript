import { useEffect, useState } from "react";

export default function useWeightOrVol(
  infoArr: number[],
  brix: number,
  toChange: "weight" | "vol"
) {
  const [weight, vol] = [...infoArr];
  const [newInfo, setNewInfo] = useState([weight, vol]);

  useEffect(() => {
    if (toChange === "weight") {
      setNewInfo([vol * 8.345 * brix, vol]);
    } else setNewInfo([weight, (weight / 8.345) * brix]);
  }, [weight, vol, brix]);
  return { array: newInfo };
}
