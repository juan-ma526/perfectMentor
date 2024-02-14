import Image from "next/image";
import Link from "next/link";

import Titulo from "../assets/Titulo.png";
import Lupa from "../assets/Lupa.png";
import Barras from "../assets/Barras.png";
import Report from "../assets/Report.png";
import User from "../assets/User.png";
import { BiLogOut } from "react-icons/bi";

export const NavbarLateral = () => {
  return (
    <div className="hidden md:flex md:absolute md:top-[48px] md:-left-[246px] md:flex-col md:gap-5">
      <Image src={Titulo} alt="Titulo" />
      <div className="md:absolute md:top-[249px] md:z-50 md:w-[297px] md:h-full md:bg-principal-1 md:flex md:flex-col md:justify-center md:items-center md:-left-[52px] ">
        <ul className="md:flex md:justify-between  md:h-[400px] md:flex-col md:m-auto md:w-[18.55rem]">
          <Link href="/Users">
            <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6 md:hover:text-principal-1">
              <li>
                <Image src={Lupa} alt="Icono lupa" className="md:bg-principal-4" />
              </li>
              <h2 className="md:text-principal-4">Users</h2>
            </div>
          </Link>
          <Link href="/Stadistics">
            <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6">
              <li>
                <Image src={Barras} alt="Icono lupa" className="md:bg-principal-4" />
              </li>
              <h2 className="md:text-principal-4">Stadistics</h2>
            </div>
          </Link>
          <Link href="/Reports">
            <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6">
              <li>
                <Image src={Report} alt="Icono lupa" className="md:bg-principal-4" />
              </li>
              <h2 className="md:text-principal-4">Reports</h2>
            </div>
          </Link>
          <Link href="/Profile">
            <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6">
              <li>
                <Image src={User} alt="Icono lupa" className="md:bg-principal-4" />
              </li>
              <h2 className="md:text-principal-4">Profile</h2>
            </div>
          </Link>
          <div
            //    onClick={handleLogout}
            className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6"
          >
            <BiLogOut className="md:bg-principal-4 md:rounded-full" size={25} />
            <h2 className="md:text-principal-4">Log Out</h2>
          </div>
        </ul>
      </div>
    </div>
  );
};
