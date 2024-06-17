import { User } from "@/lib/interfaces";
import EditarPerfil from "./utils/EditarPerfil";
import MisReservas from "./utils/MisReservas";

// Componente ClientePerfil que recibe un objeto user como propiedad
const ClientePerfil = ({ user }: { user: User }) => {
  return (
    // Contenedor principal con flexbox para disposición en columnas en dispositivos pequeños y en filas en dispositivos grandes
    <div className="flex flex-col lg:flex-row gap-4 w-full">
      {/* Contenedor para las reservas del cliente */}
      <div className="flex flex-col gap-4 w-full lg:w-3/4">
        <MisReservas />
      </div>
      {/* Contenedor para la edición del perfil del cliente */}
      <div className="w-full lg:w-1/4">
        <EditarPerfil user={user} />
      </div>
    </div>
  );
};

export default ClientePerfil;
