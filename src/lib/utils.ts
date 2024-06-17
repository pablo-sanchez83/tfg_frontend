import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Función para combinar clases utilizando clsx y tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Función para convertir el estado de reserva de número a cadena
export function estadoToString(estado: string) {
  switch (estado) {
    case "1":
      return "Pendiente";
    case "2":
      return "Aceptada";
    case "3":
      return "Rechazada";
    default:
      return "Desconocido";
  }
}

// Función para convertir el estado de reserva de cadena a número
export function stringToEstado(estado: string) {
  switch (estado) {
    case "Pendiente":
      return 1;
    case "Aceptada":
      return 2;
    case "Rechazada":
      return 3;
    default:
      return 0; // Retorno de valor por defecto en caso de estado desconocido
  }
}
