import { FaSearch } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import { VscReport } from "react-icons/vsc";
import { FaUser } from "react-icons/fa";
import { NavbarInferiorItems } from "./NavbarInferiorItems";
import LogoutButtonMobile from "./LogoutButtonMobile";

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

export const NavbarInferior = () => {
  return (
    <div className="z-50 w-full h-[82px] bg-principal-3 rounded-t-[3rem] flex justify-center items-center md:hidden">
      <div className="flex items-center justify-between gap-12">
        {NavbarItems.map((item, index) => (
          <NavbarInferiorItems key={index} icon={item.icon} path={item.path} />
        ))}
        {/*   <div onClick={handleLogout} className="cursor-pointer">
      <BiLogOut className="bg-principal-1 rounded-lg" size={27} />
    </div> */}
        <LogoutButtonMobile />
      </div>
    </div>
  );
};
