import Image from "next/image";
import Link from "next/link";

import Lupa from "../assets/Lupa.png";
import Barras from "../assets/Barras.png";
import User from "../assets/User.png";
import Report from "../assets/Report.png";
import { LogoutMobil } from ".";

export const NavbarInferior = () => {
  return (
    <div className="z-50 w-full h-[82px] bg-principal-3 rounded-t-[3rem] flex justify-center items-center md:hidden">
      <div className="flex justify-between gap-12">
        <Link href="/Users">
          <div className="cursor-pointer">
            <Image src={Lupa} alt="Icono lupa" />
          </div>
        </Link>
        <Link href="/Stadistics">
          <div className="cursor-pointer">
            <Image src={Barras} alt="Icono lupa" />
          </div>
        </Link>
        <Link href="/Reports">
          <div className="cursor-pointer">
            <Image src={Report} alt="Icono lupa" />
          </div>
        </Link>
        <Link href="/Profile">
          <div className="cursor-pointer">
            <Image src={User} alt="Icono lupa" />
          </div>
        </Link>
        <LogoutMobil />
      </div>
    </div>
  );
};
