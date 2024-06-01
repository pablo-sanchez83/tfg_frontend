import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableCell, TableRow, TableHeader } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Reservas, User } from '@/lib/interfaces';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

    const phoneRegex = /\d{7,10}$/;
    const baseURL = 'http://127.0.0.1:8000/api';

    const editSchema = z.object({
        first_name: z.string().max(50),
        last_name: z.string().max(50),
        username: z.string().min(5, { message: "Mínimo 5 caracteres" }).max(50, { message: "Máximo 50 caracteres" }),
        email: z.string().email({ message: "Email inválido" }),
        tel: z.string().regex(phoneRegex, { message: "Teléfono inválido" })
    });

    const editForm = useForm<z.infer<typeof editSchema>>({
        resolver: zodResolver(editSchema),
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            tel: user.tel
        },
    });

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

    const onSubmit = (data: z.infer<typeof editSchema>) => {
        axios.patch(baseURL + '/mi_usuario', data, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
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
            <Card>
                    <CardHeader>
                        <CardTitle className='text-3xl text-center'>Editar Informacion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...editForm}>
                            <form onSubmit={editForm.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <FormField
                                    control={editForm.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nombre de usuario" {...field} />
                                            </FormControl>
                                            {editForm.formState.errors.username && (
                                                <p className="text-red-500">{editForm.formState.errors.username.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editForm.control}
                                    name="first_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nombre" {...field} />
                                            </FormControl>
                                            {editForm.formState.errors.first_name && (
                                                <p className="text-red-500">{editForm.formState.errors.first_name.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editForm.control}
                                    name="last_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Apellido" {...field} />
                                            </FormControl>
                                            {editForm.formState.errors.last_name && (
                                                <p className="text-red-500">{editForm.formState.errors.last_name.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={editForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            {editForm.formState.errors.email && (
                                                <p className="text-red-500">{editForm.formState.errors.email.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={editForm.control}
                                    name="tel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Tel electrónico" {...field} />
                                            </FormControl>
                                            {editForm.formState.errors.tel && (
                                                <p className="text-red-500">{editForm.formState.errors.tel.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Actualizar Información</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>

        </div>
    );
};

export default MisReservas;
