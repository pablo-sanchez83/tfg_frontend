import axios from "axios"
import { Locales } from "@/lib/interfaces"
import { useEffect, useState } from "react"

import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router-dom"

export default function Index() {
    const [locales, setLocales] = useState<Locales[]>([])
    useEffect(() => {
        axios.get<Locales[]>("http://localhost:8000/api/locales")
            .then((res) => {
                setLocales(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {locales.map((local) => (
                <Card key={local.id} className="max-w-sm h-fit rounded shadow-lg m-4">
                    <CardHeader>
                        <Carousel className="w-full max-w-xs">
                            <CarouselContent>
                                {local.fotos.map((foto) => (
                                    <CarouselItem key={foto.id}><img className="max-h-60 min-h-56" src={"http://localhost:8000/" + foto.imagen} alt="Imagen del local" /></CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-xl mb-2">{local.nombre || 'Nombre no disponible'}</div>
                        <p className="text-gray-700 text-base">{local.direccion}</p>
                        <p className="text-gray-700 text-base">{local.categoria_culinaria.nombre}</p>
                        <p className="text-gray-700 text-base">{local.categoria_culinaria.descripcion}</p>
                    </CardContent>
                    <CardFooter className="justify-between gap-3">
                        <Link to={`/locales/${local.id}`} className="p-2 grid place-items-center rounded duration-100 hover:scale-110 text-white w-full bg-[#e67e22] font-bold uppercase hover:bg-white hover:text-[#e67e22] hover:border-[#e67e22] hover:border">Ver más</Link>
                        <Link to={`/reservar/${local.id}`} className="p-2 grid place-items-center rounded duration-100 hover:scale-110 w-full hover:bg-[#e67e22] font-bold uppercase border-[#e67e22] border bg-white text-[#e67e22] hover:text-white">Reservar</Link>
                    </CardFooter> 
                </Card>
            ))}
        </div>
    )
}