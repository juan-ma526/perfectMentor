"use client";

import { BiUser } from "react-icons/bi";
import { MdOutlineMail } from "react-icons/md";
import { AiOutlineUnlock } from "react-icons/ai";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const SignUp = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/signUp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
        credentials: "include",
      }).then((response) => response.json());

      if (response.message) {
        toast.error("Contraseña o password incorrectos");
      } else {
        toast.success("Registro exitoso");
        router.push("/SignIn");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleRegister} className="absolute top-20 md:left-[33rem] flex flex-col gap-4">
        <div className="flex">
          <BiUser size={25} className="bg-white rounded-full z-10 absolute left-7 top-7" />
          <input
            type="text"
            className="border-2 border-principal-3 bg-principal-1 text-principal-3 rounded-full w-[265px] h-[55px] pl-14 absolute top-3 left-3"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <MdOutlineMail size={25} className="bg-white rounded-full z-10 absolute left-7 top-[107px]" />
          <input
            type="email"
            className="border-2 border-principal-3 bg-principal-1 text-principal-3 rounded-full w-[265px] h-[55px] pl-14 absolute top-[5.75rem] left-3"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <AiOutlineUnlock size={25} className="bg-white rounded-full z-10 absolute left-7 top-48" />
          <input
            type="password"
            className="border-2 border-principal-3 bg-principal-1 text-principal-3 rounded-full w-[265px] h-[55px] pl-14 absolute top-44 left-3"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="absolute -right-[19.5rem] -bottom-[21.5rem] flex  justify-center items-center gap-3 md:-right-[19.75rem] md:-bottom-[18.75rem] ">
          <button className="bg-principal-3 text-white p-4 rounded-full cursor-pointer  w-[315px]">Sign Up</button>
        </div>
      </form>
    </>
  );
};
