const env = {
  API_BASE_URL: "http://127.0.0.1:8000/api",
  TOKEN_KEY: "token",
  endpoints: {
    login: "/login",
    register: "/register",
    mi_usuario: "/mi_usuario",
    usuarios: "/usuarios",
    empresas: "/empresas",
    locales: "/locales",
    categorias_culinarias: "/categorias_culinarias",
    reservas: "/reservas",
    crear_reserva: "/reserva/crear",
    cancelar_reserva: (id: number) => `/cancelar_reserva/${id}`,
    eliminar_reserva: (id: number) => `/eliminar_reserva/${id}`,
    usuario: (id: number) => `/usuario/${id}`,
    empresa: (id: number) => `/empresa/${id}`,
    local: (id: number) => `/local/${id}`,
    productos: "/productos",
    horarios: "/horarios",
    tramos_horarios: "/tramos_horarios",
    fotos_locales: "/fotos_locales",
  }
};

export default env;
