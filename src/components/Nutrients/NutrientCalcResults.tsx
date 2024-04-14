import { Dispatch, SetStateAction, FormEvent, useState } from "react";
import { FormData } from "./NutrientCalc";
import Title from "../Title";
// import useMaxGpl from "../../helpers/useMaxGpl";
import useChangeLogger from "../../hooks/useChangeLogger";
import useYanCalc from "../../hooks/useYanCalc";

export default function NutrientCalcResults({
  gplArr,
  yanContribution,
  inputs,
  selected,
  outputs,
  setGplArr,
  setData,
}: {
  gplArr: number[];
  yanContribution: FormData["yanContribution"];
  inputs: FormData["inputs"];
  selected: FormData["selected"];
  outputs: FormData["outputs"];
  setGplArr: Dispatch<SetStateAction<number[]>>;
  setData: Dispatch<SetStateAction<FormData>>;
}) {
  const [editable, setEditable] = useState(false);
  const [gfType, setGfType] = useState("Go-Ferm");
  const handleChange = (e: FormEvent, index: number) =>
    setGplArr((prev) => {
      const target = e.target as HTMLInputElement;
      const copy = [...prev];
      copy[index] = Number(target.value);
      return copy;
    });

  const { nutrients, setNutrients } = useYanCalc(
    inputs.volume,
    selected.volumeUnits,
    outputs.targetYan,
    gfType,
    yanContribution,
    gplArr,
    inputs.numberOfAdditions
  );

  useChangeLogger(nutrients);
  function handleYanContribution(
    e: FormEvent<EventTarget>,
    index: number
  ): void {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);
    const newYan = yanContribution.map((item: number, i) =>
      i === index ? value : item
    );
    setData((prev) => ({
      ...prev,
      yanContribution: newYan,
    }));
  }

  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <Title header="Nutrient Calculator Results" />
      <form
        action=""
        className="grid grid-cols-5 justify-center items-center text-center"
      >
        <h2 className="col-start-2">Fermaid O</h2>
        <h2>Fermaid K</h2>
        <h2>DAP</h2>

        <label className="mt-[2.5em]">
          Go Ferm (g)
          <select
            name="go-ferm"
            id="go-ferm"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            onChange={(e) => setGfType(e.target.value)}
          >
            <option value="Go-Ferm">Go-Ferm</option>
            <option value="protect">Go-Ferm Protect</option>
            <option value="sterol-flash">Go-Ferm Sterol Flash</option>
            <option value="none">None</option>
          </select>
        </label>

        <label
          htmlFor="yanContribution"
          className="flex justify-center items-center gap-2"
        >
          Yan Contribution
          <input
            type="checkbox"
            name="editable"
            id="editable"
            className="opacity-60"
            onChange={(e) => setEditable(e.target.checked)}
          />
        </label>
        <div id="yanContribution" className="col-span-3 grid grid-cols-3">
          {yanContribution.map((yan, i) => (
            <input
              key={yan}
              type="number"
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
disabled:cursor-not-allowed"
              value={yan}
              disabled={!editable}
              onChange={(e) => handleYanContribution(e, i)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <p>{`${0}g`}</p>

        <label className="my-[.25rem] col-start-1" htmlFor="maxGpl">
          Max g/L
        </label>
        <div className="col-span-3 grid grid-cols-3" id="maxGpl">
          <input
            type="number"
            name="fermOgpl"
            id="fermOgpl"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={gplArr[0]}
            onChange={(e) => handleChange(e, 0)}
            onFocus={(e) => e.target.select()}
          />
          <input
            type="number"
            name="fermKgpl"
            id="fermKgpl"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={gplArr[1]}
            onChange={(e) => handleChange(e, 1)}
            onFocus={(e) => e.target.select()}
          />
          <input
            type="number"
            name="DapGpl"
            id="DapGpl"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={gplArr[2]}
            onChange={(e) => handleChange(e, 2)}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <label className="my-[.25rem]" htmlFor="goFermWater">
          Water for Go-Ferm
        </label>
        <label className="my-[.25rem]" htmlFor="ppmYan">
          PPM YAN
        </label>
        <div className="col-span-3 grid grid-cols-3" id="ppmYan">
          <input
            type="number"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={nutrients.ppmYan[0]}
            onChange={(e) =>
              setNutrients((prev) => ({
                ...prev,
                ppmYan: [
                  Number(e.target.value),
                  prev.ppmYan[1],
                  prev.ppmYan[2],
                ],
              }))
            }
            onFocus={(e) => e.target.select()}
          />
          <input
            type="number"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={nutrients.ppmYan[1]}
            onFocus={(e) => e.target.select()}
            onChange={(e) =>
              setNutrients((prev) => ({
                ...prev,
                ppmYan: [
                  prev.ppmYan[0],
                  Number(e.target.value),
                  prev.ppmYan[2],
                ],
              }))
            }
          />
          <input
            type="number"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={nutrients.ppmYan[2]}
            onFocus={(e) => e.target.select()}
            onChange={(e) =>
              setNutrients((prev) => ({
                ...prev,
                ppmYan: [
                  prev.ppmYan[0],
                  prev.ppmYan[1],
                  Number(e.target.value),
                ],
              }))
            }
          />
        </div>
        <p>{`${0}ml`}</p>
        <label className="my-[.25rem]" htmlFor="totalGrams">
          Total Grams
        </label>
        <div className="col-span-3 grid grid-cols-3" id="totalGrams">
          {nutrients.totalGrams.map((grams, index) => (
            <input
              key={index}
              value={`${Math.round(grams * 100) / 100}g`}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
              disabled
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <label className="my-[.25rem]" htmlFor="oneThird">
          1/3 Sugar Break
        </label>
        <label className="my-[.25rem]" htmlFor="perAddition">
          Amount per Addition
        </label>
        <div className="col-span-3 grid grid-cols-3" id="perAddition">
          {nutrients.perAddition.map((grams, index) => (
            <input
              key={index}
              value={`${Math.round(grams * 100) / 100}g`}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2 disabled:bg-sidebar
            disabled:cursor-not-allowed"
              disabled
            />
          ))}
        </div>
        <p>{1.0}</p>
        <label htmlFor="totalYan" className="col-span-3 my-[.25rem]">
          Total YAN
          <p>{`${Math.round(nutrients.totalYan)}PPM`}</p>
        </label>
        <label htmlFor="remainingYan" className="col-span-2 my-[.25rem]">
          Remaining YAN
          <p>{`${Math.round(nutrients.remainingYan)}PPM`}</p>
        </label>
      </form>
    </div>
  );
}
