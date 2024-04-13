import { Dispatch, SetStateAction, FormEvent } from "react";
import { FormData } from "./NutrientCalc";
import Title from "../Title";
// import useMaxGpl from "../../helpers/useMaxGpl";
import useChangeLogger from "../../hooks/useChangeLogger";

export default function NutrientCalcResults({
  gplArr,
  setGplArr,
}: Partial<FormData> & {
  setData: Dispatch<SetStateAction<FormData>>;
  gplArr: number[];
  setGplArr: Dispatch<SetStateAction<number[]>>;
}) {
  const handleChange = (e: FormEvent, index: number) =>
    setGplArr((prev) => {
      const target = e.target as HTMLInputElement;
      const copy = [...prev];
      copy[index] = Number(target.value);
      return copy;
    });

  useChangeLogger(gplArr);

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
          >
            <option value="Go-Ferm">Go-Ferm</option>
            <option value="protect">Go-Ferm Protect</option>
            <option value="sterol-flash">Go-Ferm Sterol Flash</option>
            <option value="none">None</option>
          </select>
        </label>

        <label className="my-[.25rem]" htmlFor="maxGpl">
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
          />
          <input
            type="number"
            name="fermKgpl"
            id="fermKgpl"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={gplArr[1]}
            onChange={(e) => handleChange(e, 1)}
          />
          <input
            type="number"
            name="DapGpl"
            id="DapGpl"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            value={gplArr[2]}
            onChange={(e) => handleChange(e, 2)}
          />
        </div>
        <p>{`${0}g`}</p>
        <label className="my-[.25rem]" htmlFor="gplToAdd">
          g/L to add
        </label>
        <div className="col-span-3 grid grid-cols-3" id="gplToAdd">
          <p>{0}</p>
          <p>{0}</p>
          <p>{0}</p>
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
            defaultValue={0}
          />
          <input
            type="number"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            defaultValue={0}
          />
          <input
            type="number"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
            defaultValue={0}
          />
        </div>
        <p>{`${0}ml`}</p>
        <label className="my-[.25rem]" htmlFor="totalGrams">
          Total Grams
        </label>
        <div className="col-span-3 grid grid-cols-3" id="totalGrams">
          <p>{`${0}g`}</p>
          <p>{`${0}g`}</p>
          <p>{`${0}g`}</p>
        </div>
        <label className="my-[.25rem]" htmlFor="oneThird">
          1/3 Sugar Break
        </label>
        <label className="my-[.25rem]" htmlFor="perAddition">
          Amount per Addition
        </label>
        <div className="col-span-3 grid grid-cols-3" id="perAddition">
          <p>{`${0}g`}</p>
          <p>{`${0}g`}</p>
          <p>{`${0}g`}</p>
        </div>
        <p>{1.0}</p>
        <label htmlFor="totalYan" className="col-span-3 my-[.25rem]">
          Total YAN
          <p>{`${0}PPM`}</p>
        </label>
        <label htmlFor="remainingYan" className="col-span-2 my-[.25rem]">
          Remaining YAN
          <p>{`${0}PPM`}</p>
        </label>
      </form>
    </div>
  );
}
