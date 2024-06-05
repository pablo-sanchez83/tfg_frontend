import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Reservas } from "@/lib/interfaces";
import { estadoToString } from "@/lib/utils";
import axios from "axios";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";

export default function MisReservas() {
    const [reservas, setReservas] = useState<Reservas[]>([]);

    const baseURL = "http://127.0.0.1:8000/api";

    const fetchReservas = async () => {
        try {
            const response = await axios.get(baseURL + "/mis_reservas", {
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
            });
            setReservas(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching reservas:", error);
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const handleEliminarReserva = async (id: number) => {
        try {
            await axios.patch(
                baseURL + `/cancelar_reserva/${id}`,
                {},
                {
                    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
                },
            );
            await axios.delete(baseURL + `/eliminar_reserva/${id}`, {
                headers: { Authorization: `Token ${localStorage.getItem("token")}` },
            });
            location.reload();
            fetchReservas();

        } catch (error) {
            console.error("Error deleting reserva:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mis Reservas</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Local</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Hora</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reservas.length > 0 ? (
                            reservas.map((reserva, index) => (
                                <TableRow key={index}>
                                    <TableCell>{reserva.local.nombre}</TableCell>
                                    <TableCell>
                                        {format(new Date(reserva.fecha), "dd/MM/yyyy")}
                                    </TableCell>
                                    <TableCell>{reserva.hora}</TableCell>
                                    <TableCell>{estadoToString(reserva.estado.toString())}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger><MoreVertical /></DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {reserva.fecha >=
                                                    new Date().toISOString().split("T")[0] ? (
                                                    <>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleEliminarReserva(reserva.id)
                                                            }
                                                        >
                                                            Cancelar y eliminar
                                                        </DropdownMenuItem>
                                                    </>
                                                ) : (
                                                    <DropdownMenuItem
                                                        onClick={() => handleEliminarReserva(reserva.id)}
                                                    >
                                                        Eliminar
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>No tienes reservas.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
