import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Resorte from "../assets/doodle-5 1.png";
import { GridNotifications, NavbarInferior, NavbarLateral } from "../components";
import { Notifications } from "../interfaces";

const getAllNotifications = async (): Promise<Notifications[]> => {
  const notifications = await fetch(`http://localhost:3001/api/notification/allNotifications`, {
    method: "GET",
    credentials: "include",
    next: {
      revalidate: 0,
    },
    headers: {
      "Content-type": "application/json",
    },
  }).then((res) => res.json());

  return notifications;
};

export const metadata = {
  title: "Matchs Page",
  description: "Pagina para ver los reportes",
};

export default async function ReportPage() {
  const allNotifications = await getAllNotifications();
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
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">Matchs</h1>
          <h3 className="text-sm font-normal leading-5 text-principal-3">Check the matchs of the users</h3>
        </div>
      </div>
      {/*Parte del medio*/}
      <div className="bg-white w-[355px] min-h-[641px] max-h-[641px] m-auto mt-9 relative pt-3 flex flex-col overflow-y-auto md:rounded-3xl md:w-[1235px] md:h-[700px] md:top-[9.5rem] md:left-6 md:pt-[4.75rem] rounded-3xl"></div>

      {/*Navbar inferior*/}
      <NavbarInferior />
      {/*Navbar lateral*/}
      <NavbarLateral />
    </div>
  );
}
