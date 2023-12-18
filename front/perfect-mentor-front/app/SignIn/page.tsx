"use client";
import Image from "next/image";
import Saly from "../assets/Saly-30.png";
import Saly2 from "../assets/Saly-2.png";
import Doodle from "../assets/doodle-5 1.png";
import Titulo from "../assets/Titulo.png";
import Linea from "../assets/Line 2 (1).png";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineUnlock } from "react-icons/ai";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../auth-Provider";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signIn, isAuthenticated, error } = useContext(AuthContext);
  const router = useRouter();

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    let alertWidthClass = ""; // Clase de ancho predeterminado
    if (window.innerWidth <= 600) {
      // Pantalla pequeña (puedes ajustar este valor según tus necesidades)
      alertWidthClass = "w-[300px] md:w-3/4 "; // Ajusta según tus necesidades
    }
    e.preventDefault();

    try {
      signIn(email, password);

      if (isAuthenticated) {
        router.push("/Users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="relative border-2 w-[315px] h-[361px] m-auto mt-[13rem] border-principal-3 md:border-2  md:w-[886px] md:h-[455px] md:m-auto md:mt-[14.75rem] rounded-2xl">
        <h1 className="text-3xl leading-10 font-extrabold text-principal-3 left-5 top-4 absolute md:left-[34.25rem]">
          Sign In
        </h1>
        <div className="text-principal-3 absolute left-5 top-14 md:left-[34.25rem]">
          .............................................................
        </div>
        <div className="absolute top-[6.5rem] left-5 md:top-[6.5rem] md:left-[34.25rem]">
          <h2 className="font-normal text-3xl leading-10 text-principal-3">
            Hi,name
          </h2>
        </div>
        <form
          onSubmit={handleSignIn}
          className="absolute top-20 md:left-[33rem] flex flex-col gap-4"
        >
          <div>
            <MdOutlineMail
              size={25}
              className="bg-white rounded-full z-10 absolute left-7 top-[107px]"
            />
            <input
              type="email"
              className="border-2 border-principal-3 bg-principal-1 text-principal-3 rounded-full w-[265px] h-[55px] pl-14 absolute top-[5.75rem] left-3"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <AiOutlineUnlock
              size={25}
              className="bg-white rounded-full z-10 absolute left-7 top-48"
            />
            <input
              type="password"
              className="border-2 border-principal-3 bg-principal-1 text-principal-3 rounded-full w-[265px] h-[55px] pl-14 absolute top-44 left-3"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="absolute -right-[19.5rem] -bottom-[23.5rem] flex  justify-center items-center gap-3 md:-right-[19.75rem] md:-bottom-[19.75rem] ">
            <button className="bg-principal-3 text-white p-4 rounded-full cursor-pointer  w-[315px]">
              Sign In
            </button>
          </div>
        </form>
        <Image
          className="-top-[8rem] absolute left-1 md:-top-32 md:left-[30.25rem]"
          src={Titulo}
          alt="Titulo"
        />
        <Image
          className="hidden absolute md:inline-block md:-top-[4.5rem] md:-left-9 md:h-[572px] md:w-[572px]"
          src={Saly2}
          alt="Imagen saly 2"
        />
        <Image
          className="hidden absolute md:inline-block h-96 md:top-8 md:left-[30.25rem]"
          src={Linea}
          alt="Layout"
        />
        <Image
          className="-top-44 absolute left-[11.25rem] md:top-[16.25rem] md:-left-[0.25rem]"
          src={Doodle}
          alt="Imagen resorte"
        />
        <Image
          className="hidden absolute md:top-1 md:left-[18.75rem] md:inline-flex"
          src={Doodle}
          alt="Imagen resorte"
        />
        <Image
          className="absolute -top-[12.25rem] md:-top-[3.75rem] left-[5.75rem] md:left-72"
          src={Saly}
          alt="Imagen gusano"
        />

        <a className="cursor-pointer absolute bottom-4 left-5 font-normal text-xs leading-4 text-principal-4 md:left-[34.25rem] md:bottom-[7rem]">
          Do you forgot your password?
        </a>
      </div>
    </div>
  );
}
