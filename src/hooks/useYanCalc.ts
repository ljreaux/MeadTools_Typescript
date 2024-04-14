import { useEffect, useState } from "react";

export default function useYanCalc(
  batchSize: number,
  batchUnits: string,
  totalYan: number,
  gfType: string,
  yanContribution: number[],
  maxGpl: number[],
  numberOfAdditions: number
) {
  const [nutrients, setNutrients] = useState({
    ppmYan: [0, 0, 0],
    totalGrams: [0, 0, 0],
    perAddition: [0, 0, 0],
    totalYan: 0,
    remainingYan: 0,
  });
  useEffect(() => {
    const yanCopy = [...yanContribution];
    let remaining = totalYan;
    let multiplier = 4;
    if (gfType === "none") multiplier = 3;
    yanCopy[0] *= multiplier;
    const ppmYan = [];
    for (let i = 0; i < yanCopy.length; i++) {
      const totalYan = yanCopy[i] * maxGpl[i];
      if (totalYan >= remaining) {
        ppmYan.push(remaining);
        remaining = 0;
        break;
      }
      ppmYan.push(totalYan);
      remaining -= totalYan;
    }
    const totalGrams = ppmYan.map((num, i) =>
      batchUnits === "liter"
        ? (num / yanCopy[i]) * batchSize
        : (num / yanCopy[i]) * batchSize * 3.785
    );
    const perAddition = totalGrams.map((num) => num / numberOfAdditions);
    setNutrients({
      ppmYan,
      totalGrams,
      perAddition,
      remainingYan: remaining,
      totalYan: totalYan - remaining,
    });
  }, [
    batchSize,
    batchUnits,
    totalYan,
    gfType,
    yanContribution,
    maxGpl,
    numberOfAdditions,
  ]);
  return { nutrients, setNutrients };
}
