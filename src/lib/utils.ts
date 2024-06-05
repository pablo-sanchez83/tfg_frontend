import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function estadoToString(estado: string) {
  switch (estado) {
    case "1":
      return "Pendiente";
    case "2":
      return "Aceptada";
    case "3":
      return "Rechazada";
  }
}

export function stringToEstado(estado: string) {
  switch (estado) {
    case "Pendiente":
      return 1;
    case "Aceptada":
      return 2;
    case "Rechazada":
      return 3;
  }
}