import { BatchDetails } from "./BenchTrials";
import { FormEvent, useState } from "react";
import useChangeLogger from "../../hooks/useChangeLogger";

type StockVolume = number[];

interface Props {
  batchDetails: BatchDetails;
}

export default function Trials({ batchDetails }: Props) {
  const newStockSolutions = [0, 0, 0, 0, 0];

  const [stockVolume, setStockVolume] =
    useState<StockVolume>(newStockSolutions);

  function handleStockVolume(e: FormEvent<EventTarget>, index: number): void {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);
    console.log(e);
    setStockVolume((prev) => {
      return prev.map((_, i) => (i === index ? value : prev[i]));
    });
  }
  const adjunctInSample = (index: number) => {
    return (
      Math.round(
        stockVolume[index] * batchDetails.stockSolutionConcentration * 10 ** 6
      ) /
      10 ** 8
    );
  };

  useChangeLogger(stockVolume);
  return (
    <div className="col-span-2 grid grid-cols-5">
      {stockVolume.map((solution, i) => {
        const sample = adjunctInSample(i);
        const scaler =
          Math.round(
            (sample / (batchDetails.sampleSize + stockVolume[i])) * 10 ** 6
          ) /
          10 ** 6;
        const scaledAdjunct =
          batchDetails.units == "gallon"
            ? Math.round(scaler * 37850000) / 10 ** 4
            : (scaler * 10 ** 4) / 10;
        const scaledBatch =
          Math.round(scaledAdjunct * batchDetails.batchSize * 10 ** 4) /
          10 ** 4;

        return (
          <div
            key={i}
            className="text-center flex flex-col justify-center  items-center gap-4"
          >
            <label htmlFor={`stockVolume ${i + 1}`}>
              Stock Solution Volume
            </label>
            <input
              className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%]"
              id={`stockVolume ${i + 1}`}
              type="number"
              value={solution}
              onChange={(e) => handleStockVolume(e, i)}
              onFocus={(e) => e.target.select()}
            />

            <label htmlFor={`adjunctAmount ${i + 1}`}>
              Adjunct Amount in sample (g)
            </label>
            <input
              className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%]"
              id={`adjunctAmount ${i + 1}`}
              type="number"
              value={sample}
              readOnly
              disabled
            />
            <label htmlFor={`adjunctInSample ${i + 1}`}>
              Adjunct Concentration (ppm)
            </label>
            <input
              className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%]"
              id={`adjunctInSample ${i + 1}`}
              type="number"
              value={scaler * 1000000}
              readOnly
              disabled
            />
            <label htmlFor="scaledAdjunct">
              Scaled Adjunct {`g/${batchDetails.units}`}
            </label>
            <input
              className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%]"
              id={`scaledAdjunct ${i + 1}`}
              type="number"
              value={scaledAdjunct}
              readOnly
              disabled
            />
            <label htmlFor={`batchAmount ${i + 1}`}>
              Scaled Adjunct (entire batch)
            </label>
            <input
              className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%]"
              id={`batchAmount ${i + 1}`}
              type="number"
              value={scaledBatch}
              readOnly
              disabled
            />
          </div>
        );
      })}
    </div>
  );
}
