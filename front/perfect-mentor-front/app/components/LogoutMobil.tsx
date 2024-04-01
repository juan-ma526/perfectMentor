"use client";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";

export const LogoutMobil = () => {
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
    <div onClick={handleLogout} className="cursor-pointer">
      <BiLogOut className="bg-principal-1 rounded-lg" size={27} />
    </div>
  );
};
