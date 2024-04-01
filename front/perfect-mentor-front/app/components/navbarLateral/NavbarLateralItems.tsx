import Link from "next/link";

interface Props {
  icon: React.ReactNode;
  title: string;
  path: string;
}

export const NavbarLateralItems = ({ icon, title, path }: Props) => {
  return (
    <ul className="md:flex md:justify-between  md:h-[400px] md:flex-col md:m-auto md:w-[18.55rem]">
      <Link href={path}>
        <div className="md:cursor-pointer md:flex md:gap-5 md:hover:bg-principal-3 md:w-full md:p-6 md:hover:text-principal-1">
          <li>
            {/*  <Image src={icon} alt="Icono lupa" className="md:bg-principal-4" /> */}
            {icon}
          </li>
          <h2 className="md:text-principal-4">{title}</h2>
        </div>
      </Link>
    </ul>
  );
};
