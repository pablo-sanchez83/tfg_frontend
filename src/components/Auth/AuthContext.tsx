import { createContext, useState, ReactNode, useEffect } from "react";
import env from "@/lib/env";
import axios from "axios";

// Interfaz para el contexto de autenticación
interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Estado inicial del contexto de autenticación
const initialAuthContext: AuthContextProps = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

// Creación del contexto de autenticación
export const Contexto = createContext<AuthContextProps>(initialAuthContext);

// Proveedor del contexto de autenticación
export const Proveedor = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Efecto para comprobar el estado de autenticación al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem(env.TOKEN_KEY);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Función para manejar el inicio de sesión
  const login = (token: string) => {
    localStorage.setItem(env.TOKEN_KEY, token);
    setIsLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const logout = () => {
    axios.get(env.API_BASE_URL + env.endpoints.logout, {
      headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
    });
    localStorage.removeItem(env.TOKEN_KEY);
    setIsLoggedIn(false);
  };

  return (
    // Provisión del contexto de autenticación a los componentes hijos
    <Contexto.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </Contexto.Provider>
  );
};

