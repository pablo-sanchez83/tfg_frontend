import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Locales, Producto, TramoHorario, Comentario } from '@/lib/interfaces';
import { LoaderCircle } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';

const LocalDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [local, setLocal] = useState<Locales | null>(null);

    useEffect(() => {
        if (id) {
            axios.get<Locales>(`http://localhost:8000/api/local/${id}`)
                .then((res) => {
                    console.log(res.data);
                    setLocal(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    if (!local) {
        return <div className="flex justify-center items-center h-screen"><LoaderCircle className="w-10 h-10 animate-spin" /></div>;
    }

    return (
        <section>
            <h1 className="text-3xl font-bold mb-4">{local.nombre}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-lg font-bold mb-2">Información del Local</h2>
                    <p><strong>Dirección:</strong> {local.direccion}</p>
                    <p><strong>Categoria:</strong> {local.categoria_culinaria.nombre}</p>
                    <p><strong>Empresa:</strong> {local.empresa.nombre}</p>
                    <p><strong>Confirmado:</strong> {local.empresa.confirmado ? "Sí" : "No"}</p>
                    <p><strong>Número de Local:</strong> {local.empresa.localNum}</p>
                    <h3 className="text-lg font-bold mt-4">Horarios</h3>
                    {local.horarios.map((horario) => (
                        <div key={horario.id}>
                            <p><strong>Días:</strong> {Object.entries(horario.dias).filter(([value]) => value).map(([key]) => key).join(', ')}</p>
                            <p><strong>Hora de Apertura:</strong> {horario.hora_apertura}</p>
                            <p><strong>Hora de Cierre:</strong> {horario.hora_cierre}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h2 className="text-lg font-bold mb-2">Fotos del Local</h2>
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {local.fotos.map((foto) => (
                                <CarouselItem key={foto.id}>
                                    <img className="max-h-60 min-h-56" src={"http://localhost:8000/" + foto.imagen} alt="Imagen del local" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Productos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {local.productos.map((producto: Producto) => (
                        <div key={producto.id} className="border p-4">
                            <img className="w-full h-32 object-cover mb-2" src={"http://localhost:8000/" + producto.imagen} alt={producto.nombre} />
                            <h3 className="text-md font-bold">{producto.nombre}</h3>
                            <p>{producto.descripcion}</p>
                            <p><strong>Precio:</strong> {producto.precio} €</p>
                            <p><strong>Categoria:</strong> {producto.categoria}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Tramos Horarios</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {local.tramos_horarios.map((tramo: TramoHorario) => (
                        <div key={tramo.id} className="border p-4">
                            <h3 className="text-md font-bold">{tramo.nombre}</h3>
                            <p><strong>Inicio:</strong> {tramo.h_inicio}</p>
                            <p><strong>Final:</strong> {tramo.h_final}</p>
                            <p><strong>Máximo de Clientes:</strong> {tramo.clientes_maximos}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-2">Comentarios</h2>
                <div className="space-y-4">
                    {local.comentarios.map((comentario: Comentario) => (
                        <div key={comentario.id} className="border p-4">
                            <p><strong>Usuario:</strong> {comentario.usuario}</p>
                            <p><strong>Fecha:</strong> {comentario.fecha}</p>
                            <p><strong>Comentario:</strong> {comentario.comentario}</p>
                            <p><strong>Estrellas:</strong> {comentario.estrellas}</p>
                            <p><strong>Respuesta:</strong> {comentario.respuesta ? "Sí" : "No"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LocalDetails;