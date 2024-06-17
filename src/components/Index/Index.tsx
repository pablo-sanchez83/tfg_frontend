import axios from "axios";
import { Locales, Categoria_Culinaria, User } from "@/lib/interfaces";
import { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import env from "@/lib/env";

// Componente principal para la página de inicio
export default function Index() {
  // Estado para almacenar los locales
  const [locales, setLocales] = useState<Locales[]>([]);
  // Estado para almacenar las categorías culinarias
  const [categorias, setCategorias] = useState<Categoria_Culinaria[]>([]);
  // Estado para almacenar la información del usuario
  const [usuario, setUsuario] = useState<User>();
  // Estado para la categoría seleccionada
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("todas");

  // Efecto para cargar datos iniciales
  useEffect(() => {
    // Obtener locales
    axios
      .get<Locales[]>(env.API_BASE_URL + env.endpoints.locales)
      .then((res) => {
        setLocales(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Obtener categorías culinarias
    axios
      .get<Categoria_Culinaria[]>(
        env.API_BASE_URL + env.endpoints.categorias_culinarias
      )
      .then((res) => {
        setCategorias(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Obtener información del usuario
    axios.get<User>(
      env.API_BASE_URL + env.endpoints.mi_usuario,
      {
        headers: {
          "Authorization": `Token ${localStorage.getItem(env.TOKEN_KEY)}`
        }
      })
      .then(res => {
        setUsuario(res.data);
      })
  }, []);

  // Manejar cambio de categoría
  const handleCategoriaChange = (value: string) => {
    setCategoriaSeleccionada(value);
  };

  // Filtrar locales por categoría seleccionada
  const localesFiltrados =
    categoriaSeleccionada !== "todas"
      ? locales.filter(
        (local) =>
          local.categoria_culinaria.id === parseInt(categoriaSeleccionada)
      )
      : locales;

  return (
    <main className="flex flex-col items-center">
      <div className="flex justify-center my-4 w-full max-w-md">
        <Select onValueChange={handleCategoriaChange}>
          <SelectTrigger className="p-2 border rounded w-full">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorías</SelectItem>
            {categorias.map((categoria, index) => (
              <SelectItem key={index} value={categoria.id.toString()}>
                {categoria.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {localesFiltrados.length > 0 ? (
          localesFiltrados.map((local, index) => (
            <Card key={index} className="max-w-sm h-fit rounded shadow-lg m-4">
              <CardHeader>
                <Carousel className="w-full max-w-xs">
                  <CarouselContent>
                    {local.fotos.map((foto, index) => (
                      <CarouselItem key={index}>
                        <img
                          className="h-60 min-w-full"
                          src={env.API_BASE_URL_IMG + foto.imagen}
                          alt="Imagen del local"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-xl mb-2">
                  {local.nombre || "Nombre no disponible"}
                </div>
                <p className="text-gray-700 text-base">{local.direccion}</p>
                <p className="text-gray-700 text-base">
                  {local.categoria_culinaria.nombre}
                </p>
              </CardContent>
              <CardFooter className="justify-between gap-3">
                <Link
                  to={`/locales/${local.id}`}
                  className="p-2 grid place-items-center rounded duration-100 hover:scale-110 text-white w-full bg-[#e67e22] font-bold uppercase hover:bg-white hover:text-[#e67e22] hover:border-[#e67e22] hover:border"
                >
                  Ver más
                </Link>
                {usuario && (
                  <Link
                    to={`/reservar/${local.id}`}
                    className="p-2 grid place-items-center rounded duration-100 hover:scale-110 w-full hover:bg-[#e67e22] font-bold uppercase border-[#e67e22] border bg-white text-[#e67e22] hover:text-white"
                  >
                    Reservar
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-center w-full">No hay locales en esta categoría</p>
        )}
      </div>
    </main>
  );
}
