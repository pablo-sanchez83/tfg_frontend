import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { Trash } from "lucide-react";
import { Categoria_Culinaria, Empresa, User } from "@/lib/interfaces";
import EditarPerfil from "./utils/EditarPerfil";
import MisReservas from "./utils/MisReservas";
import env from "@/lib/env";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminPerfil({ user }: { user: User }) {
  // Estados para almacenar usuarios, empresas y categorías culinarias
  const [users, setUsers] = useState<User[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [categoriasCulinarias, setCategoriasCulinarias] = useState<Categoria_Culinaria[]>([]);

  // Efecto para obtener usuarios, empresas y categorías culinarias al montar el componente
  useEffect(() => {
    fetchUsers();
    fetchEmpresas();
    fetchCategoriasCulinarias();
  }, []);

  // Esquema de validación para el formulario de categoría culinaria
  const categoriaCulinariaSchema = z.object({
    nombre: z.string().min(1, { message: "El nombre es obligatorio" }),
    descripcion: z.string().min(10, { message: "La descripción es obligatoria" }),
  });

  // Hook de formulario para manejar la creación de categorías culinarias
  const categoriaCulinariaForm = useForm<z.infer<typeof categoriaCulinariaSchema>>({
    resolver: zodResolver(categoriaCulinariaSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
    },
  });

  // Función para obtener los usuarios desde la API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(env.API_BASE_URL + env.endpoints.usuarios, {
        headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Función para obtener las empresas desde la API
  const fetchEmpresas = async () => {
    try {
      const response = await axios.get(env.API_BASE_URL + env.endpoints.empresas, {
        headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
      });
      setEmpresas(response.data);
    } catch (error) {
      console.error("Error fetching empresas:", error);
    }
  };

  // Función para obtener las categorías culinarias desde la API
  const fetchCategoriasCulinarias = async () => {
    try {
      const response = await axios.get(env.API_BASE_URL + env.endpoints.categorias_culinarias, {
        headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
      });
      setCategoriasCulinarias(response.data);
    } catch (error) {
      console.error("Error fetching categorias culinarias:", error);
    }
  };

  // Función para manejar la eliminación de un usuario
  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(env.API_BASE_URL + env.endpoints.usuario(id), {
        headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Función para manejar la eliminación de una empresa
  const handleDeleteEmpresa = async (id: number) => {
    try {
      await axios.delete(env.API_BASE_URL + env.endpoints.empresa(id), {
        headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
      });
      setEmpresas(empresas.filter((empresa) => empresa.id !== id));
    } catch (error) {
      console.error("Error deleting empresa:", error);
    }
  };

  // Función para manejar la eliminación de una categoría culinaria
  const handleDeleteCategoriaCulinaria = async (id: number) => {
    try {
      await axios.delete(env.API_BASE_URL + env.endpoints.categoria_culinaria(id), {
        headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
      });
      setCategoriasCulinarias(categoriasCulinarias.filter((categoria) => categoria.id !== id));
    } catch (error) {
      console.error("Error deleting categoria culinaria:", error);
    }
  };

  // Función para manejar el cambio de estado confirmado de una empresa
  const handleToggleConfirmado = async (id: number, confirmado: boolean) => {
    try {
      await axios.patch(
        env.API_BASE_URL + env.endpoints.empresa(id),
        { confirmado },
        {
          headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
        },
      );
      setEmpresas(
        empresas.map((empresa) =>
          empresa.id === id ? { ...empresa, confirmado } : empresa,
        ),
      );
    } catch (error) {
      console.error("Error updating confirmado:", error);
    }
  };

  // Función para manejar la creación de una categoría culinaria
  const onCreateCategory = async (values: z.infer<typeof categoriaCulinariaSchema>) => {
    try {
      await axios.post(env.API_BASE_URL + env.endpoints.categorias_culinarias, values, {
        headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
      });
      fetchCategoriasCulinarias();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 w-full h-full">
      <div className="flex flex-col gap-4 w-full lg:w-3/4 h-[80vh]">
        {/* Tabla de Usuarios */}
        <Card className="flex-1 overflow-auto">
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="min-w-full">
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
                  users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.tel}</TableCell>
                      <TableCell>{user.rol}</TableCell>
                      <TableCell>
                        <Button
                          className="bg-red-500"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No hay usuarios</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Tabla de Empresas */}
        <Card className="flex-1 overflow-auto">
          <CardHeader>
            <CardTitle>Empresas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="min-w-full">
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
                  empresas.map((empresa, index) => (
                    <TableRow key={index}>
                      <TableCell>{empresa.nombre}</TableCell>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={empresa.confirmado}
                          onChange={() =>
                            handleToggleConfirmado(
                              empresa.id,
                              !empresa.confirmado,
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{empresa.localNum}</TableCell>
                      <TableCell>
                        <Button
                          className="bg-red-500"
                          onClick={() => handleDeleteEmpresa(empresa.id)}
                        >
                          <Trash />
                        </Button>
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

        {/* Componente de Mis Reservas */}
        <MisReservas />

        {/* Tabla de Categorías Culinarias */}
        <Card className="flex-1 overflow-auto">
          <CardHeader>
            <CardTitle>Categorias culinarias</CardTitle>
          </CardHeader>
          <CardContent>
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriasCulinarias.length > 0 ? (
                  categoriasCulinarias.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>{category.nombre}</TableCell>
                      <TableCell>
                        <Button
                          className="bg-red-500"
                          onClick={() => handleDeleteCategoriaCulinaria(category.id)}
                        >
                          <Trash />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No hay categorías culinarias</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Formulario de Perfil y Creación de Categoría */}
      <div className="w-full lg:w-1/4">
        <EditarPerfil user={user} />
        <Card className="flex-1 overflow-auto">
          <CardHeader>
            <CardTitle>Crear categoría culinaria</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...categoriaCulinariaForm}>
              <form onSubmit={categoriaCulinariaForm.handleSubmit(onCreateCategory)} className="space-y-3">
                <FormField
                  control={categoriaCulinariaForm.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem >
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Nombre"
                          {...field}
                        />
                      </FormControl>
                      {categoriaCulinariaForm.formState.errors.nombre && (
                        <p className="text-red-500">
                          {categoriaCulinariaForm.formState.errors.nombre.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <FormField
                  control={categoriaCulinariaForm.control}
                  name="descripcion"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Descripción"
                          {...field}
                        />
                      </FormControl>
                      {categoriaCulinariaForm.formState.errors.descripcion && (
                        <p className="text-red-500">
                          {categoriaCulinariaForm.formState.errors.descripcion.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <Button type="submit">Crear</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
