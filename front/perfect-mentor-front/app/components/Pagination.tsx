"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
interface Props {
  totalPages: number;
  prevPage: number | null;
  nextPage: number | null;
  setPage: Dispatch<SetStateAction<number>>;
}

export const Pagination = ({ totalPages, prevPage, nextPage, setPage }: Props) => {
  const paginado = Array.from({ length: totalPages }, (x, index) => index + 1);
  const paginadoMobile = totalPages > 5 ? paginado.slice(0, 5) : paginado;

  return (
    <div className="absolute md:bottom-0 md:left-12 bottom-24 left-6 md:max-w-[1241px] ">
      <div className="cursor-pointer  inline-flex border border-[#e4e4e4] bg-white p-4 rounded-xl">
        <ul className={``}>
          {/* Paginado mobile */}

          <div className="md:hidden flex items-center">
            <li className="px-[6px]">
              <div
                onClick={() => prevPage && setPage(prevPage)}
                className={`${
                  prevPage ? "opacity-100" : "opacity-0"
                } w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white`}
              >
                <FaArrowLeft />
              </div>
            </li>
            {paginadoMobile.map((pagina, index) => (
              <li key={index} className="px-[6px]">
                <div
                  onClick={() => setPage(pagina)}
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
                >
                  {pagina}
                </div>
              </li>
            ))}
            <li className="px-[6px]">
              <div
                onClick={() => nextPage && setPage(nextPage)}
                className={`${
                  nextPage ? "" : "opacity-0"
                } w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white`}
              >
                <FaArrowRight />
              </div>
            </li>
          </div>
          {/*Desktop Paginado  */}
          <div
            className={`${paginado.length > 23 ? "md:flex-wrap" : ""}  hidden md:flex md:items-center md:-mx-[6px] `}
          >
            <li className="px-[6px]">
              <div
                onClick={() => prevPage && setPage(prevPage)}
                className={`${
                  prevPage ? "" : "opacity-0"
                } w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white`}
              >
                <FaArrowLeft />
              </div>
            </li>

            {paginado.map((pagina, index) => (
              <li key={index} className="px-[6px]">
                <div
                  onClick={() => setPage(pagina)}
                  className="w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white"
                >
                  {pagina}
                </div>
              </li>
            ))}
            <li className="px-[6px]">
              <div
                onClick={() => nextPage && setPage(nextPage)}
                className={`${
                  nextPage ? "" : "opacity-0"
                } w-9 h-9 flex items-center justify-center rounded-md border border-[#EDEFF1] text-[#838995] text-base hover:bg-primary hover:border-primary hover:text-white`}
              >
                <FaArrowRight />
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};
