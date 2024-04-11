import { Dispatch, SetStateAction } from "react";
import { FormData } from "./NutrientCalc";
import Title from "../Title";

export default function NutrientCalcResults({maxGpl, selected}: Partial<FormData> & {
  setData: Dispatch<SetStateAction<FormData>>;
}) {
    const {schedule} = selected;
  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <Title header="Nutrient Calculator Results" />
      <form action="" className="grid grid-cols-5 justify-center text-center">
        <label htmlFor="maxGpl">Max g/L</label>
        <div className="col-span-3" id="maxGpl">
          <input type="number" name="fermOgpl" id="fermOgpl" />
          <input type="number" name="fermKgpl" id="fermKgpl" />
          <input type="number" name="DapGpl" id="DapGpl" />
        </div>
      </form>
    </div>
  );
}
