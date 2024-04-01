import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Resorte from "../assets/doodle-5 1.png";
import { GridUsers, NavbarInferior, NavbarLateral } from "../components";
import { Users } from "../interfaces";

const getAllUsers = async (): Promise<Users[]> => {
  const users = await fetch("http://localhost:3001/api/users/allUsers", {
    method: "GET",
    credentials: "include",
    next: {
      revalidate: 60,
    },
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());

  return users;
};

export const metadata = {
  title: "Report Page",
  description: "Pagina para ver los reportes",
};

export default async function ReportPage() {
  const users = await getAllUsers();

  return (
    <div className="flex flex-col  bg-principal-2 md:w-[1289px] md:h-[860px] md:z-50 md:top-[41px] md:left-[299px] md:absolute md:rounded-3xl ">
      <Image
        src={Resorte}
        alt="imagen resorte"
        className="hidden md:inline-block md:absolute md:-top-6 md:right-56 md:z-30"
      />
      <Image
        src={Resorte}
        alt="imagen resorte"
        className="hidden md:inline-block md:absolute md:top-2 md:right-0 md:z-30 md:rotate-90 md:w-[20rem] md:h-[14rem]"
      />
      <div className="bg-principal-1 h-[137px] w-full relative rounded-br-[3.5rem] md:absolute  md:bg-principal-2 md:rounded-3xl">
        <div className="absolute top-6 left-7 md:top-8 md:left-24">
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">Reports</h1>
          <h3 className="text-sm font-normal leading-5 text-principal-3">Check the reports of the users</h3>
        </div>
        <div className="absolute top-28 left-10 flex justify-start md:top-52 md:left-24 md:z-30 md:drop-shadow-lg">
          <BiSearch className="absolute left-3 top-3" size={20} />
          <label htmlFor="search">
            <input
              type="search"
              className="w-[315px] h-[50px] rounded-full border-none pl-10 md:w-[500px]"
              id="search"
            />
          </label>
        </div>
      </div>
      {/*Parte del medio*/}
      <div className="bg-white w-[355px] max-h-[640px] m-auto mt-9 relative pt-3 flex flex-col overflow-y-auto md:rounded-3xl md:w-[1235px] md:h-[700px] md:top-[9.5rem] md:left-6 md:pt-[4.75rem] rounded-3xl">
        <GridUsers users={users} />
      </div>

      {/*Navbar inferior*/}
      <NavbarInferior />
      {/*Navbar lateral*/}
      <NavbarLateral />
    </div>
  );
}
