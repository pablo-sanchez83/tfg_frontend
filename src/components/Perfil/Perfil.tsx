import axios from "axios"; 
import { useEffect, useState } from "react"; 
import { User } from "@/lib/interfaces";
import AdminPerfil from "./AdminPerfil"; 
import ClientePerfil from "./ClientePerfil"; 
import EmpresarioPerfil from "./EmpresarioPerfil";
import EncargadoPerfil from "./EncargadoPerfil"; 
import env from "@/lib/env"; // Importamos las variables de entorno

// Definimos el componente principal para el perfil
export default function Perfil() {
  // Estado para almacenar los datos del perfil del usuario
  const [perfil, setPerfil] = useState<User | null>(null);

  // Hook de efecto para obtener el perfil del usuario cuando el componente se monta
  useEffect(() => {
    // Función asincrónica para obtener el perfil del usuario
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem(env.TOKEN_KEY); // Obtenemos el token del almacenamiento local
        if (!token) {
          throw new Error("No token found"); // Lanzamos un error si no hay token
        }

        // Hacemos una solicitud GET para obtener los datos del perfil del usuario
        const response = await axios.get(
          env.API_BASE_URL + env.endpoints.mi_usuario,
          {
            headers: { Authorization: `Token ${token}` }, // Incluimos el token en los encabezados de la solicitud
          },
        );

        setPerfil(response.data); // Guardamos los datos del perfil en el estado
      } catch (error) {
        window.location.href = "/account"; // Redirigimos al usuario a la página de cuenta si hay un error
      }
    };

    fetchProfile(); // Llamamos a la función para obtener el perfil
  }, []);

  // Función para renderizar el componente del perfil correspondiente según el rol del usuario
  function profileData(p: User | null) {
    if (!p) {
      return <div>No profile data available</div>; // Mostramos un mensaje si no hay datos del perfil
    }

    // Usamos un switch para renderizar el componente correspondiente según el rol del usuario
    switch (p.rol) {
      case 1:
        return <AdminPerfil user={p} />; // Renderizamos el perfil de Admin
      case 2:
        return <ClientePerfil user={p} />; // Renderizamos el perfil de Cliente
      case 3:
        return <EncargadoPerfil user={p} />; // Renderizamos el perfil de Encargado
      case 4:
        return <EmpresarioPerfil user={p} />; // Renderizamos el perfil de Empresario
      default:
        return <div>Unknown Role</div>; // Mostramos un mensaje si el rol es desconocido
    }
  }

  return profileData(perfil); // Llamamos a la función para renderizar el perfil
}
