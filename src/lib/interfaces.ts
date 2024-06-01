export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    tel: string;
    rol: number;
    is_superuser: boolean;
    last_login: string | null;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface Reservas {
    id: number;
    local: Locales;
    fecha: string;
    hora: string;
    estado: string;
}

export interface ContextoProps {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export interface Categoria_Culinaria {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface Empresa {
    id: number;
    nombre: string;
    confirmado: boolean;
    usuario: number;
    localNum: number;
}

export interface FotoLocal {
    id: number;
    imagen: string;
}

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    imagen: string;
}

export interface Horario {
    id: number;
    hora_apertura: string;
    hora_cierre: string;
    dias: {
        L: boolean;
        M: boolean;
        X: boolean;
        J: boolean;
        V: boolean;
        S: boolean;
        D: boolean;
    };
}

export interface TramoHorario {
    id: number;
    h_inicio: string;
    h_final: string;
    nombre: string;
    clientes_maximos: number;
}

export interface Comentario {
    id: number;
    usuario: number;
    fecha: string;
    comentario: string;
    estrellas: number;
    respuesta: boolean;
}

export interface Locales {
    id: number;
    nombre: string;
    direccion: string;
    categoria_culinaria: Categoria_Culinaria;
    empresa: Empresa;
    fotos: FotoLocal[];
    productos: Producto[];
    horarios: Horario[];
    tramos_horarios: TramoHorario[];
    comentarios: Comentario[];
}
export interface Horario {
    id: number;
    hora_apertura: string;
    hora_cierre: string;
    L: boolean;
    M: boolean;
    X: boolean;
    J: boolean;
    V: boolean;
    S: boolean;
    D: boolean;
}