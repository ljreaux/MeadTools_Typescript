import { useState, FormEvent, useEffect } from "react";
import { toBrix, toSG } from "../../../helpers/unitConverters";
import Title from "../../Title";
import useAbv from "../../../hooks/useAbv";
import refracCalc from "../../../helpers/refracCalc";
import AbvLine from "../../AbvLine";

export default function Refractometer() {
  const [refrac, setRefrac] = useState({
    cf: 1,
    og: 1.1,
    units: "SG",
    fgInBrix: 8.5,
    fgInSg: Math.round(toSG(8.5) * 100) / 100,
    calcBrix: 0,
    calcSg: Math.round(toSG(0) * 100) / 100,
  });

  const og = refrac.units === "SG" ? refrac.og : toSG(refrac.og);

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    setRefrac((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleUnitChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement;
    const unit = target.value;
    setRefrac((prev) => ({ ...prev, units: unit }));
  };

  const abv = useAbv({ OG: og, FG: refrac.calcBrix });

  useEffect(() => {
    const { cf: corFac, og, fgInBrix: fgBr, units } = refrac;

    let actualFg = refracCalc(og, corFac, fgBr);
    if (units == "SG") actualFg = refracCalc(toBrix(og), corFac, fgBr);

    setRefrac((prev) => ({
      ...prev,
      calcSg: actualFg,
      calcBrix: toBrix(actualFg),
    }));
  }, [refrac.cf, refrac.og, refrac.fgInBrix, refrac.units]);

  return (
    <form className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8">
      <Title header="Refractometer Correction Calculator" />
      <label htmlFor="cf">Correction Factor: </label>
      <input
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        type="number"
        name="cf"
        id="cf"
        value={refrac.cf}
        onChange={handleChange}
      />
      <label htmlFor="og">Enter OG: </label>
      <select
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        name="units"
        id="units"
        onChange={handleUnitChange}
      >
        <option value="SG">SG</option>
        <option value="Brix">Brix</option>
      </select>
      <input
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        type="number"
        name="og"
        id="og"
        value={refrac.og}
        onChange={handleChange}
      />
      <label htmlFor="fg">Enter FG in Brix: </label>
      <input
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        type="number"
        name="fg"
        id="fg"
        value={refrac.fgInBrix}
        onChange={handleChange}
      />
      <p>{Math.round(refrac.calcSg * 1000) / 1000}</p>
      <p>{Math.round(refrac.calcBrix * 100) / 100}</p>
      <AbvLine {...abv} />
    </form>
  );
}