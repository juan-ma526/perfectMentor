"use client";
import { Chat } from "../components";
import NavbarPrueba from "../components/NavbarPrueba";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Prueba() {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className="max-w-[728px] mx-auto text-center">
      <section className="flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative">
        <NavbarPrueba />

        <Chat />
      </section>
    </div>
  );
}
