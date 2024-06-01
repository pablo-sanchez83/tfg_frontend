import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHead, TableBody, TableCell, TableRow, TableHeader } from '@/components/ui/table';
import { Locales, Producto, Horario, TramoHorario, Reservas, FotoLocal } from '@/lib/interfaces';

const localSchema = z.object({
    nombre: z.string().max(100),
    direccion: z.string().max(255),
});

const productoSchema = z.object({
    nombre_producto: z.string().max(100),
    descripcion: z.string(),
    precio: z.string(),
    categoria: z.string().optional(),
    imagen: z.any().optional(),
});

const horarioSchema = z.object({
    hora_apertura: z.string(),
    hora_cierre: z.string(),
    L: z.boolean(),
    M: z.boolean(),
    X: z.boolean(),
    J: z.boolean(),
    V: z.boolean(),
    S: z.boolean(),
    D: z.boolean(),
});

const tramoHorarioSchema = z.object({
    h_inicio: z.string(),
    h_final: z.string(),
    nombre: z.string().max(100),
    clientes_maximos: z.string().max(3),
});

const fotoLocalSchema = z.object({
    imagen: z.any(),
});

type Dia = 'L' | 'M' | 'X' | 'J' | 'V' | 'S' | 'D';

const dias: Dia[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

export default function EncargadoPerfil() {
    const [local, setLocal] = useState<Locales>({} as Locales);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [horarios, setHorarios] = useState<Horario[]>([]);
    const [tramos, setTramos] = useState<TramoHorario[]>([]);
    const [reservas, setReservas] = useState<Reservas[]>([]);
    const [fotos, setFotos] = useState<FotoLocal[]>([]);
    const baseURL = 'http://127.0.0.1:8000/api';

    const localForm = useForm<z.infer<typeof localSchema>>({
        resolver: zodResolver(localSchema),
        defaultValues: {
            nombre: '',
            direccion: '',
        },
    });

    const productoForm = useForm<z.infer<typeof productoSchema>>({
        resolver: zodResolver(productoSchema),
        defaultValues: {
            nombre_producto: '',
            descripcion: '',
            precio: '0.00',
            categoria: '',
        },
    });

    const horarioForm = useForm<z.infer<typeof horarioSchema>>({
        resolver: zodResolver(horarioSchema),
        defaultValues: {
            hora_apertura: '',
            hora_cierre: '',
            L: false,
            M: false,
            X: false,
            J: false,
            V: false,
            S: false,
            D: false,
        },
    });

    const tramoHorarioForm = useForm<z.infer<typeof tramoHorarioSchema>>({
        resolver: zodResolver(tramoHorarioSchema),
        defaultValues: {
            h_inicio: '',
            h_final: '',
            nombre: '',
            clientes_maximos: '0',
        },
    });

    const fotoForm = useForm<z.infer<typeof fotoLocalSchema>>({
        resolver: zodResolver(fotoLocalSchema),
        defaultValues: {
            imagen: null,
        },
    });

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = () => {
        fetchLocal();
        fetchProductos();
        fetchHorarios();
        fetchTramos();
        fetchReservas();
    };

    const fetchLocal = async () => {
        try {
            const response = await axios.get(`${baseURL}/mi_local`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setLocal(response.data);
            setFotos(response.data.fotos);
            localForm.reset(response.data);
        } catch (error) {
            console.error('Error fetching local:', error);
        }
    };
    const fetchProductos = async () => {
        try {
            const response = await axios.get(`${baseURL}/productos`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setProductos(response.data);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const fetchHorarios = async () => {
        try {
            const response = await axios.get(`${baseURL}/horarios`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setHorarios(response.data);
        } catch (error) {
            console.error('Error fetching horarios:', error);
        }
    };

    const fetchTramos = async () => {
        try {
            const response = await axios.get(`${baseURL}/tramos_horarios`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setTramos(response.data);
        } catch (error) {
            console.error('Error fetching tramos horarios:', error);
        }
    };

    const fetchReservas = async () => {
        try {
            const response = await axios.get(`${baseURL}/reservas`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setReservas(response.data);
        } catch (error) {
            console.error('Error fetching reservas:', error);
        }
    };

    const handleUpdateLocal: SubmitHandler<z.infer<typeof localSchema>> = async (data) => {
        try {
            await axios.patch(`${baseURL}/local/${local.id}`, data, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            fetchLocal();
        } catch (error) {
            console.error('Error updating local:', error);
        }
    };

    const handleAddProducto: SubmitHandler<z.infer<typeof productoSchema>> = async (data) => {
        const formData = new FormData();
        formData.append('nombre_producto', data.nombre_producto);
        formData.append('descripcion', data.descripcion);
        formData.append('precio', parseFloat(data.precio).toString());
        formData.append('categoria', data.categoria || '');
        if (data.imagen[0]) {
            formData.append('imagen', data.imagen[0]);
        }

        console.log("Form Data:", ...formData.entries()); // Log the FormData to check its content

        try {
            await axios.post(`${baseURL}/productos`, formData, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' },
            });
            fetchProductos();
        } catch (error) {
            console.error('Error adding producto:', error);
        }
    };

    const handleAddHorario: SubmitHandler<z.infer<typeof horarioSchema>> = async (data) => {
        try {
            await axios.post(`${baseURL}/horarios`, { ...data, local: local.id }, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            fetchHorarios();
        } catch (error) {
            console.error('Error adding horario:', error);
        }
    };

    const handleAddTramoHorario: SubmitHandler<z.infer<typeof tramoHorarioSchema>> = async (data) => {
        const formData = new FormData();
        formData.append('h_inicio', data.h_inicio);
        formData.append('h_fin', data.h_final);
        formData.append('nombre', data.nombre);
        formData.append('clientes_maximos', data.clientes_maximos.toString());
        formData.append('local', local.id.toString());

        try {
            await axios.post(`${baseURL}/tramos_horarios`, { ...data, local: local.id }, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            fetchTramos();
        } catch (error) {
            console.error('Error adding tramo horario:', error);
        }
    };

    const handleAddFoto: SubmitHandler<z.infer<typeof fotoLocalSchema>> = async (data) => {
        const formData = new FormData();
        formData.append('imagen', data.imagen[0]);
        formData.append('local', local.id.toString());
        try {
            await axios.post(`${baseURL}/fotos_locales`, formData, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' },
            });
            fetchLocal();
            console.log(fotos);
        } catch (error) {
            console.error('Error adding foto:', error);
        }
    };

    const updateReservaEstado = async (id: number, estado: string) => {
        try {
            await axios.patch(`${baseURL}/reserva/${id}/local/${local.id}`, { estado }, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            fetchReservas();
        } catch (error) {
            console.error('Error updating reserva:', error);
        }
    };

    const deleteRecord = async (endpoint: string, id: number) => {
        try {
            if (endpoint === 'reserva') {
                await axios.delete(`${baseURL}/eliminar_reserva/${id}`, {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
                })
            } else {

                await axios.delete(`${baseURL}/${endpoint}/${id}/local/${local.id}`, {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
                });
            }
            fetchAllData();
        } catch (error) {
            console.error(`Error deleting ${endpoint}:`, error);
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto'>
            <Card className='max-h-[500px] overflow-auto'>
                <CardHeader>
                    <CardTitle>Información del Local</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={localForm.handleSubmit(handleUpdateLocal)}>
                        <div>
                            <label>Nombre</label>
                            <Input {...localForm.register('nombre')} />
                            {localForm.formState.errors.nombre && (
                                <p className="text-red-500">{localForm.formState.errors.nombre.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Dirección</label>
                            <Input {...localForm.register('direccion')} />
                            {localForm.formState.errors.direccion && (
                                <p className="text-red-500">{localForm.formState.errors.direccion.message}</p>
                            )}
                        </div>
                        <Button type="submit">Actualizar Información</Button>
                    </form>
                </CardContent>
            </Card>

            <Card className='max-h-[500px] overflow-auto'>
                <CardHeader>
                    <CardTitle>Productos</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={productoForm.handleSubmit(handleAddProducto)}>
                        <div>
                            <label>Nombre</label>
                            <Input {...productoForm.register('nombre_producto')} />
                            {productoForm.formState.errors.nombre_producto && (
                                <p className="text-red-500">{productoForm.formState.errors.nombre_producto.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Descripción</label>
                            <Input {...productoForm.register('descripcion')} />
                            {productoForm.formState.errors.descripcion && (
                                <p className="text-red-500">{productoForm.formState.errors.descripcion.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Precio</label>
                            <Input {...productoForm.register('precio')} />
                            {productoForm.formState.errors.precio && (
                                <p className="text-red-500">{productoForm.formState.errors.precio.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Categoria</label>
                            <Input {...productoForm.register('categoria')} />
                            {productoForm.formState.errors.categoria && (
                                <p className="text-red-500">{productoForm.formState.errors.categoria.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Imagen</label>
                            <Input type="file" {...productoForm.register('imagen')} />
                        </div>
                        <Button type="submit">Agregar Producto</Button>

                    </form>
                </CardContent>
                {productos.length > 0 && (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>Precio</TableHead>
                                    <TableHead>Categoria</TableHead>
                                    <TableHead>Imagen</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productos.map((producto) => (
                                    <TableRow key={producto.id}>
                                        <TableCell>{producto.nombre}</TableCell>
                                        <TableCell>{producto.descripcion}</TableCell>
                                        <TableCell>{producto.precio}</TableCell>
                                        <TableCell>{producto.categoria}</TableCell>
                                        <TableCell>
                                            <img src={'http://127.0.0.1:8000' + producto.imagen} alt={producto.nombre} width="50" />
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => deleteRecord('producto', producto.id)}>Eliminar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                )}
            </Card>

            <Card className='max-h-[500px] overflow-auto'>
                <CardHeader>
                    <CardTitle>Horarios</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={horarioForm.handleSubmit(handleAddHorario)}>
                        <div>
                            <label>Hora Apertura</label>
                            <Input type="time" {...horarioForm.register('hora_apertura')} />
                            {horarioForm.formState.errors.hora_apertura && (
                                <p className="text-red-500">{horarioForm.formState.errors.hora_apertura.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Hora Cierre</label>
                            <Input type="time" {...horarioForm.register('hora_cierre')} />
                            {horarioForm.formState.errors.hora_cierre && (
                                <p className="text-red-500">{horarioForm.formState.errors.hora_cierre.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Días</label>
                            <div className='flex gap-2'>
                                {dias.map((dia) => (
                                    <label key={dia} className='flex items-center gap-1'>
                                        <Input type="checkbox" {...horarioForm.register(dia)} />
                                        {dia}
                                    </label>
                                ))}
                            </div>
                            {Object.keys(horarioForm.formState.errors).some(key => dias.includes(key as Dia)) && (
                                <p className="text-red-500">Debe seleccionar al menos un día</p>
                            )}
                        </div>
                        <Button type="submit">Agregar Horario</Button>
                    </form>
                </CardContent>
                {horarios.length > 0 && (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Hora Apertura</TableHead>
                                    <TableHead>Hora Cierre</TableHead>
                                    <TableHead>Días</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {horarios.map((horario) => (
                                    <TableRow key={horario.id}>
                                        <TableCell>{horario.hora_apertura}</TableCell>
                                        <TableCell>{horario.hora_cierre}</TableCell>
                                        <TableCell>
                                            {dias.map((dia) => horario[dia] && <span key={dia}>{dia} </span>)}
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => deleteRecord('horario', horario.id)}>Eliminar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                )}
            </Card>

            <Card className='max-h-[500px] overflow-auto'>
                <CardHeader>
                    <CardTitle>Tramos Horarios</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={tramoHorarioForm.handleSubmit(handleAddTramoHorario)}>
                        <div>
                            <label>Hora Inicio</label>
                            <Input type="time" {...tramoHorarioForm.register('h_inicio')} />
                            {tramoHorarioForm.formState.errors.h_inicio && (
                                <p className="text-red-500">{tramoHorarioForm.formState.errors.h_inicio.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Hora Final</label>
                            <Input type="time" {...tramoHorarioForm.register('h_final')} />
                            {tramoHorarioForm.formState.errors.h_final && (
                                <p className="text-red-500">{tramoHorarioForm.formState.errors.h_final.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Nombre</label>
                            <Input {...tramoHorarioForm.register('nombre')} />
                            {tramoHorarioForm.formState.errors.nombre && (
                                <p className="text-red-500">{tramoHorarioForm.formState.errors.nombre.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Clientes Máximos</label>
                            <Input {...tramoHorarioForm.register('clientes_maximos')} />
                            {tramoHorarioForm.formState.errors.clientes_maximos && (
                                <p className="text-red-500">{tramoHorarioForm.formState.errors.clientes_maximos.message}</p>
                            )}
                        </div>
                        <Button type="submit">Agregar Tramo Horario</Button>
                    </form>
                </CardContent>
                {tramos.length > 0 && (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Hora Inicio</TableHead>
                                    <TableHead>Hora Final</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Clientes Máximos</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tramos.map((tramo) => (
                                    <TableRow key={tramo.id}>
                                        <TableCell>{tramo.h_inicio}</TableCell>
                                        <TableCell>{tramo.h_final}</TableCell>
                                        <TableCell>{tramo.nombre}</TableCell>
                                        <TableCell>{tramo.clientes_maximos}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => deleteRecord('tramo_horario', tramo.id)}>Eliminar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                )}
            </Card>

            <Card className='max-h-[500px] overflow-auto'>
                <CardHeader>
                    <CardTitle>Fotos del Local</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={fotoForm.handleSubmit(handleAddFoto)}>
                        <div>
                            <label>Imagen</label>
                            <Input type="file" {...fotoForm.register('imagen')} />
                        </div>
                        <Button type="submit">Agregar Foto</Button>

                    </form>
                </CardContent>
                {fotos.length > 0 && (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Imagen</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fotos.map((foto) => (
                                    <TableRow key={foto.id}>
                                        <TableCell>
                                            <img src={'http://127.0.0.1:8000' + foto.imagen} alt={`Foto ${foto.id}`} width="50" />
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => deleteRecord('foto_local', foto.id)}>Eliminar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                )}
            </Card>

            <Card className='max-h-[500px] overflow-auto'>
                <CardHeader>
                    <CardTitle>Reservas</CardTitle>
                </CardHeader>
                <CardContent>
                    {reservas.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Hora</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reservas.map((reserva) => (
                                    <TableRow key={reserva.id}>
                                        <TableCell>{reserva.fecha}</TableCell>
                                        <TableCell>{reserva.hora}</TableCell>
                                        <TableCell>{reserva.estado}</TableCell>
                                        <TableCell>
                                            <select
                                                value={reserva.estado}
                                                onChange={(e) => updateReservaEstado(reserva.id, e.target.value)}
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="confirmada">Confirmada</option>
                                                <option value="cancelada">Cancelada</option>
                                            </select>
                                            <Button onClick={() => deleteRecord('reserva', reserva.id)}>Eliminar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p>No hay reservas</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
