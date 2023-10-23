import { BiSearch } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import Barras from "../assets/Barras.png";
import Lupa from "../assets/Lupa.png";
import Report from "../assets/Report.png";
import User from "../assets/User.png";
import Image from "next/image";

export default function UsersPage() {
  const commonStyles =
    "w-[315px] h-[102px] m-auto flex gap-6 rounded-[20px] mb-2 p-3";

  const commonStylesVerified =
    "w-[82px] h-[20px] rounded-[40px] border-2 text-xs flex justify-center items-center mr-1";

  const listaPersonas = [
    {
      Nombre: "Marta",
      Edad: "",
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

  return (
    <div className="flex flex-col bg-principal-2 ">
      <div className="bg-principal-1 h-[137px] w-full relative rounded-br-[3.5rem]">
        <div className="absolute top-6 left-7">
          <h1 className="text-3xl font-extrabold leading-[44px] text-principal-3">
            Users
          </h1>
          <h3 className="text-sm font-normal leading-5 text-principal-3">
            View all the users
          </h3>
        </div>
        <div className="absolute top-28 left-10 flex justify-start">
          <BiSearch className="absolute left-3 top-3" size={20} />
          <input
            type="search"
            className="w-[315px] h-[50px] rounded-full border-none pl-10"
          />
        </div>
      </div>
      {/*Parte del medio*/}
      <div className="bg-white w-[355px] max-h-[640px] m-auto mt-9 relative pt-[4.75rem] flex flex-col overflow-y-auto">
        <div className="absolute top-2 left-6 z-30 w-[315px] h-[50px] bg-principal-2 rounded-full flex justify-around items-center ">
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
              <div className="flex flex-col m-auto">
                <div className="flex gap-2">
                  <span className="text-sm font-bold leading-5">
                    {persona.Nombre} {persona.Apellido}
                  </span>
                  <span className="text-sm font-normal leading-5">
                    {persona.Edad}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <span className="text-sm font-bold leading-5">email:</span>
                  <span className="text-sm font-normal leading-5">
                    {persona.Email}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <span className="text-sm font-bold leading-5">Role:</span>
                  <span className="text-sm font-normal leading-5">
                    {persona.Rol}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <span className="text-sm font-bold leading-5">
                    Joined date:
                  </span>
                  <span className="text-sm font-normal leading-5">
                    {persona.JoinedDate}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end justify-around">
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
      <div className="z-50 w-full h-[82px] bg-principal-3 rounded-t-[3rem] flex justify-center items-center">
        <div className="flex justify-between gap-12">
          <div className="cursor-pointer">
            <Image src={Lupa} alt="Icono lupa" />
          </div>
          <div className="cursor-pointer">
            <Image src={Barras} alt="Icono lupa" />
          </div>
          <div className="cursor-pointer">
            <Image src={Report} alt="Icono lupa" />
          </div>
          <div className="cursor-pointer">
            <Image src={User} alt="Icono lupa" />
          </div>
        </div>
      </div>
    </div>
  );
}
