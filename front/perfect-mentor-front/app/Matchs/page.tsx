import { NavbarInferior, NavbarLateral } from "../components";
import { Chat } from "../components";

export const metadata = {
  title: "Matchs Page",
  description: "Pagina para ver los reportes",
};

export default async function ReportPage() {
  return (
    <div className="flex flex-col  bg-principal-2 md:w-[1289px] md:h-[860px] md:z-50 md:top-[41px] md:left-[299px] md:absolute md:rounded-3xl ">
      {/*Parte del medio*/}
      <div className="bg-white w-[365px] min-h-[778px] max-h-[778px] m-auto mt-9 relative pt-3 flex flex-col overflow-y-auto md:rounded-3xl md:w-[1235px] md:h-[700px] md:top-2 md:-left-2 md:pt-[4.75rem] rounded-3xl">
        <Chat />
      </div>
      {/*Navbar inferior*/}
      <NavbarInferior />
      {/*Navbar lateral*/}
      <NavbarLateral />
    </div>
  );
}
