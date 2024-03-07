"use client";

import { AuthContext } from "@/app/auth-Provider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BiLogOut } from "react-icons/bi";

export default function LogoutButtonMobile() {
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
    <div onClick={prueba} className="cursor-pointer">
      <BiLogOut className="rounded-lg" size={25} />
    </div>
  );
}
