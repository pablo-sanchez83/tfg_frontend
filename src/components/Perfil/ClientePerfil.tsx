import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableCell, TableRow, TableHeader } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Reservas, User } from '@/lib/interfaces';
import { format } from 'date-fns';
import EditarPerfil from './EditarPerfil';

const MisReservas = ({ user }: { user: User }) => {
    const [reservas, setReservas] = useState<Reservas[]>([]);

    const fetchReservas = async () => {
        try {
            const response = await axios.get(baseURL + '/mis_reservas', { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            setReservas(response.data);
        } catch (error) {
            console.error('Error fetching reservas:', error);
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);
    const baseURL = 'http://127.0.0.1:8000/api';

    const handleCancelarReserva = async (id: number) => {
        try {
            await axios.patch(baseURL + `/cancelar_reserva/${id}`, {}, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            fetchReservas();
        } catch (error) {
            console.error('Error canceling reserva:', error);
        }
    };

    const handleEliminarReserva = async (id: number) => {
        try {
            await axios.delete(baseURL + `/eliminar_reserva/${id}`, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            fetchReservas();
        } catch (error) {
            console.error('Error deleting reserva:', error);
        }
    };

    return (
        <div className='flex gap-4 w-full'>
            <div className='flex flex-col gap-4 w-3/4'>
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
                                    reservas.map((reserva) => (
                                        <TableRow key={reserva.id}>
                                            <TableCell>{reserva.local.nombre}</TableCell>
                                            <TableCell>{format(new Date(reserva.fecha), 'dd/MM/yyyy')}</TableCell>
                                            <TableCell>{reserva.hora}</TableCell>
                                            <TableCell>{reserva.estado}</TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    {reserva.fecha >= new Date().toISOString().split('T')[0] ? (
                                                        <>
                                                            <DropdownMenuItem onClick={() => handleCancelarReserva(reserva.id)}>Cancelar</DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleEliminarReserva(reserva.id)}>Eliminar</DropdownMenuItem>
                                                        </>
                                                    ) : (
                                                        <DropdownMenuItem onClick={() => handleEliminarReserva(reserva.id)}>Eliminar</DropdownMenuItem>
                                                    )}
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
            </div>
            <div className='w-1/4'>
            <EditarPerfil user={user} />
            </div>

        </div>
    );
};

export default MisReservas;
