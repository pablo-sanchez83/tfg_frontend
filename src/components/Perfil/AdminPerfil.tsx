import { Table, TableHead, TableBody, TableCell, TableRow, TableHeader } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Empresa, User } from '@/lib/interfaces';

export default function AdminPerfil({ user }: { user: User }) {
    const [users, setUsers] = useState<User[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);

    const phoneRegex = /\d{7,10}$/;

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

    const baseURL = 'http://127.0.0.1:8000/api';

    useEffect(() => {
        fetchUsers();
        fetchEmpresas();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(baseURL + '/usuarios', { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchEmpresas = async () => {
        try {
            const response = await axios.get(baseURL + '/empresas', { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            setEmpresas(response.data);
        } catch (error) {
            console.error('Error fetching empresas:', error);
        }
    };

    const handleDeleteUser = async (id: number) => {
        try {
            await axios.delete(baseURL + `/usuario/${id}`, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleDeleteEmpresa = async (id: number) => {
        try {
            await axios.delete(baseURL + `/empresa/${id}`, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            setEmpresas(empresas.filter(empresa => empresa.id !== id));
        } catch (error) {
            console.error('Error deleting empresa:', error);
        }
    };

    const handleToggleConfirmado = async (id: number, confirmado: boolean) => {
        try {
            await axios.patch(`${baseURL}/empresa/${id}`, { confirmado }, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
            setEmpresas(empresas.map(empresa => empresa.id === id ? { ...empresa, confirmado } : empresa));
        } catch (error) {
            console.error('Error updating confirmado:', error);
        }
    };

    const onSubmit = (data: z.infer<typeof editSchema>) => {
        axios.patch(baseURL + '/mi_usuario', data, { headers: { Authorization: `Token ${localStorage.getItem('token')}` } })
    };

    return (
        <div className='flex gap-4 w-full'>
            <div className='flex flex-col gap-4 w-3/4'>
                <Card className='h-1/2 overflow-auto'>
                    <CardHeader>
                        <CardTitle>Usuarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Username</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.tel}</TableCell>
                                            <TableCell>{user.rol}</TableCell>
                                            <TableCell><Button className='bg-red-500' onClick={() => handleDeleteUser(user.id)}><Trash /></Button></TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8}>No hay usuarios</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card className='h-1/2 overflow-auto'>
                    <CardHeader>
                        <CardTitle>Empresas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Confirmado</TableHead>
                                    <TableHead>Numero Locales</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {empresas.length > 0 ? (
                                    empresas.map((empresa) => (
                                        <TableRow key={empresa.id}>
                                            <TableCell>{empresa.nombre}</TableCell>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={empresa.confirmado}
                                                    onChange={() => handleToggleConfirmado(empresa.id, !empresa.confirmado)}
                                                />
                                            </TableCell>
                                            <TableCell>{empresa.localNum}</TableCell>
                                            <TableCell>
                                                <Button className='bg-red-500' onClick={() => handleDeleteEmpresa(empresa.id)}><Trash /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4}>No hay empresas</TableCell>
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
}
