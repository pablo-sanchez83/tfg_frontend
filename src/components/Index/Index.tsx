import axios from "axios"
import { Locales } from "@/lib/interfaces"
import { useEffect, useState } from "react"

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

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
        <div className="flex flex-wrap justify-center">
            {locales.map((local) => (
                <Card className="max-w-sm rounded shadow-lg m-4">
                    <CardHeader>
                        <Carousel className="w-full max-w-xs">
                            <CarouselContent>
                                {local.fotos.map((foto) => (
                                    <CarouselItem key={foto.id}><img className="max-h-60" src={"http://localhost:8000/" + foto.imagen} alt="Imagen del local" /></CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </CardHeader>
                    <CardContent>
                        <div className="font-bold text-xl mb-2">{local.empresa.nombre || 'Nombre no disponible'}</div>
                        <p className="text-gray-700 text-base">{local.direccion}</p>
                        <p className="text-gray-700 text-base">{local.categoria_culinaria.nombre}</p>
                        <p className="text-gray-700 text-base">{local.categoria_culinaria.descripcion}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}