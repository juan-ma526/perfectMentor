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
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth-Provider";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/SignIn");
    }
  }, [isAuthenticated]);

  const commonStyles =
    "w-[315px] h-[102px] m-auto flex gap-6 rounded-[20px] mb-2 p-3 md:w-full md:h-[60px] md:ml-3 md:mr-3";

  const commonStylesVerified =
    "w-[82px] h-[20px] rounded-[40px] border-2 text-xs flex justify-center items-center mr-1";

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
    },
  ];

  const handleLogout = () => {
    try {
      logout();
      router.push("/SignIn");
    } catch (error) {
      console.log(error);
    }
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
        className="hidden md:inline-block md:absolute md:top-2 md:right-0 md:z-30 md:rotate-90 md:w-[20rem] md:h-[20rem]"
      />
      <div className="bg-principal-1 h-[137px] w-full relative rounded-br-[3.5rem] md:absolute  md:bg-principal-2 md:rounded-3xl">
        <div className="absolute top-6 left-7 md:top-8 md:left-24">
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">
            Users
          </h1>
          <h3 className="text-sm font-normal leading-5 text-principal-3">
            View all the users
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
      <div className="bg-white w-[355px] max-h-[640px] m-auto mt-9 relative pt-[4.75rem] flex flex-col overflow-y-auto md:rounded-3xl md:w-[1235px] md:h-[700px] md:top-[9.5rem] md:left-6">
        <div className="absolute top-2 left-6 z-30 w-[315px] h-[50px] bg-principal-2 rounded-full flex justify-around items-center md:top-5 md:left-[41rem]  ">
          <h2 className="font-bold leading-5 text-base text-principal-3">
            Filters
          </h2>
          <span className="hover:border-principal-3 active:bg-principal-3 focus:bg-principal-3 cursor-pointer w-[91px] h-[40px] rounded-full border-2 flex justify-center items-center text-principal-4">
            Age
          </span>
          <span className="hover:border-principal-3 active:bg-principal-3 focus:bg-principal-3 cursor-pointer w-[91px] h-[40px] rounded-full border-2 flex justify-center items-center text-secundario-3 ">
            Status
          </span>
        </div>
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
                  <span className="text-sm font-normal leading-5 md:hidden">
                    {persona.Edad}
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
                    persona.Verificado
                      ? `bg-green-500 text-green-900 ${commonStylesVerified}`
                      : `bg-rose-500 text-rose-900 ${commonStylesVerified}`
                  }
                >
                  {persona.Verificado ? "Verified" : "Unverified"}
                </div>
                <AiOutlineEdit
                  size={30}
                  className=" cursor-pointer rounded-full bg-white mr-3 hover:border-principal-3"
                />
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
