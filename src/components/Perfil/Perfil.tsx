import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "@/lib/interfaces";
import AdminPerfil from "./AdminPerfil";
import ClientePerfil from "./ClientePerfil";
import EmpresarioPerfil from "./EmpresarioPerfil";
import EncargadoPerfil from "./EncargadoPerfil";
import env from "@/lib/env";

export default function Perfil() {
  const [perfil, setPerfil] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem(env.TOKEN_KEY);
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          env.API_BASE_URL + env.endpoints.mi_usuario,
          {
            headers: { Authorization: `Token ${token}` },
          },
        );

        setPerfil(response.data);
      } catch (error) {
        window.location.href = "/account";
      }
    };

    fetchProfile();
  }, []);

  function profileData(p: User | null) {
    if (!p) {
      return <div>No profile data available</div>;
    }

    switch (p.rol) {
      case 1:
        return <AdminPerfil user={p} />;
      case 2:
        return <ClientePerfil user={p} />;
      case 3:
        return <EncargadoPerfil user={p} />;
      case 4:
        return <EmpresarioPerfil user={p} />;
      default:
        return <div>Unknown Role</div>;
    }
  }

  return profileData(perfil);
}
