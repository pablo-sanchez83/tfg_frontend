const env = {
  // Base URL de la API
  API_BASE_URL: "https://web-production-6e7ec.up.railway.app/api",
  // Base URL para las imágenes
  API_BASE_URL_IMG: "http://web-production-6e7ec.up.railway.app",
  // Clave del token de autenticación almacenado en el localStorage
  TOKEN_KEY: "token",
  // Definición de los endpoints de la API
  endpoints: {
    login: "/login", // Endpoint para el login
    logout: "/logout", // Endpoint para el logout
    register: "/register", // Endpoint para el registro de usuarios
    mi_usuario: "/mi_usuario", // Endpoint para obtener la información del usuario autenticado
    mi_local: "/mi_local", // Endpoint para obtener la información del local del usuario autenticado
    usuarios: "/usuarios", // Endpoint para obtener la lista de usuarios
    empresas: "/empresas", // Endpoint para obtener la lista de empresas
    locales: "/locales", // Endpoint para obtener la lista de locales
    categorias_culinarias: "/categorias_culinarias", // Endpoint para obtener la lista de categorías culinarias
    mis_reservas: "/mis_reservas", // Endpoint para obtener la lista de reservas del usuario autenticado
    crear_reserva: "/reserva/crear", // Endpoint para crear una nueva reserva
    cancelar_reserva: (id: number) => `/cancelar_reserva/${id}`, // Endpoint para cancelar una reserva específica
    eliminar_reserva: (id: number) => `/eliminar_reserva/${id}`, // Endpoint para eliminar una reserva específica
    usuario: (id: number) => `/usuario/${id}`, // Endpoint para obtener, actualizar o eliminar un usuario específico
    empresa: (id: number) => `/empresa/${id}`, // Endpoint para obtener, actualizar o eliminar una empresa específica
    local: (id: number) => `/local/${id}`, // Endpoint para obtener, actualizar o eliminar un local específico
    eliminar_local: (id: number) => `/eliminar_local/${id}`, // Endpoint para eliminar un local específico
    categoria_culinaria: (id: number) => `/categoria_culinaria/${id}`, // Endpoint para obtener, actualizar o eliminar una categoría culinaria específica
    reservas_local: (id: number) => `/reservas/local/${id}`, // Endpoint para obtener las reservas de un local específico
    reserva_local: (idReserva: number, idLocal: number) => `/reserva/${idReserva}/local/${idLocal}`, // Endpoint para actualizar una reserva específica en un local específico
    crear_comentario: (idLocal: number) => `/crear_comentarios/local/${idLocal}`, // Endpoint para crear un comentario en un local específico
    tramos_horario_local: (idLocal: number) => `/tramos_horarios_subir/${idLocal}`, // Endpoint para subir tramos horarios de un local específico
    productos: "/productos", // Endpoint para obtener o crear productos
    horarios: "/horarios", // Endpoint para obtener o crear horarios
    crear_local: "/crear_local", // Endpoint para crear un nuevo local
    tramos_horarios: "/tramos_horarios", // Endpoint para obtener o crear tramos horarios
    fotos_locales: "/fotos_locales", // Endpoint para obtener o subir fotos de locales
  }
};

export default env;
