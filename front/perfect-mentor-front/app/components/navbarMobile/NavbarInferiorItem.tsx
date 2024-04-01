import Link from "next/link";
import React from "react";

interface Props {
  icon: React.ReactNode;
  path: string;
}

export const NavbarInferiorItem = ({ icon, path }: Props) => {
  return (
    <Link href={path}>
      <div className="cursor-pointer">{icon}</div>
    </Link>
  );
};
