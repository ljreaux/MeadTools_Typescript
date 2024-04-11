import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import { FormData } from "./NutrientCalc";
import Title from "../Title";
import FirstLineInputs from "./FirstLineInputs";
import useChangeLogger from "../../hooks/useChangeLogger";
import useTargetYan from "../../hooks/useTargetYan";
import useYeastAmount from "../../hooks/yeastAmount";

export interface YeastType {
  Lalvin: Yeast[];
  Fermentis: Yeast[];
  MangroveJack: Yeast[];
  RedStar: Yeast[];
  Other: Yeast[];
}
type Yeast = {
  name: string;
  NitrogenRequirement: string;
  ABVTolerance: number | string;
  LowTemp: number;
  HighTemp: number;
};

export default function MainInputs({
  yeasts,
  selected,
  inputs,
  maxGpl,
  setData,
}: Partial<FormData> & {
  setData: Dispatch<SetStateAction<FormData>>;
}) {
  const handleSelected = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLFormElement;
    setData((prev) => ({
      ...prev,
      selected: { ...prev.selected, [target.name]: target.value },
    }));
  };

  const handleChange = (e: FormEvent<EventTarget>) => {
    const target = e.target as HTMLFormElement;
    setData((prev) => ({
      ...prev,
      inputs: { ...prev.inputs, [target.name]: Number(target.value) },
    }));
  };

  useChangeLogger(inputs);
  useEffect(() => {
    const yeastDetails = yeasts[selected.yeastBrand].find(
      (yeast) => yeast.name === selected.yeastStrain
    );
    setData((prev) => {
      return {
        ...prev,
        selected: {
          ...prev.selected,
          yeastDetails: { ...yeastDetails },
          n2Requirement: yeastDetails.NitrogenRequirement,
        },
      };
    });
  }, [selected.yeastBrand, selected.yeastStrain]);

  const { target } = useTargetYan(
    selected?.n2Requirement,
    inputs?.sg,
    inputs?.offset
  );

  const { yeastAmount, setYeastAmount } = useYeastAmount(
    inputs?.volume,
    inputs?.sg,
    selected?.volumeUnits
  );

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      outputs: {
        targetYan: target.target,
        yeastAmount,
      },
    }));
  }, [target, yeastAmount]);

  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8 aspect-video">
      <Title header="Nutrient Calculator" />
      <form action="" className="grid grid-cols-5 justify-center text-center">
        <label htmlFor="yeastBrand">Yeast Brand</label>
        <label htmlFor="yeastStrain">Yeast Strain</label>
        <div>
          <label htmlFor="volume">Volume</label>
          <select
            onChange={handleSelected}
            value={selected.volumeUnits}
            name="volumeUnits"
            id="volumeUnits"
            className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
          >
            <option value="gal">Gallons</option>
            <option value="liter">Liters</option>
          </select>
        </div>
        <label htmlFor="specificGravity">Specific Gravity</label>
        <label htmlFor="offsetPpm">Offset PPM</label>
        <select
          onChange={(e) =>
            setData((prev) => {
              const target = e.target as HTMLSelectElement;
              return {
                ...prev,
                selected: {
                  ...prev.selected,
                  [e.target.name]: e.target.value,
                  yeastStrain: yeasts[target.value][0].name,
                },
              };
            })
          }
          name="yeastBrand"
          id="yeastBrand"
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
        >
          {Object.keys(yeasts).map((yeast) => {
            const name = yeast.replace(/([A-Z])/g, " $1").trim();
            return (
              <option key={yeast} value={yeast}>
                {name}
              </option>
            );
          })}
        </select>
        <select
          value={selected.yeastStrain}
          onChange={handleSelected}
          name="yeastStrain"
          id="yeastStrain"
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
        >
          {yeasts[selected.yeastBrand].map((yeast) => (
            <option key={yeast.name} value={yeast.name}>
              {yeast.name}
            </option>
          ))}
        </select>
        <FirstLineInputs inputs={inputs} handleChange={handleChange} />

        <label htmlFor="n2Requirement">Nitrogen Requirement</label>
        <label htmlFor="schedule">Preferred Schedule</label>
        <label htmlFor="targetYan">Target YAN</label>
        <label htmlFor="numberOfAdditions">Number of Additions</label>
        <label htmlFor="yeastAmount">Yeast Amount (g)</label>

        <select
          name="n2Requirement"
          id="n2Requirement"
          value={selected.n2Requirement}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
          onChange={handleSelected}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
        </select>

        <select
          name="schedule"
          id="schedule"
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
        >
          {Object.keys(maxGpl).map((key) => {
            return (
              <option key={key} value={maxGpl[key].name}>
                {maxGpl[key].name}
              </option>
            );
          })}
        </select>
        <p id="targetYan">{target.targetString}</p>
        <select
          value={inputs?.numberOfAdditions}
          onChange={handleChange}
          name="numberOfAdditions"
          id="numberOfAdditions"
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <input
          type="number"
          value={yeastAmount}
          onChange={(e) => setYeastAmount(Number(e.target.value))}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-11/12 my-2"
        />
      </form>
    </div>
  );
}
