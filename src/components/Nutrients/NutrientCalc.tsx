import { useState } from "react";
import useMultistepForm from "../../hooks/useMultistepForm";
import MainInputs, { YeastType } from "./MainInputs";
import { initialData } from "./intialData";
import useChangeLogger from "../../hooks/useChangeLogger";
import NutrientCalcResults from "./NutrientCalcResults";
import useMaxGpl from "../../hooks/useMaxGpl";

interface Selected {
  yeastBrand: string;
  yeastStrain: string;
  yeastDetails: {
    name: string;
    NitrogenRequirement: string;
    ABVTolerance: number | string;
    LowTemp: number;
    HighTemp: number;
  };
  n2Requirement: string;
  volumeUnits: string;
  schedule: keyof FormData["maxGpl"];
}

interface GplEntries {
  name: string;
  value: number[];
}

export interface FormData {
  yeasts: YeastType;
  maxGpl: {
    tbe: GplEntries;
    tosna: GplEntries;
    justK: GplEntries;
    dap: GplEntries;
    oAndk: {
      name: string;
      value: number[][];
    };
    oAndDap: GplEntries;
    kAndDap: GplEntries;
  };
  selected: Selected;
  inputs: {
    volume: number;
    sg: number;
    offset: number;
    numberOfAdditions: number;
  };
  yanContribution: number[];
  outputs: {
    targetYan: number;
    yeastAmount: number;
  };
}

export default function NutrientCalc() {
  const [data, setData] = useState<FormData>({ ...initialData });
  const maxGPL = useMaxGpl(
    data.maxGpl,
    data.selected.schedule,
    data.inputs?.sg
  );
  useChangeLogger(data.outputs);
  const { currentStepIndex, step, next, back, steps } = useMultistepForm([
    <MainInputs {...data} setData={setData} />,
    <NutrientCalcResults {...data} setData={setData} {...maxGPL} />,
  ]);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {step}
      {currentStepIndex > 0 && (
        <button
          className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4"
          onClick={back}
        >
          Back
        </button>
      )}
      {currentStepIndex < steps.length - 1 && (
        <button
          className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4"
          onClick={next}
        >
          Next
        </button>
      )}
    </div>
  );
}
