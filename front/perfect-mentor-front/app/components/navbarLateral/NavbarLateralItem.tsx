import Link from "next/link";
import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  path: string;
}

export const NavbarLateralItem = ({ icon, title, path }: Props) => {
  return (
    <Link href={path}>
      <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6 md:hover:text-principal-1">
        <li className="">{icon}</li>
        <h2 className="md:text-principal-4">{title}</h2>
      </div>
    </Link>
  );
};
