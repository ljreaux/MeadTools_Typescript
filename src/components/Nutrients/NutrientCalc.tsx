import { useState } from "react";
import useMultistepForm from "../../hooks/useMultistepForm";
import MainInputs, { YeastType } from "./MainInputs";
import { initialData } from "./intialData";
import useChangeLogger from "../../hooks/useChangeLogger";
import NutrientCalcResults from "./NutrientCalcResults";

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
  outputs: {
    targetYan: number;
    yeastAmount: number;
  };
}

export default function NutrientCalc() {
  const [data, setData] = useState<FormData>({ ...initialData });
  useChangeLogger(data.outputs);
  const { currentStepIndex, step, next, back, steps } = useMultistepForm([
    <MainInputs {...data} setData={setData} />,
    <NutrientCalcResults {...data} setData={setData} />,
  ]);

  return (
    <div>
      {step}
      {currentStepIndex > 0 && <button onClick={back}>Back</button>}
      {currentStepIndex < steps.length - 1 && (
        <button onClick={next}>Next</button>
      )}
    </div>
  );
}
