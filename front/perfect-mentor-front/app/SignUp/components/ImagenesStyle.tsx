import Image from "next/image";
import Saly from "@/app/assets/Saly-30.png";
import Saly2 from "@/app/assets/Saly-2.png";
import Doodle from "@/app/assets/doodle-5 1.png";
import Titulo from "@/app/assets/Titulo.png";
import Linea from "@/app/assets/Line 2 (1).png";

export const ImagenesStyle = () => {
  return (
    <>
      <Image className="-top-[8rem] absolute left-1 md:-top-32 md:left-[30.25rem]" src={Titulo} alt="Titulo" />
      <Image
        className="hidden absolute md:inline-block md:-top-[4.5rem] md:-left-9 md:h-[572px] md:w-[572px]"
        src={Saly2}
        alt="Imagen saly 2"
      />
      <Image className="hidden absolute md:inline-block h-96 md:top-8 md:left-[30.25rem]" src={Linea} alt="Layout" />
      <Image
        className="-top-44 absolute left-[11.25rem] md:top-[16.25rem] md:-left-[0.25rem]"
        src={Doodle}
        alt="Imagen resorte"
      />
      <Image className="hidden absolute md:top-1 md:left-[18.75rem] md:inline-flex" src={Doodle} alt="Imagen resorte" />
      <Image
        className="absolute -top-[12.25rem] md:-top-[3.75rem] left-[5.75rem] md:left-72"
        src={Saly}
        alt="Imagen gusano"
      />
    </>
  );
};
