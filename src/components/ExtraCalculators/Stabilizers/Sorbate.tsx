import { FormEvent, useState } from "react";
import Title from "../../Title";

export default function Sorbate() {
  const [sorbate, setSorbate] = useState({
    batchSize: 1,
    units: "gallons",
    abv: 12,
  });

  const sorbateAmount =
    sorbate.units === "gallons"
      ? ((-sorbate.abv * 25 + 400) / 0.75) * sorbate.batchSize * 0.003785411784
      : (((-sorbate.abv * 25 + 400) / 0.75) * sorbate.batchSize) / 1000;

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setSorbate((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  };
  return (
    <div>
      <Title header="Sorbate Addition Calculator" />
      <label htmlFor="batchSize">Batch Size: </label>
      <input
        type="number"
        id="batchSize"
        onFocus={(e) => e.target.select()}
        onChange={handleChange}
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
      />
      <select
        name="units"
        id="units"
        onChange={handleChange}
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
      >
        <option value="gallons">Gallons</option>
        <option value="liters">Liters</option>
      </select>
      <label htmlFor="abv">ABV: </label>
      <input
        id="abv"
        type="number"
        onFocus={(e) => e.target.select()}
        onChange={handleChange}
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
      />
      <p>{Math.round(sorbateAmount * 1000) / 1000}g k-sorbate</p>
    </div>
  );
}
