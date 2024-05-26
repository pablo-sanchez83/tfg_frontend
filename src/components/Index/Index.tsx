import axios from "axios"
import { Locales } from "@/lib/interfaces"
import { useState } from "react"
export default function Index() {
    const [locales, setLocales] = useState<Locales[]>([])
    axios.get<Locales[]>("http://localhost:8000/api/locales")
        .then((res) => {
            setLocales(res.data)
            console.log(locales)
        })
        .catch((err) => {
            console.log(err)
        })
    return (
        <div>
            {locales.map((local, index) => (
                <li key={index}>{local.empresa.nombre}</li>
            ))}
        </div>
    )
}