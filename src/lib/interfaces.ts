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