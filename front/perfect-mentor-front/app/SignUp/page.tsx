import { ImagenesStyle } from "./components/ImagenesStyle";
import { SignUp } from "./components/SignUp";

export const metadata = {
  title: "Pagina de Registro",
  description: "Pagina de Registro de Usuario",
};

export default function SignUpPage() {
  return (
    <div>
      <div className="relative border-2 w-[315px] h-[361px] m-auto mt-[13rem] border-principal-3 md:border-2  md:w-[886px] md:h-[455px] md:m-auto md:mt-[14.75rem] rounded-2xl">
        <h1 className="text-3xl leading-10 font-extrabold text-principal-3 left-5 top-4 absolute md:left-[34.25rem]">
          Sign Up
        </h1>
        <div className="text-principal-3 absolute left-5 top-14 md:left-[34.25rem]">
          .............................................................
        </div>
        <SignUp />
        <ImagenesStyle />
      </div>
    </div>
  );
}
