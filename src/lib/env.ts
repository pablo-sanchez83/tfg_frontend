const env = {
  API_BASE_URL: "https://web-production-6e7ec.up.railway.app/api",
  API_BASE_URL_IMG: "http://web-production-6e7ec.up.railway.app/api",
  TOKEN_KEY: "token",
  endpoints: {
    login: "/login",
    logout: "/logout",
    register: "/register",
    mi_usuario: "/mi_usuario",
    mi_local: "/mi_local",
    usuarios: "/usuarios",
    empresas: "/empresas",
    locales: "/locales",
    categorias_culinarias: "/categorias_culinarias",
    mis_reservas: "/mis_reservas",
    crear_reserva: "/reserva/crear",
    cancelar_reserva: (id: number) => `/cancelar_reserva/${id}`,
    eliminar_reserva: (id: number) => `/eliminar_reserva/${id}`,
    usuario: (id: number) => `/usuario/${id}`,
    empresa: (id: number) => `/empresa/${id}`,
    local: (id: number) => `/local/${id}`,
    eliminar_local: (id: number) => `/eliminar_local/${id}`,
    categoria_culinaria: (id: number) => `/categoria_culinaria/${id}`,
    reservas_local: (id: number) => `/reservas/local/${id}`,
    reserva_local: (idReserva: number, idLocal: number) => `/reserva/${idReserva}/local/${idLocal}`,
    productos: "/productos",
    horarios: "/horarios",
    crear_local: "/crear_local",
    tramos_horarios: "/tramos_horarios",
    fotos_locales: "/fotos_locales",
  }
};

export default env;
