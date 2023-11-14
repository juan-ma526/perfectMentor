"use client";
import { AiOutlineEdit } from "react-icons/ai";
import Barras from "../assets/Barras.png";
import Lupa from "../assets/Lupa.png";
import Report from "../assets/Report.png";
import User from "../assets/User.png";
import Image from "next/image";
import Titulo from "../assets/Titulo.png";
import { BiLogOut } from "react-icons/bi";
import Resorte from "../assets/doodle-5 1.png";
import Avatar from "../assets/Avatar.png";
import Link from "next/link";
import { AuthContext } from "../auth-Provider";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();
  console.log(user);
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
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">
            Profile
          </h1>
        </div>
        <AiOutlineEdit
          size={30}
          className="cursor-pointer rounded-full bg-white mr-3 hover:border-principal-3 absolute top-8 left-36 md:left-56 md:top-9"
        />
      </div>
      {/*Parte del medio*/}
      <div className="bg-white w-[355px] min-h-[640px] gap-4 m-auto mt-9  pt-3 flex flex-col overflow-y-auto md:rounded-3xl md:w-[548px] md:h-[740px] md:top-[3.5rem] md:left-[24.5rem] md:pt-[4.75rem] md:absolute md:shadow-xl rounded-3xl z-50">
        <Image
          src={Avatar}
          alt="Imagen de perfil"
          className="absolute md:right-[196px] md:top-0 z-50 top-28 right-11"
        />
        {/* Aca va el arreglo filtrado*/}
        <div className="md:flex md:flex-col">
          <div className="mt-20">
            <label htmlFor="Nombre" className="ml-4 text-xs font-normal">
              Your Name
              <input
                type="text"
                id="Nombre"
                className=" border-b-[1px] border-principal-4 w-[90%] ml-3 text-[15px] font-bold"
                value={listaPersonas[0].Nombre}
                disabled
              />
            </label>
            <div className="mt-3">
              <label htmlFor="Email" className="ml-4 text-xs font-normal">
                Your Email
                <input
                  type="text"
                  id="Email"
                  className=" border-b-[1px] border-principal-4 w-[90%] ml-3 text-[15px] font-bold"
                  value={listaPersonas[0].Email}
                  disabled
                />
              </label>
            </div>
            <div className="mt-3">
              <label htmlFor="Password" className="ml-4 text-xs font-normal">
                Your Password
                <input
                  type="password"
                  id="Password"
                  className=" border-b-[1px] border-principal-4 w-[90%] ml-3 text-[15px] font-bold"
                  value={listaPersonas[0].PaisResidencia}
                  disabled
                />
              </label>
            </div>
            <div className="mt-3 md:flex">
              <label htmlFor="Age" className="ml-4 text-xs font-normal">
                Age
                <input
                  type="text"
                  id="Age"
                  className="border-b-[1px] border-principal-4 w-[90%] ml-1 text-[15px] font-bold md:mt-3 md:w-[463px]"
                  value={listaPersonas[0].Edad}
                  disabled
                />
              </label>
            </div>
            <div className="mt-3">
              <label htmlFor="Role" className="ml-4 text-xs font-normal">
                Role
                <input
                  type="text"
                  id="Role"
                  className=" border-b-[1px] border-principal-4 w-[90%] ml-3 text-[15px] font-bold md:mt-3 md:w-[83%]"
                  value={listaPersonas[0].Rol}
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
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
