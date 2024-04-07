import Title from "../../Title";
import { toBrix } from "../../../helpers/unitConverters";
import { useState } from "react";
import useAbv from "../../../hooks/useAbv";
import AbvLine from "../../AbvLine";

export default function AbvCalculator() {
  const [inputValues, setInputValues] = useState([1, 1]);
  const abv = useAbv({ OG: inputValues[0], FG: inputValues[1] });
  const inputArr = ["OG", "FG"];

  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8">
      <Title header="ABV Calculator" />
      {inputArr.map((item, index) => {
        const brix = toBrix(inputValues[index]);
        return (
          <div key={index}>
            <label htmlFor={item} className="text-center mx-2 my-2">
              Enter {item}:
            </label>
            <input
              type="number"
              id={item}
              step="0.001"
              value={inputValues[index]}
              onChange={(e) => {
                setInputValues(
                  inputValues.map((value, i) =>
                    index === i ? Number(e.target.value) : value
                  )
                );
              }}
              onFocus={(e) => e.target.select()}
              className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
            />
            <p>{Math.round(brix * 100) / 100} Brix</p>
          </div>
        );
      })}
      <AbvLine {...abv} />
    </div>
  );
}
