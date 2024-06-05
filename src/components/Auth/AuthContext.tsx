import { createContext, useState, ReactNode, useEffect } from "react";
import env from "@/lib/env";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const initialAuthContext: AuthContextProps = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

export const Contexto = createContext<AuthContextProps>(initialAuthContext);

export const Proveedor = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem(env.TOKEN_KEY);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem(env.TOKEN_KEY, token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(env.TOKEN_KEY);
    setIsLoggedIn(false);
  };

  return (
    <Contexto.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </Contexto.Provider>
  );
};
