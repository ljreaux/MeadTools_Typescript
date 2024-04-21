import { Dispatch, SetStateAction } from "react";
import Title from "../Title";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";

export default function Notes({
  primaryNotes,
  setPrimaryNotes,
  secondaryNotes,
  setSecondaryNotes,
}: {
  primaryNotes: string[][];
  secondaryNotes: string[][];
  setPrimaryNotes: Dispatch<SetStateAction<string[][]>>;
  setSecondaryNotes: Dispatch<SetStateAction<string[][]>>;
}) {
  function addNewNote(type: "primary" | "secondary") {
    type === "primary" && setPrimaryNotes((prev) => [...prev, ["", ""]]);
    type === "secondary" && setSecondaryNotes((prev) => [...prev, ["", ""]]);
  }

  function removeNote(type: "primary" | "secondary", index: number) {
    type === "primary" &&
      setPrimaryNotes((prev) => prev.filter((_, i) => i !== index));
    type === "secondary" &&
      setSecondaryNotes((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form className="w-11/12 flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 mb-8 mt-24 aspect-video gap-4">
      <Title header="Add Notes" />
      <label htmlFor="primaryNotes">Primary Notes</label>
      <div className="grid grid-cols-notes gap-4 w-full ml-8">
        <label htmlFor="Note" className="col-start-2">
          Note
        </label>
        <label htmlFor="details" className="col-start-3">
          Date, Gravity, etc.
        </label>
      </div>
      {primaryNotes.map((note, index) => {
        return (
          <div
            id="primaryNotes"
            className="grid grid-cols-notes w-full gap-4 items-center justify-center"
          >
            <p className="h-full text-start">{index + 1}.</p>
            <textarea
              value={note[0]}
              placeholder="Add Note Here"
              className="h-20 bg-background text-left text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background my-2 disabled:bg-sidebar
        disabled:cursor-not-allowed"
              onChange={(e) => {
                setPrimaryNotes((prev) => {
                  return prev.map((_, i) =>
                    i === index ? [e.target.value, prev[i][1]] : prev[i]
                  );
                });
              }}
            />
            <textarea
              value={note[1]}
              placeholder="Add Note Here"
              className="h-20 bg-background text-left text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background my-2 disabled:bg-sidebar
        disabled:cursor-not-allowed"
              onChange={(e) => {
                setPrimaryNotes((prev) => {
                  return prev.map((_, i) =>
                    i === index ? [prev[i][0], e.target.value] : prev[i]
                  );
                });
              }}
            />
            {index > 0 && (
              <button
                className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2 h-fit"
                type="button"
                onClick={() => removeNote("primary", index)}
              >
                <FaMinusSquare />
              </button>
            )}
          </div>
        );
      })}
      {primaryNotes.length < 10 && (
        <button
          className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2"
          type="button"
          onClick={() => addNewNote("primary")}
        >
          <FaPlusSquare />
        </button>
      )}
      <label htmlFor="secondaryNotes">Secondary Notes</label>
      <div className="grid grid-cols-notes gap-4 w-full ml-8">
        <label htmlFor="Note" className="col-start-2">
          Note
        </label>
        <label htmlFor="details" className="col-start-3">
          Date, Gravity, etc.
        </label>
      </div>
      {secondaryNotes.map((note, index) => {
        return (
          <div
            id="secondaryNotes"
            className="grid grid-cols-notes w-full gap-4 items-center justify-center"
          >
            <p className="h-full text-start">{index + 1}.</p>
            <textarea
              value={note[0]}
              placeholder="Add Note Here"
              className="h-20 bg-background text-left text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background my-2 disabled:bg-sidebar
        disabled:cursor-not-allowed"
              onChange={(e) => {
                setSecondaryNotes((prev) => {
                  return prev.map((_, i) =>
                    i === index ? [e.target.value, prev[i][1]] : prev[i]
                  );
                });
              }}
            />
            <textarea
              value={note[1]}
              placeholder="Add Note Here"
              className="h-20 bg-background text-left text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background my-2 disabled:bg-sidebar
        disabled:cursor-not-allowed"
              onChange={(e) => {
                setSecondaryNotes((prev) => {
                  return prev.map((_, i) =>
                    i === index ? [prev[i][0], e.target.value] : prev[i]
                  );
                });
              }}
            />
            {index > 0 && (
              <button
                className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2 h-fit"
                type="button"
                onClick={() => removeNote("secondary", index)}
              >
                <FaMinusSquare />
              </button>
            )}
          </div>
        );
      })}
      {secondaryNotes.length < 10 && (
        <button
          className="border-2 border-solid border-textColor  hover:bg-sidebar hover:border-background md:text-lg py-1 disabled:bg-sidebar disabled:hover:border-textColor disabled:hover:text-sidebar disabled:cursor-not-allowed bg-background rounded-2xl px-2"
          type="button"
          onClick={() => addNewNote("secondary")}
        >
          <FaPlusSquare />
        </button>
      )}
    </form>
  );
}
