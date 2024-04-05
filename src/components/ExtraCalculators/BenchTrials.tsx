import { useState, FormEvent } from "react";
import Trials from "./Trials.tsx";
import useChangeLogger from "../../hooks/useChangeLogger.ts";
import useUnitChange from "../../hooks/useUnitChange.ts";

export interface BatchDetails {
  batchSize: number;
  sampleSize: number;
  stockSolutionConcentration: number;
  units: "gallon" | "liter";
}

export default function BenchTrials() {
  const [batchDetails, setBatchDetails] = useState<BatchDetails>({
    batchSize: 0,
    sampleSize: 0,
    stockSolutionConcentration: 0,
    units: "gallon",
  });

  function handleBatchDetails(
    e: FormEvent<EventTarget>,
    key: keyof BatchDetails
  ): void {
    const target = e.target as HTMLInputElement;
    const value = key == "units" ? target.value : Number(target.value);
    setBatchDetails({
      ...batchDetails,
      [key]: value,
    });
  }

  useChangeLogger(batchDetails);
  const unitChangeParams = {
    stateObj: batchDetails,
    setterFunction: setBatchDetails,
    propertyToChange: "batchSize",
  };
  useUnitChange(unitChangeParams);
  return (
    <form className="grid grid-cols-2 gap-2 items-start mt-[4rem] mx-[2rem]">
      <label htmlFor="batchSize">Batch Size</label>
      <input
        className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%]"
        id="batchSize"
        type="number"
        value={batchDetails.batchSize}
        onChange={(e) => handleBatchDetails(e, "batchSize")}
        onFocus={(e) => e.target.select()}
      />
      <label htmlFor="trialBatchUnits">Units</label>
      <select
        className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%]"
        name="trialBatchUnits"
        id="trialBatchUnits"
        value={batchDetails.units}
        onChange={(e) => handleBatchDetails(e, "units")}
      >
        <option value="gallon">gallon</option>
        <option value="liter">liter</option>
      </select>
      <label htmlFor="sampleSize">Sample Size</label>
      <input
        className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%]"
        id="sampleSize"
        type="number"
        value={batchDetails.sampleSize}
        onChange={(e) => handleBatchDetails(e, "sampleSize")}
        onFocus={(e) => e.target.select()}
      />
      <label htmlFor="concentration">Concentration</label>
      <input
        className="bg-sidebar text-center rounded-xl border-solid border-2 border-textColor w-[80%] mb-[4rem]"
        id="concentration"
        type="number"
        value={batchDetails.stockSolutionConcentration}
        onChange={(e) => handleBatchDetails(e, "stockSolutionConcentration")}
        onFocus={(e) => e.target.select()}
      />
      <Trials batchDetails={batchDetails} />
    </form>
  );
}
