import { ContextoProps } from "@/lib/interfaces";
import { createContext, useState, useEffect, useCallback } from "react";

export const Contexto = createContext<ContextoProps | undefined>(undefined)
export const Proveedor = ({ children } : { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkToken = useCallback(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        checkToken();
        window.addEventListener('storage', checkToken);
        return () => {
            window.removeEventListener('storage', checkToken);
        };
    }, [checkToken]);
    const login = (token: string) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
    };
    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };
    return (
        <Contexto.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </Contexto.Provider>
    );
}