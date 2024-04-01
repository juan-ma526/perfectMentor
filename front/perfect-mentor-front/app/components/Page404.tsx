import Link from "next/link";

export const Page404 = () => {
  return (
    <div className="absolute z-[666] w-screen -top-[173px] md:-top-[229px] md:-left-[350px] h-screen md:w-[1900px] flex flex-col justify-center items-center bg-principal-1">
      <h1 className="text-9xl font-extrabold text-principal-3 tracking-widest">404</h1>
      <div className="bg-principal-1 px-2 text-sm rounded rotate-12 absolute">Page Not Found</div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-principal-1 group active:text-principal-4 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-principal-2 group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-principal-3 border border-current">
            <Link href="/">Go Home</Link>
          </span>
        </div>
      </button>
    </div>
  );
};
