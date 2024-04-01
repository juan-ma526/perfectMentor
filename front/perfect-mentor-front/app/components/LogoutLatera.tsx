"use client";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

export const LogoutLatera = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch("http://localhost:3001/api/users/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Fallo en el deslogeo");
    }
    router.push("/SignIn");
  };
  return (
    <div onClick={handleLogout} className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6">
      <BiLogOut className="md:bg-principal-4 md:rounded-full" size={25} />
      <h2 className="md:text-principal-4">Log Out</h2>
    </div>
  );
};
