import axios from "axios";
import { useState, useEffect } from "react";
import { User } from "@/lib/interfaces";
import AdminPerfil from "./AdminPerfil";
import ClientePerfil from "./ClientePerfil";
import EmpresarioPerfil from "./EmpresarioPerfil";
import EncargadoPerfil from "./EncargadoPerfil";

export default function Perfil() {
    const [perfil, setPerfil] = useState<User | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await axios.get('http://127.0.0.1:8000/api/mi_usuario', {
                    headers: { Authorization: `Token ${token}` }
                });

                setPerfil(response.data);
            } catch (error) {
                console.error(error);
                setPerfil(null);
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
                return <AdminPerfil user = {p}/>;
            case 2:
                return <ClientePerfil user = {p}/>;
            case 3:
                return <EncargadoPerfil />;
            case 4:
                return <EmpresarioPerfil user = {p}/>;
            default:
                return <div>Unknown Role</div>;
        }
    }

    return profileData(perfil);
}