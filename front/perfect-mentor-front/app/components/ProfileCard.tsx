"use client";

import { useContext, useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import Avatar from "../assets/Avatar.png";
import { AuthContext } from "../auth-Provider";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { handleUpdateUser, handleVerifyUser } from "../lib/profile";
import { RadioButton } from "./RadioButton";

export const ProfileCard = () => {
  const { user } = useContext(AuthContext);
  const [rol, setRol] = useState(user?.rol || "");
  const [age, setAge] = useState(user?.age || "");
  const router = useRouter();

  const handleOptionChange = (value: string) => {
    setRol(value);
  };

  const onToggleUpdate = async () => {
    try {
      await handleUpdateUser(age, rol);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const onToggleVerify = async () => {
    try {
      await handleVerifyUser();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white w-[355px] min-h-[640px] gap-4 m-auto mt-9  pt-3 flex flex-col overflow-y-auto md:rounded-3xl md:w-[548px] md:h-[740px] md:top-[3.5rem] md:left-[24.5rem] md:pt-[4.75rem] md:absolute md:shadow-xl rounded-3xl z-50">
      <Image src={Avatar} alt="Imagen de perfil" className="absolute md:right-[196px] md:top-0 z-50 top-28 right-11" />
      {/* Aca va el arreglo filtrado*/}
      <div className="md:flex md:flex-col">
        <div className="mt-20">
          <label htmlFor="Nombre" className="ml-4 text-xs font-normal">
            Your Name
            <input
              type="text"
              id="Nombre"
              className=" border-b-[1px] border-principal-4 w-[90%] ml-3 text-[15px] font-bold"
              value={user?.username || ""}
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
                value={user?.email || ""}
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
                value={user?.email || ""}
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
                className="border-b-[1px] border-principal-4 w-[90%] ml-1 text-[15px] font-bold md:mt-3 md:w-[463px] pl-3 md:pl-3"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </div>
          <div className="mt-9">
            <RadioButton rol={rol} handleOptionChange={handleOptionChange} />
          </div>
        </div>
        <div className="flex gap-3 justify-center items-center mt-9">
          <button
            onClick={onToggleUpdate}
            className="border-2 border-solid p-3 bg-principal-4 text-principal-1 text-lg"
          >
            Actualizar
          </button>

          <button onClick={onToggleVerify} className="border-2 border-solid p-3 bg-principal-1 text-black text-lg">
            Verificar
          </button>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};
