"use client";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const Pagination = () => {
  return (
    <div className="absolute md:bottom-0 md:left-12 bottom-24 left-14">
      <div className="cursor-pointer inline-flex border border-[#e4e4e4] bg-white p-4 rounded-xl">
        <ul className="flex items-center -mx-[6px]">
          <li className="px-[6px]">
            <div className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white">
              <FaArrowLeft />
            </div>
          </li>
          <li className="px-[6px]">
            <div
              onClick={() => console.log("click")}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
            >
              1
            </div>
          </li>
          <li className="px-[6px]">
            <div className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white">
              2
            </div>
          </li>
          <li className="px-[6px]">
            <div className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white">
              3
            </div>
          </li>
          <li className="px-[6px]">
            <div className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white">
              4
            </div>
          </li>
          <li className="px-[6px]">
            <div className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white">
              <FaArrowRight />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
