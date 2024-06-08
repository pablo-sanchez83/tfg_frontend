import { User } from "@/lib/interfaces";
import EditarPerfil from "./utils/EditarPerfil";
import MisReservas from "./utils/MisReservas";

const ClientePerfil = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      <div className="flex flex-col gap-4 w-full lg:w-3/4">
        <MisReservas />
      </div>
      <div className="w-full lg:w-1/4">
        <EditarPerfil user={user} />
      </div>
    </div>
  );
};

export default ClientePerfil;
