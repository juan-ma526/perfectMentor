import Image from "next/image";
import Titulo from "@/app/assets/Titulo.png";
import { LogoutLatera } from "..";
import { FaSearch, FaUser } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { FaSms } from "react-icons/fa";
import { VscReport } from "react-icons/vsc";
import { NavbarLateralItem } from "./NavbarLateralItem";

export const NavbarLateral = () => {
  const NavbarItems = [
    {
      icon: <FaSearch />,
      title: "Users",
      path: "/Users",
    },
    {
      icon: <ImStatsBars />,
      title: "stadistics",
      path: "/Stadistics",
    },
    {
      icon: <VscReport />,
      title: "reports",
      path: "/Reports",
    },
    {
      icon: <FaSms />,
      title: "matchs",
      path: "/Matchs",
    },
    {
      icon: <FaUser />,
      title: "profile",
      path: "/Profile",
    },
  ];
  return (
    <div className="hidden md:flex md:absolute md:top-[48px] md:-left-[246px] md:flex-col md:gap-5">
      <Image src={Titulo} alt="Titulo" />
      <div className="md:absolute md:top-[291px] md:z-50 md:w-[297px] md:h-full md:bg-principal-1 md:flex md:flex-col md:justify-center md:items-center md:-left-[52px] ">
        <ul className="md:flex md:justify-between  md:h-[400px] md:flex-col md:m-auto md:w-[18.55rem]">
          {NavbarItems.map((item, index) => (
            <NavbarLateralItem key={index} title={item.title} path={item.path} icon={item.icon} />
          ))}
        </ul>
        <LogoutLatera />
      </div>
    </div>
  );
};
