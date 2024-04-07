import { useState } from "react";
import Title from "../../Title";
import useAbv from "../../../hooks/useAbv";
import { toBrix } from "../../../helpers/unitConverters";
import AbvLine from "../../AbvLine";

interface Gravity {
  fgh: number;
  fgr: number;
}

export default function EstimatedOG() {
  const [gravity, setGravity] = useState<Gravity>({
    fgh: 1.0,
    fgr: 5,
  });

  const estOG =
    Math.round((-1.728 * gravity.fgh + 0.01085 * gravity.fgr + 2.728) * 1000) /
    1000;
  const abv = useAbv({ OG: estOG, FG: gravity.fgh });
  return (
    <div className="w-11/12 sm:w-9/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8">
      <Title header="Estimated OG Without Reading" />
      <label className="text-center mx-2 my-2" htmlFor="hydrometerFG">
        Enter Hydrometer FG:{" "}
      </label>
      <input
        value={gravity.fgh}
        onChange={(e) =>
          setGravity((prev) => ({ ...prev, fgh: Number(e.target.value) }))
        }
        type="number"
        id="hydrometerFG"
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        onFocus={(e) => e.target.select()}
      />
      <label className="text-center mx-2 my-2" htmlFor="refractometerFG">
        Enter Refractometer FG:{" "}
      </label>
      <input
        value={gravity.fgr}
        onChange={(e) =>
          setGravity((prev) => ({ ...prev, fgr: Number(e.target.value) }))
        }
        type="number"
        id="refractometerFG"
        className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background w-1/4"
        onFocus={(e) => e.target.select()}
      />
      <p>Estimated OG: {estOG}</p>
      <p>{Math.round(toBrix(estOG) * 100) / 100} Brix</p>
      <AbvLine {...abv} />
    </div>
  );
}
