import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  Locales,
  TramoHorario,
  Comentario,
  FotoLocal,
  Producto,
  User,
} from "@/lib/interfaces";
import { ChevronLeft, Star, LoaderCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Contexto } from "@/components/Auth/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import env from "@/lib/env";

const EsquemaComentario = z.object({
  comentario: z
    .string()
    .min(10, { message: "El comentario debe tener al menos 10 caracteres." })
    .max(160, {
      message: "El comentario no debe tener más de 160 caracteres.",
    }),
  puntuacion: z.number().min(0).max(5),
});

const DetallesLocal: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [local, setLocal] = useState<Locales | null>(null);
  const [usuario, setUsuario] = useState<User | null>(null);
  const [comentarioAResponder, setComentarioAResponder] =
    useState<Comentario | null>(null);

  const contexto = useContext(Contexto);

  const formulario = useForm<z.infer<typeof EsquemaComentario>>({
    resolver: zodResolver(EsquemaComentario),
  });

  const formularioRespuesta = useForm<z.infer<typeof EsquemaComentario>>({
    resolver: zodResolver(EsquemaComentario),
  });

  if (!contexto) {
    throw new Error("El contexto debe ser utilizado dentro de un Proveedor");
  }
  const { isLoggedIn } = contexto;

  useEffect(() => {
    obtenerLocal();
    obtenerUsuario();
  }, [id, isLoggedIn]);

  function obtenerUsuario() {
    if (isLoggedIn) {
      axios
        .get<User>(env.API_BASE_URL + env.endpoints.mi_usuario, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setUsuario(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function obtenerLocal() {
    if (id) {
      axios
        .get<Locales>(env.API_BASE_URL + env.endpoints.local(parseInt(id)))
        .then((res) => {
          setLocal(res.data);
          document.title = res.data.nombre; // Actualiza el título aquí
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  if (!local) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  const diasDeLaSemana = [
    { label: "L", value: "L" },
    { label: "M", value: "M" },
    { label: "X", value: "X" },
    { label: "J", value: "J" },
    { label: "V", value: "V" },
    { label: "S", value: "S" },
    { label: "D", value: "D" },
  ];

  const renderizarDias = (dias: { [key: string]: boolean }) => {
    return diasDeLaSemana.map((dia, index) => (
      <span
        key={index}
        className={`px-2 py-1 rounded w-8 grid place-content-center text-white ${dias[dia.value] ? "bg-green-500" : "bg-red-500"}`}
      >
        {dia.label}
      </span>
    ));
  };

  const calcularMediaLikes = (comentarios: Comentario[]) => {
    if (comentarios.length === 0) {
      return 0;
    } else {
      let resultado = 0;
      comentarios.forEach((comentario) => {
        resultado += comentario.estrellas;
      });
      resultado = resultado / comentarios.length;
      return resultado.toFixed(2);
    }
  };

  function onSubmit(data: z.infer<typeof EsquemaComentario>) {
    const datosFormulario = {
      comentario: data.comentario,
      estrellas: data.puntuacion,
      local: local?.id?.toString() || "",
      respuesta: false,
      usuario: usuario?.id?.toString() || "",
    };

    axios
      .post(
        `http://127.0.0.1:8000/api/crear_comentarios/local/${local?.id}`,
        datosFormulario,
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        },
      )
      .then(() => {
        obtenerLocal();
        // no funciona :C
        formulario.reset();
      })
      .catch((error) => {
        console.error("Error al enviar comentario", error.response.data);
      });
  }

  function onSubmitRespuesta(data: z.infer<typeof EsquemaComentario>) {
    const datosFormulario = {
      comentario: data.comentario,
      estrellas: data.puntuacion,
      local: local?.id?.toString() || "",
      respuesta: true,
      usuario: usuario?.id?.toString() || "",
      respuesta_a: comentarioAResponder?.id?.toString() || "",
    };

    axios
      .post(
        `http://127.0.0.1:8000/api/crear_comentarios/local/${local?.id}`,
        datosFormulario,
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        },
      )
      .then(() => {
        obtenerLocal();
        formularioRespuesta.reset();
      })
      .catch((error) => {
        console.error("Error al enviar respuesta", error.response.data);
      })
      .finally(() => {
        setComentarioAResponder(null);
      });
  }

  // Organizar productos por categoría
  const productosPorCategoria = local.productos.reduce(
    (acc: { [key: string]: Producto[] }, producto) => {
      if (!acc[producto.categoria]) {
        acc[producto.categoria] = [];
      }
      acc[producto.categoria].push(producto);
      return acc;
    },
    {},
  );

  const Estrella = (
    <path d="M62 25.154H39.082L32 3l-7.082 22.154H2l18.541 13.693L13.459 61L32 47.309L50.541 61l-7.082-22.152L62 25.154z" />
  ); // Fuente: https://www.svgrepo.com/svg/353297/star

  const estilosPersonalizados = {
    itemShapes: Estrella,
    boxBorderWidth: 2,

    activeFillColor: ["#FEE2E2", "#FFEDD5", "#FEF9C3", "#ECFCCB", "#D1FAE5"],
    activeBoxColor: ["#da1600", "#db711a", "#dcb000", "#61bb00", "#009664"],
    activeBoxBorderColor: [
      "#c41400",
      "#d05e00",
      "#cca300",
      "#498d00",
      "#00724c",
    ],

    inactiveFillColor: "white",
    inactiveBoxColor: "#dddddd",
    inactiveBoxBorderColor: "#a8a8a8",
  };

  const renderizarComentarios = (comentarios: Comentario[], nivel = 0) => {
    const margenDerecho = nivel * 20; // Ajusta el multiplicador según sea necesario

    return comentarios.map((comentario: Comentario, index) => (
      <div
        key={index}
        className={`flex flex-col items-start justify-center mt-4 box-border bg-gray-100 p-4 w-full mb-4 border rounded max-w-2xl`}
        style={{ marginRight: `${margenDerecho}px` }}
      >
        <p>
          <strong>Usuario:</strong> {comentario.usuario.username}
        </p>
        <p>
          <strong>Fecha:</strong> {comentario.fecha}
        </p>
        <p>
          <strong>Comentario:</strong>
          <br /> {comentario.comentario}
        </p>
        <p>
          <strong>Puntuación:</strong>{" "}
          <Rating
            style={{ maxWidth: 150 }}
            itemStyles={estilosPersonalizados}
            radius="large"
            spaceBetween="small"
            spaceInside="small"
            value={comentario.estrellas}
            readOnly
          />
        </p>
        {isLoggedIn && (
          <Button
            onClick={() => setComentarioAResponder(comentario)}
            className="bg-[#e67e22] text-white font-bold py-2 px-4 rounded mt-4"
          >
            Responder
          </Button>
        )}
        {comentario.respuestas &&
          renderizarComentarios(comentario.respuestas, nivel + 1)}
      </div>
    ));
  };

  return (
    <div className="flex flex-col space-y-10 max-w-80">
      <Link to="/" className="text-blue-500 flex">
        <ChevronLeft /> Volver
      </Link>
      <h1 className="text-2xl font-bold flex items-center">
        <span>{local.nombre}</span>{" "}
        <span className="bg-gray-200 px-2 py-1 rounded ml-2 flex items-center">
          <Star fill="#EAB39D" className="text-yellow-500 w-5 h-5" />
          {calcularMediaLikes(local.comentarios)}
        </span>
      </h1>
      <div className="mt-4">
        <Carousel className="w-full">
          <CarouselContent>
            {local.fotos.map((foto: FotoLocal, index) => (
              <CarouselItem key={index}>
                <img
                  className="h-auto w-full"
                  src={env.API_BASE_URL_IMG + foto.imagen}
                  alt={`Imagen ${index + 1}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="mt-4">
        <p>
          <strong>Dirección:</strong> {local.direccion}
        </p>
        <p>
          <strong>Categoría culinaria: </strong> {local.categoria_culinaria.nombre}
        </p>
        <p>
          {local.categoria_culinaria.descripcion}
        </p>
        <p>
          <strong>Horario:</strong>{" "}
          {local.horarios
            .map(
              (horario) => `${horario.hora_apertura} - ${horario.hora_cierre}`,
            )
            .join(", ")}
        </p>
        <div className="flex space-x-2 mt-2">
          {local.horarios.map((horario, index) => (
            <div key={index} className="flex space-x-1">
              {renderizarDias(horario.dias)}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Tramos Horarios</h2>
        {local.tramos_horarios.map((tramo: TramoHorario, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-center bg-gray-100 p-4 w-full"
          >
            <p>
              <strong>{tramo.nombre}:</strong> {tramo.h_inicio} -{" "}
              {tramo.h_final}
            </p>
            <p>
              <strong>Máximo de Clientes por Reserva:</strong> {tramo.clientes_maximos}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Link
          to={`/reservar/${local.id}`}
          className="bg-[#e67e22] text-white font-bold py-2 px-4 rounded mt-4"
        >
          Reservar
        </Link>
        <Dialog>
          <DialogTrigger>
            <Button className="bg-[#e67e22] text-white font-bold py-2 px-4 rounded mt-4">
              Productos
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl">Productos</DialogTitle>
              <DialogDescription>
                Lista de productos del local
              </DialogDescription>
            </DialogHeader>
            {Object.keys(productosPorCategoria).map((categoria, index) => (
              <div key={index}>
                <h1 className="text-xl font-bold">{categoria}</h1>
                <ul>
                  {productosPorCategoria[categoria].map(
                    (producto: Producto, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center bg-gray-100 p-4 w-full mb-4 border rounded"
                      >
                        <img
                          src={env.API_BASE_URL + producto.imagen}
                          alt={producto.nombre_producto}
                          className="w-full h-auto"
                        />
                        <li className="py-2">
                          <h2 className="text-md font-semibold">
                            {producto.nombre_producto}
                          </h2>
                          <p>{producto.descripcion}</p>
                          <p>Precio: {producto.precio}€</p>
                        </li>
                      </div>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </DialogContent>
        </Dialog>
      </div>
      {isLoggedIn && (
        <div className="p-4 bg-gray-100 border rounded">
          <Form {...formulario}>
            <form
              onSubmit={formulario.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={formulario.control}
                name="comentario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="comentario">Tu comentario</FormLabel>
                    <FormControl>
                      <Textarea
                        id="comentario"
                        placeholder="Escribe tu comentario"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formulario.control}
                name="puntuacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="slider">Tu puntuación</FormLabel>
                    <FormControl>
                      <Rating
                        style={{ maxWidth: 250 }}
                        itemStyles={estilosPersonalizados}
                        radius="large"
                        spaceBetween="small"
                        spaceInside="large"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#e67e22] text-white font-bold py-2 px-4 rounded mt-4"
              >
                Comentar
              </Button>
            </form>
          </Form>
        </div>
      )}

      <div className="mt-4">
        <h2 className="text-xl font-bold">Comentarios</h2>
        {renderizarComentarios(local.comentarios)}
      </div>
      <Dialog
        open={!!comentarioAResponder}
        onOpenChange={() => setComentarioAResponder(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Responder a Comentario</DialogTitle>
            <DialogDescription>
              Responder al comentario de{" "}
              {comentarioAResponder?.usuario.username}
            </DialogDescription>
          </DialogHeader>
          <Form {...formularioRespuesta}>
            <form
              onSubmit={formularioRespuesta.handleSubmit(onSubmitRespuesta)}
              className="space-y-6"
            >
              <FormField
                control={formularioRespuesta.control}
                name="comentario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="comentario">Tu respuesta</FormLabel>
                    <FormControl>
                      <Textarea
                        id="comentario"
                        placeholder="Escribe tu respuesta"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formularioRespuesta.control}
                name="puntuacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="slider">Tu puntuación</FormLabel>
                    <FormControl>
                      <Rating
                        style={{ maxWidth: 250 }}
                        itemStyles={estilosPersonalizados}
                        radius="large"
                        spaceBetween="small"
                        spaceInside="large"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-[#e67e22] text-white font-bold py-2 px-4 rounded mt-4"
              >
                Responder
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetallesLocal;
