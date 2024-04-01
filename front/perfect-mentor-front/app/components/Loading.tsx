import Image from "next/image";
import Saly2 from "../assets/Saly-2.png";

export const Loading = () => {
  return (
    <>
      <div className="absolute -top-24 z-[6000] left-0 h-screen w-full flex flex-col justify-center items-center bg-principal-1">
        <Image width={400} height={500} src={Saly2} alt="Imagen Error 404" loading="lazy" />
        <div className="mt-5">
          <div className="relative inline-block text-sm font-medium text-principal-2 group active:text-principal-4 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-principal-2 group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span className="relative block px-8 py-3 bg-principal-3 border border-current font-extrabold">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-principal-1"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)] text-white">
                  Loading...
                </span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
