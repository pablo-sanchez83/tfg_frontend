export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    tel: string;
    rol: number;
    last_login: string | null;
}

export interface AuthResponse {
    token: string;
    user: User;
}
export interface Categoria_Culinaria {
    id: number;
    nombre: string;
    descripcion: string;
}
export interface Empresas {
    id : number;
    nombre : string;
    confirmado : boolean;
    usuario : number;
    localNum : number;
}
export interface Locales {
    id : number;
    usuario : User;
    direccion : string;
    categoria_culinaria : Categoria_Culinaria;
    empresa : Empresas;
}
