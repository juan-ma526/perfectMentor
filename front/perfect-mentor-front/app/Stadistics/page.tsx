import Link from "next/link";

export const metadata = {
  title: "Stadistics Page",
  description:
    "Pagina donde se puede ver las estadisticas de los usuarios, cantidad de matchs, cuantos usuarios tiene la pagina, etc....",
};
export default function StadisticsPage() {
  return (
    <div>
      StadisticsPage
      <Link href="/Users">UsersPage</Link>
    </div>
  );
}
