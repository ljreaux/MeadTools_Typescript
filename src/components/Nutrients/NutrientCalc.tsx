import { useEffect, useState } from "react";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import MainInputs, { YeastType } from "./MainInputs";
import { initialData } from "./intialData";
import NutrientCalcResults from "./NutrientCalcResults";
import useMaxGpl from "../../hooks/useMaxGpl";
import AdvancedInputForm from "./AdvancedInputForm";

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
  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    if (advanced) setYanFromSource([0, 0, 0]);
    else setYanFromSource(null);
  }, [advanced]);

  const [yanContribution, setYanContribution] = useState([40, 100, 210]);
  const [yanFromSource, setYanFromSource] = useState<number[] | null>(null);
  const [data, setData] = useState<FormData>({ ...initialData });
  const maxGPL = useMaxGpl(
    data.maxGpl,
    data.selected.schedule,
    data.inputs?.sg
  );

  const { currentStepIndex, step, next, back, steps } = useMultiStepForm([
    <>
      <MainInputs {...data} setData={setData} />{" "}
      <button
        onClick={() => setAdvanced((prev) => !prev)}
        className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4"
      >
        Advanced Nutrition
      </button>
      {advanced && (
        <AdvancedInputForm
          advanced={advanced}
          yanFromSource={yanFromSource}
          setYanFromSource={setYanFromSource}
          yanContribution={yanContribution}
          setYanContribution={setYanContribution}
        />
      )}{" "}
    </>,
    <NutrientCalcResults
      {...data}
      {...maxGPL}
      yanFromSource={yanFromSource}
      advanced={advanced}
    />,
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
          className="hover:bg-background rounded-2xl border-2 border-solid hover:border-textColor  bg-sidebar border-background md:text-lg text-base px-2 py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed w-1/4 mb-[3rem]"
          onClick={() => {
            setData((prev) => ({
              ...prev,
              yanContribution,
            }));
            next();
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}
