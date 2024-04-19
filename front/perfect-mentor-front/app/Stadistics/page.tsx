import { NavbarInferior, NavbarLateral } from "../components";

export const metadata = {
  title: "Stadistics Page",
  description:
    "Pagina donde se puede ver las estadisticas de los usuarios, cantidad de matchs, cuantos usuarios tiene la pagina, etc....",
};
export default function StadisticsPage() {
  return (
    <div className="flex flex-col  bg-principal-2 md:w-[1289px] md:h-[860px] md:z-50 md:top-[41px] md:left-[299px] md:absolute md:rounded-3xl ">
      <div className="bg-principal-1 h-[137px] w-full relative rounded-br-[3.5rem] md:absolute  md:bg-principal-2 md:rounded-3xl">
        <div className="absolute top-6 left-7 md:top-8 md:left-24">
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">Stadistics</h1>
          <h3 className="text-sm font-normal leading-5 text-principal-3">Check all the activity of you page</h3>
        </div>
      </div>
      {/*Parte del medio*/}
      <div className="relative bg-white w-[355px] min-h-[641px] max-h-[641px] m-auto mt-9 pt-3 flex flex-col overflow-y-auto md:rounded-3xl md:w-[1235px] md:h-[700px] md:max-h-[686px] md:top-[5.5rem] md:left-2 md:pt-[4.75rem] rounded-3xl">
        <div className="absolute top-6 left-[15px] flex gap-2 md:top-[5.5rem] md:left-[63px] md:gap-28">
          <div className="w-[160px] h-[141px] rounded-2xl bg-gray-200 md:w-[500px] md:h-[197px] flex flex-col gap-1 md:gap-3">
            <h2 className="text-base my-1 mx-2 md:text-2xl md:my-2 md:mx-3 font-semibold">TOTAL OF USERS</h2>
            <div className="text-sm md:text-lg flex justify-between items-center ml-7 mr-7">
              <span className="font-semibold ">Mentees</span>
              <span>750</span>
            </div>
            <div className="border-b-2 h-1 bg-slate-300" />
            <div className="text-sm md:text-lg flex justify-between items-center ml-7 mr-7">
              <span className="font-semibold">Mentor</span>
              <span>750</span>
            </div>
            <div className="border-b-2 h-1 bg-slate-300" />
            <div className="text-sm md:text-lg flex ml-3 mr-3 justify-between items-center">
              <span className="font-semibold">Total of Users</span>
              <span>233</span>
            </div>
          </div>
          <div className="w-[160px] h-[141px] rounded-2xl bg-gray-200 md:w-[500px] md:h-[197px] flex flex-col gap-1 md:gap-3">
            <h2 className="text-base my-1 mx-2 md:text-2xl md:my-2 md:mx-3 font-semibold">TOTAL OF USERS</h2>
            <div className="text-sm md:text-lg flex justify-between items-center ml-7 mr-7">
              <span className="font-semibold ">Mentees</span>
              <span>750</span>
            </div>
            <div className="border-b-2 h-1 bg-slate-300" />
            <div className="text-sm md:text-lg flex justify-between items-center ml-7 mr-7">
              <span className="font-semibold">Mentor</span>
              <span>750</span>
            </div>
            <div className="border-b-2 h-1 bg-slate-300" />
            <div className="text-sm md:text-lg flex ml-3 mr-3 justify-between items-center">
              <span className="font-semibold">Total of Users</span>
              <span>233</span>
            </div>
          </div>
        </div>
      </div>
      {/*Navbar inferior*/}
      <NavbarInferior />
      {/*Navbar lateral*/}
      <NavbarLateral />
    </div>
  );
}
