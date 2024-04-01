"use client";

import { ChangeEvent } from "react";

interface Props {
  rol: string;
  handleOptionChange: (state: string) => any;
}

export const RadioButton = ({ rol, handleOptionChange }: Props) => {
  const toggleRadio = (e: ChangeEvent<HTMLInputElement>) => {
    handleOptionChange(e.target.value);
  };

  return (
    <div className="flex h-[40px] w-full place-items-center justify-center">
      <div className="flex justify-center items-center w-[25rem] grid-cols-4 gap-2 rounded-xl bg-gray-200 p-2">
        <div className="w-36">
          <input
            onChange={toggleRadio}
            type="radio"
            name="option"
            id="mentee"
            value="mentee"
            className="peer hidden"
            checked={rol === "mentee"}
          />
          <label
            htmlFor="mentee"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-principal-1 peer-checked:font-semibold peer-checked:text-black"
          >
            mentee
          </label>
        </div>

        <div className="w-36">
          <input
            onChange={toggleRadio}
            type="radio"
            name="option"
            id="mentor"
            value="mentor"
            className="peer hidden"
            checked={rol === "mentor"}
          />
          <label
            htmlFor="mentor"
            className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-principal-1 peer-checked:font-semibold peer-checked:text-black"
          >
            mentor
          </label>
        </div>
      </div>
    </div>
  );
};
