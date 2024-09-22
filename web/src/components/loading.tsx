import { Spinner } from "./ui/spinner";
import Logo from "../assets/logo-in-orbit.svg";

export function Loading() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={Logo} alt="in.orbit" />
      <div className="flex items-center gap-2">
        <Spinner />
        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Carregando...
        </p>
      </div>
    </div>
  );
}
