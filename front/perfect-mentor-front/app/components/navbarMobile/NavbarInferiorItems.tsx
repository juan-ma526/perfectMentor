import Link from "next/link";

interface Props {
  icon: React.ReactNode;
  path: string;
}

export const NavbarInferiorItems = ({ icon, path }: Props) => {
  return (
    <Link href={path}>
      <div className="cursor-pointer">{icon}</div>
    </Link>
  );
};
