import { AiOutlineEdit } from "react-icons/ai";
import Image from "next/image";
import Resorte from "../assets/doodle-5 1.png";
import { NavbarInferior, NavbarLateral, ProfileCard } from "../components";

export const metadata = {
  title: "Profile Page",
  description: "Pagina donde se puede ver el perfil, modificar, y cambiar el estado de la cuenta de un usuario",
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col bg-principal-2 md:bg-white md:w-[1289px] md:h-[860px] md:z-30 md:top-[41px] md:left-[299px] md:absolute md:rounded-3xl ">
      <Image
        src={Resorte}
        alt="imagen resorte"
        className="hidden md:inline-block md:absolute md:top-28 md:left-14 md:z-30"
      />
      <Image
        src={Resorte}
        alt="imagen resorte"
        className="hidden md:inline-block md:absolute md:top-28 md:right-[147px] md:z-30 md:rotate-90 md:w-[20rem] md:h-[14rem]"
      />
      <div className="bg-principal-1 h-[137px] w-full relative rounded-br-[3.5rem] md:absolute  md:bg-principal-2 md:rounded-3xl md:z-40">
        <div className="absolute top-6 left-7 md:top-8 md:left-24">
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">Profile</h1>
        </div>
        <AiOutlineEdit
          size={30}
          className="cursor-pointer rounded-full bg-white mr-3 hover:border-principal-3 absolute top-8 left-36 md:left-56 md:top-9"
        />
      </div>
      {/*Parte del medio*/}
      <ProfileCard />

      {/*Navbar inferior*/}
      <NavbarInferior />
      {/*Navbar lateral*/}
      <NavbarLateral />
    </div>
  );
}
