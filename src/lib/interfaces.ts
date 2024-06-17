// Definición de la interfaz User que representa a un usuario
export interface User {
  id: number; // Identificador único del usuario
  username: string; // Nombre de usuario
  first_name: string; // Nombre de pila del usuario
  last_name: string; // Apellido del usuario
  email: string; // Correo electrónico del usuario
  tel: string; // Teléfono del usuario
  rol: number; // Rol del usuario (1: Admin, 2: Cliente, 3: Encargado, 4: Empresario)
  is_superuser: boolean; // Indica si el usuario es superusuario
  last_login: string | null; // Última fecha de inicio de sesión
}

// Definición de la interfaz AuthResponse que representa la respuesta de autenticación
export interface AuthResponse {
  token: string; // Token de autenticación
  user: User; // Información del usuario autenticado
}

// Definición de la interfaz Reservas que representa una reserva
export interface Reservas {
  id: number; // Identificador único de la reserva
  usuario: User; // Usuario que realizó la reserva
  local: Locales; // Local donde se realizó la reserva
  fecha: string; // Fecha de la reserva
  hora: string; // Hora de la reserva
  estado: string; // Estado de la reserva
}

// Definición de la interfaz ContextoProps para el contexto de autenticación
export interface ContextoProps {
  isLoggedIn: boolean; // Indica si el usuario está autenticado
  login: (token: string) => void; // Función para iniciar sesión
  logout: () => void; // Función para cerrar sesión
}

// Definición de la interfaz Categoria_Culinaria que representa una categoría culinaria
export interface Categoria_Culinaria {
  id: number; // Identificador único de la categoría
  nombre: string; // Nombre de la categoría
  descripcion: string; // Descripción de la categoría
}

// Definición de la interfaz Empresa que representa una empresa
export interface Empresa {
  id: number; // Identificador único de la empresa
  nombre: string; // Nombre de la empresa
  confirmado: boolean; // Indica si la empresa está confirmada
  usuario: number; // Identificador del usuario asociado a la empresa
  localNum: number; // Número de locales asociados a la empresa
}

// Definición de la interfaz FotoLocal que representa una foto de un local
export interface FotoLocal {
  id: number; // Identificador único de la foto
  imagen: string; // URL de la imagen
}

// Definición de la interfaz Producto que representa un producto
export interface Producto {
  id: number; // Identificador único del producto
  nombre_producto: string; // Nombre del producto
  descripcion: string; // Descripción del producto
  precio: number; // Precio del producto
  categoria: string; // Categoría del producto
  imagen: string; // URL de la imagen del producto
}

// Definición de la interfaz Horario que representa un horario de un local
export interface Horario {
  id: number; // Identificador único del horario
  hora_apertura: string; // Hora de apertura del local
  hora_cierre: string; // Hora de cierre del local
  dias: {
    [key: string]: boolean; // Días de la semana en los que el local está abierto
    L: boolean;
    M: boolean;
    X: boolean;
    J: boolean;
    V: boolean;
    S: boolean;
    D: boolean;
  };
}

// Definición de la interfaz TramoHorario que representa un tramo horario
export interface TramoHorario {
  id: number; // Identificador único del tramo horario
  h_inicio: string; // Hora de inicio del tramo
  h_final: string; // Hora de fin del tramo
  nombre: string; // Nombre del tramo
  clientes_maximos: number; // Número máximo de clientes permitido en el tramo
}

// Definición de la interfaz Comentario que representa un comentario en un local
export interface Comentario {
  id: number; // Identificador único del comentario
  usuario: User; // Usuario que realizó el comentario
  fecha: string; // Fecha del comentario
  comentario: string; // Contenido del comentario
  estrellas: number; // Puntuación del comentario
  respuesta: boolean; // Indica si el comentario es una respuesta
  respuestas: Comentario[]; // Respuestas al comentario
}

// Definición de la interfaz Locales que representa un local
export interface Locales {
  id: number; // Identificador único del local
  nombre: string; // Nombre del local
  direccion: string; // Dirección del local
  categoria_culinaria: Categoria_Culinaria; // Categoría culinaria del local
  empresa: Empresa; // Empresa a la que pertenece el local
  fotos: FotoLocal[]; // Fotos del local
  productos: Producto[]; // Productos disponibles en el local
  horarios: Horario[]; // Horarios del local
  tramos_horarios: TramoHorario[]; // Tramos horarios del local
  comentarios: Comentario[]; // Comentarios del local
}
