import { useState, FormEvent } from "react";
import Title from "../../Title";
import useBrixUnitsChange from "../../../hooks/useBrixUnitsChange";
import { toBrix, toSG } from "../../../helpers/unitConverters";

export interface Brix {
  value: number;
  unit: string;
}

export default function Brix() {
  const [brixObj, setBrixObj] = useState<Brix>({
    value: 1,
    unit: "SG",
  });

 const handleUnitChange= (e: FormEvent<EventTarget>) =>{
    const target = e.target as HTMLInputElement;
    const unit = target.value;
    console.log(unit);
    setBrixObj((prev) => ({ ...prev, unit: unit }));
  }

  useBrixUnitsChange({
    stateObj: brixObj,
    setterFunction: setBrixObj,
    propertyToChange: "value",
  });

  const displayString =
    brixObj.unit === "SG"
      ? `${Math.round(toBrix(brixObj.value) * 100) / 100} Brix`
      : Math.round(toSG(brixObj.value) * 1000) / 1000;

  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8">
      <Title header="Brix Conversion Calculator" />
      <label className="text-center mx-2 my-2" htmlFor="gravity">
        Enter Gravity
      </label>
      <input
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        type="number"
        id="gravity"
        value={brixObj.value}
        onChange={(e) =>
          setBrixObj((prev) => ({ ...prev, value: Number(e.target.value) }))
        }
      />
      <p>{brixObj.unit === "Brix" ? brixObj.unit : null}</p>
      <select
        name="units"
        id="units"
        onChange={handleUnitChange}
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
      >
        <option value="SG">SG</option>
        <option value="Brix">Brix</option>
      </select>
      <p>{displayString}</p>
    </div>
  );
}
