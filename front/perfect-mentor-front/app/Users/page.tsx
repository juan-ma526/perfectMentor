import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Resorte from "../assets/doodle-5 1.png";
import { Users } from "../interfaces";
import { GridUsers, NavbarInferior, NavbarLateral, Pagination } from "../components";

export const metadata = {
  title: "Users Page",
  description: "Page with all Users",
};

const getAllUsers = async (): Promise<Users[]> => {
  const users = await fetch("http://localhost:3001/api/users/allUsers", {
    method: "GET",
    credentials: "include",
    next: {
      revalidate: 0,
    },
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());

  return users;
};

export default async function UsersPage() {
  const users = await getAllUsers();

  /* const handleUserDestination = async (id: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/match/createMatch", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idUserDestination: id,
          user: {
            id: user?.id,
            username: user?.username,
            email: user?.email,
            password: user?.password,
            age: user?.age,
            status: user?.status,
            rol: user?.rol,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
          },
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <div className="flex flex-col md:mb-0  bg-principal-2 md:w-[1289px] md:h-[860px] md:z-50 md:top-[41px] md:left-[299px] md:absolute md:rounded-3xl ">
      <Image
        src={Resorte}
        alt="imagen resorte"
        className="hidden md:inline-block md:absolute md:-top-6 md:right-56 md:z-30"
      />
      <Image
        src={Resorte}
        alt="imagen resorte"
        className="hidden md:inline-block md:absolute md:top-2 md:right-0 md:z-30 md:rotate-90 md:w-[10rem] md:h-[20rem]"
      />
      <div className="bg-principal-1 h-[137px] w-full relative rounded-br-[3.5rem] md:absolute  md:bg-principal-2 md:rounded-3xl">
        <div className="absolute top-6 left-7 md:top-8 md:left-24">
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">Users</h1>
          <h3 className="text-sm font-normal leading-5 text-principal-3">View all the users</h3>
        </div>
        <div className="absolute top-28 left-10 flex justify-start md:hidden">
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
      <div className="bg-white min-h-[530px] md:min-h-[576px] w-[355px] m-auto mt-14 relative flex flex-col  md:rounded-3xl md:w-[1235px]  md:top-[9.5rem] md:left-6 mb-[91px]">
        {/* Aca va el arreglo filtrado*/}
        <GridUsers users={users} />
      </div>
      <Pagination />
      {/*Navbar inferior*/}
      <NavbarInferior />
      {/*Navbar lateral*/}
      <NavbarLateral />
    </div>
  );
}
