import { LogoutMobil } from "..";
import { FaSearch, FaUser } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { VscReport } from "react-icons/vsc";
import { NavbarInferiorItem } from "./NavbarInferiorItem";

export const NavbarInferior = () => {
  const NavbarItems = [
    {
      icon: <FaSearch size={20} />,
      path: "/Users",
    },
    {
      icon: <ImStatsBars size={20} />,
      path: "/Stadistics",
    },
    {
      icon: <VscReport size={20} />,
      path: "/Reports",
    },
    {
      icon: <FaUser size={20} />,
      path: "/Profile",
    },
  ];

  return (
    <div className="z-50 w-full h-[82px] bg-principal-3 rounded-t-[3rem] flex justify-center items-center md:hidden">
      <div className="flex justify-between gap-12">
        {NavbarItems.map((item, index) => (
          <NavbarInferiorItem key={index} path={item.path} icon={item.icon} />
        ))}
        <LogoutMobil />
      </div>
    </div>
  );
};
