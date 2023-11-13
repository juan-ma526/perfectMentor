"use client";
import { BiSearch } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import Barras from "../assets/Barras.png";
import Lupa from "../assets/Lupa.png";
import Report from "../assets/Report.png";
import User from "../assets/User.png";
import Image from "next/image";
import Titulo from "../assets/Titulo.png";
import { BiLogOut } from "react-icons/bi";
import Resorte from "../assets/doodle-5 1.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../auth-Provider";
import { useContext } from "react";

export default function ReportPage() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();
  const commonStyles =
    "w-[315px] h-[102px] m-auto flex gap-6 rounded-[20px] mb-2 p-3 md:w-[97%] md:h-[60px] md:ml-3 md:mr-3";

  const commonStylesVerified =
    "w-[82px] h-[40px] rounded-[40px] border-2 text-xs flex justify-center items-center mr-1 cursor-pointer";

  const listaPersonas = [
    {
      Nombre: "Marta",
      Edad: "33",
      Apellido: "Sanchez",
      Email: "sanchez@gmail.com",
      PaisResidencia: "Argentina",
      Profesion: "Frontend",
      Descripcion: "Desarrolladora blasjd asuqwej ansddasjkdsau9ratjkasd",
      Foto: "",
      Rol: "Mentee",
      Skills: "React, Javascript, Css",
      Idioma: "Ingles",
      Verificado: false,
      JoinedDate: "abril 22,2022",
      Respondio: "No answer",
    },
    // Repite el mismo formato para las otras 4 personas
    {
      Nombre: "Martin",
      Edad: "33",
      Apellido: "Perez",
      Email: "sanchez@gmail.com",
      PaisResidencia: "Brasil",
      Profesion: "Fullstack",
      Descripcion: "lorem opasdjasj laskdid",
      Foto: "",
      Rol: "Mentor",
      Skills: "Node, Mongodb, Javascript",
      Idioma: "Español",
      Verificado: true,
      JoinedDate: "Jan 22, 2012",
      Respondio: "Check it",
    },
    {
      // Datos de la tercera persona
      Nombre: "Carlos",
      Edad: "19",
      Apellido: "Sanchez",
      Email: "sanchez@gmail.com",
      PaisResidencia: "Argentina",
      Profesion: "Frontend",
      Descripcion: "Desarrolladora blasjd asuqwej ansddasjkdsau9ratjkasd",
      Foto: "",
      Rol: "Mentee",
      Skills: "React, Javascript, Css",
      Idioma: "Ingles",
      Verificado: true,
      JoinedDate: "feb 15, 1988",
      Respondio: "Check it",
    },
    {
      // Datos de la cuarta persona
      Nombre: "Felipe",
      Edad: "25",
      Apellido: "Melo",
      Email: "sanchez@gmail.com",
      PaisResidencia: "España",
      Profesion: "Frontend",
      Descripcion: "Desarrolladora blasjd asuqwej ansddasjkdsau9ratjkasd",
      Foto: "",
      Rol: "Mentee",
      Skills: "React, Javascript, Css",
      Idioma: "Español",
      Verificado: false,
      JoinedDate: "Dic 22, 2015",
      Respondio: "No answer",
    },
    {
      // Datos de la cuarta persona
      Nombre: "Felipe",
      Edad: "25",
      Apellido: "Melo",
      Email: "sanchez@gmail.com",
      PaisResidencia: "España",
      Profesion: "Frontend",
      Descripcion: "Desarrolladora blasjd asuqwej ansddasjkdsau9ratjkasd",
      Foto: "",
      Rol: "Mentee",
      Skills: "React, Javascript, Css",
      Idioma: "Español",
      Verificado: true,
      JoinedDate: "Dic 22, 2015",
      Respondio: "Check it",
    },
    {
      // Datos de la cuarta persona
      Nombre: "Felipe",
      Edad: "25",
      Apellido: "Melo",
      Email: "sanchez@gmail.com",
      PaisResidencia: "España",
      Profesion: "Frontend",
      Descripcion: "Desarrolladora blasjd asuqwej ansddasjkdsau9ratjkasd",
      Foto: "",
      Rol: "Mentee",
      Skills: "React, Javascript, Css",
      Idioma: "Español",
      Verificado: false,
      JoinedDate: "Dic 22, 2015",
      Respondio: "No answer",
    },
    {
      // Datos de la cuarta persona
      Nombre: "Felipe",
      Edad: "25",
      Apellido: "Melo",
      Email: "sanchez@gmail.com",
      PaisResidencia: "España",
      Profesion: "Frontend",
      Descripcion: "Desarrolladora blasjd asuqwej ansddasjkdsau9ratjkasd",
      Foto: "",
      Rol: "Mentee",
      Skills: "React, Javascript, Css",
      Idioma: "Español",
      Verificado: false,
      JoinedDate: "Dic 22, 2015",
      Respondio: "No answer",
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/SignIn");
  };

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
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">
            Reports
          </h1>
          <h3 className="text-sm font-normal leading-5 text-principal-3">
            Check the reports of the users
          </h3>
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
        {/* Aca va el arreglo filtrado*/}
        {listaPersonas.map((persona, index) => {
          return (
            <div
              className={
                persona.Verificado
                  ? `bg-green-100 ${commonStyles}`
                  : `bg-rose-100 ${commonStyles}`
              }
              key={index}
            >
              <div className="flex flex-col m-auto md:flex-row  md:gap-32">
                <div className="flex gap-2">
                  <span className="text-sm font-bold leading-5 ">
                    {persona.Nombre} {persona.Apellido}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <span className="text-sm font-bold leading-5 md:hidden">
                    email:
                  </span>
                  <span className="text-sm font-normal leading-5">
                    {persona.Email}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <span className="text-sm font-bold leading-5 md:hidden">
                    Role:
                  </span>
                  <span className="text-sm font-normal leading-5">
                    {persona.Rol}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <span className="text-sm font-bold leading-5 md:hidden">
                    Joined date:
                  </span>
                  <span className="text-sm font-normal leading-5">
                    {persona.JoinedDate}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-around md:flex-row md:gap-11">
                <div
                  className={
                    persona.Respondio == "Check it"
                      ? `bg-green-300 text-green-900  ${commonStylesVerified}`
                      : `bg-rose-300 text-rose-900  ${commonStylesVerified}`
                  }
                >
                  {persona.Respondio == "Check it" ? "Check it" : "No answer"}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*Navbar inferior*/}
      <div className="z-50 w-full h-[82px] bg-principal-3 rounded-t-[3rem] flex justify-center items-center md:hidden">
        <div className="flex justify-between gap-12">
          <Link href="/Users">
            <div className="cursor-pointer">
              <Image src={Lupa} alt="Icono Lupa" />
            </div>
          </Link>
          <Link href="/Stadistics">
            <div className="cursor-pointer">
              <Image src={Barras} alt="Icono Barra" />
            </div>
          </Link>
          <Link href="/Reports">
            <div className="cursor-pointer">
              <Image src={Report} alt="Icono Reportes" />
            </div>
          </Link>
          <Link href="/Profile">
            <div className="cursor-pointer">
              <Image src={User} alt="Icono Usuario" />
            </div>
          </Link>
          <div onClick={handleLogout} className="cursor-pointer">
            <BiLogOut className="bg-principal-1 rounded-lg" size={27} />
          </div>
        </div>
      </div>
      {/*Navbar lateral*/}
      <div className="hidden md:flex md:absolute md:top-[48px] md:-left-[246px] md:flex-col md:gap-5">
        <Image src={Titulo} alt="Titulo" />
        <div className="md:absolute md:top-[249px] md:z-50 md:w-[297px] md:h-full md:bg-principal-1 md:flex md:flex-col md:justify-center md:items-center md:-left-[52px] ">
          <ul className="md:flex md:justify-between  md:h-[400px] md:flex-col md:m-auto md:w-[18.55rem]">
            <Link href="/Users">
              <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6 md:hover:text-principal-1">
                <li>
                  <Image
                    src={Lupa}
                    alt="Icono lupa"
                    className="md:bg-principal-4"
                  />
                </li>
                <h2 className="md:text-principal-4">Users</h2>
              </div>
            </Link>
            <Link href="/Stadistics">
              <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6">
                <li>
                  <Image
                    src={Barras}
                    alt="Icono lupa"
                    className="md:bg-principal-4"
                  />
                </li>
                <h2 className="md:text-principal-4">Stadistics</h2>
              </div>
            </Link>
            <Link href="/Reports">
              <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6">
                <li>
                  <Image
                    src={Report}
                    alt="Icono lupa"
                    className="md:bg-principal-4"
                  />
                </li>
                <h2 className="md:text-principal-4">Reports</h2>
              </div>
            </Link>
            <Link href="/Profile">
              <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6">
                <li>
                  <Image
                    src={User}
                    alt="Icono lupa"
                    className="md:bg-principal-4"
                  />
                </li>
                <h2 className="md:text-principal-4">Profile</h2>
              </div>
            </Link>
            <div
              onClick={handleLogout}
              className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6"
            >
              <BiLogOut
                className="md:bg-principal-4 md:rounded-full"
                size={25}
              />
              <h2 className="md:text-principal-4">Log Out</h2>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
