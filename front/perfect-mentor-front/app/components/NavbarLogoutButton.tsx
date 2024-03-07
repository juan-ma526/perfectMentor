"use client";

import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../auth-Provider";
import { useRouter } from "next/navigation";

export const NavbarLogoutButton = () => {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const prueba = async () => {
    const response = await logout();
    if (response.message) {
      router.push("/SignIn");
    }
    return response;
  };

  return (
    <div onClick={prueba} className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6">
      <BiLogOut className="md:bg-principal-4 md:rounded-full" size={25} />
      <h2 className="md:text-principal-4">Log Out</h2>
    </div>
  );
};
