import Image from "next/image";
import Saly from "./assets/Saly-30.png";
import Saly1 from "./assets/Saly-1.png";
import Doodle from "./assets/doodle-5 1.png";
import Titulo from "./assets/Titulo.png";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="relative md:border-2 border-principal-3 md:w-[886px] md:h-[455px] md:m-auto md:mt-[9.75rem]">
        <Image
          className="top-32 absolute left-5 md:top-32 md:left-[34.25rem]"
          src={Titulo}
          alt="Titulo"
        />
        <Image
          className="top-56 absolute left-5 md:-top-[9.75rem] md:left-[22.25rem]"
          src={Doodle}
          alt="Imagen resorte"
        />
        <Image
          className="hidden absolute md:top-1 md:-left-[5.25rem] md:inline-flex"
          src={Doodle}
          alt="Imagen resorte"
        />
        <Image
          className="absolute top-36 left-2 md:-top-[2.25rem] md:left-1 md:w-[500px] md:h-[500px]"
          src={Saly1}
          alt="Fondo principal"
        />
        <Image
          className="absolute top-[31.75rem] left-[6.75rem] md:top-1 md:left-[51rem]"
          src={Saly}
          alt="Imagen gusano"
        />
      </div>
      <div className="absolute right-[2.5rem] bottom-[7.5rem] flex flex-col justify-center items-center gap-3 md:right-[34.25rem] md:bottom-[22.25rem]">
        <Link href="/SignUp">
          <button className="bg-principal-3 text-white px-32 py-2 rounded-full cursor-pointer">
            Sign Up
          </button>
        </Link>
        <Link href="SignIn">
          <button className="text-principal-3 px-32 py-2 border-2 border-principal-3 rounded-full cursor-pointer">
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
}
