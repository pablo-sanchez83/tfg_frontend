import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Categoria_Culinaria, Empresa } from "@/lib/interfaces";
import env from "@/lib/env";

interface CreateLocalFormProps {
  categorias: Categoria_Culinaria[];
  empresa: Empresa;
  fetchLocales: () => void;
}

const createLocalSchema = z.object({
  nombre: z.string().max(100).nonempty({ message: "El nombre es requerido" }),
  direccion: z
    .string()
    .max(255)
    .nonempty({ message: "La dirección es requerida" }),
  categoria_culinaria_id: z
    .string()
    .nonempty({ message: "Seleccione una categoría" }),
  encargado_username: z
    .string()
    .min(5, { message: "Mínimo 5 caracteres" })
    .max(50, { message: "Máximo 50 caracteres" })
    .nonempty({ message: "El nombre de usuario es requerido" }),
  encargado_email: z
    .string()
    .email({ message: "Email inválido" })
    .nonempty({ message: "El correo electrónico es requerido" }),
  encargado_tel: z
    .string()
    .regex(/^\d{1,4}-\d{7,10}$/, { message: "Teléfono inválido" })
    .nonempty({ message: "El teléfono es requerido" }),
});

export default function CrearLocalForm({
  categorias,
  empresa,
  fetchLocales,
}: CreateLocalFormProps) {
  const createLocalForm = useForm<z.infer<typeof createLocalSchema>>({
    resolver: zodResolver(createLocalSchema),
    defaultValues: {
      nombre: "",
      direccion: "",
      categoria_culinaria_id: "",
      encargado_username: "",
      encargado_email: "",
      encargado_tel: "",
    },
  });

  const handleCreateLocal = async (data: z.infer<typeof createLocalSchema>) => {
    console.log("Datos del formulario:", data); // Depuración
    try {
      const encargadoResponse = await axios.post(
        env.API_BASE_URL + env.endpoints.register,
        {
          username: data.encargado_username,
          email: data.encargado_email,
          tel: data.encargado_tel,
          password:
            empresa.nombre + data.encargado_username + new Date().getFullYear(), // Set a default password or prompt user to set one later
          rol: 3,
        },
      );
      const encargado = encargadoResponse.data.user;
      console.log("Encargado creado:", encargado); // Depuración

      const localData = {
        nombre: data.nombre,
        direccion: data.direccion,
        categoria_culinaria: Number(data.categoria_culinaria_id), // Convertir a número aquí
        empresa: empresa?.id,
        usuario: encargado.id, // Asegúrate de pasar el ID del encargado creado
      };

      console.log("Datos para crear local:", localData); // Depuración antes de enviar

      const localResponse = await axios.post(
        env.API_BASE_URL + env.endpoints.locales,
        localData,
        {
          headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
        },
      );

      console.log("Local creado:", localResponse.data); // Depuración
      fetchLocales();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error al crear local:", error.response?.data); // Error de Axios
      } else {
        console.error("Error desconocido:", error); // Otro tipo de error
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Local</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...createLocalForm}>
          <form
            onSubmit={createLocalForm.handleSubmit(handleCreateLocal)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={createLocalForm.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nombre del local" {...field} />
                  </FormControl>
                  <FormMessage>
                    {createLocalForm.formState.errors.nombre?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={createLocalForm.control}
              name="direccion"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Dirección" {...field} />
                  </FormControl>
                  <FormMessage>
                    {createLocalForm.formState.errors.direccion?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={createLocalForm.control}
              name="categoria_culinaria_id"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categorias.map((categoria, index) => (
                        <SelectItem key={index} value={String(categoria.id)}>
                          {categoria.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {
                      createLocalForm.formState.errors.categoria_culinaria_id
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
            <h3 className="text-lg font-semibold">Encargado</h3>
            <FormField
              control={createLocalForm.control}
              name="encargado_username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nombre de usuario" {...field} />
                  </FormControl>
                  <FormMessage>
                    {
                      createLocalForm.formState.errors.encargado_username
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={createLocalForm.control}
              name="encargado_email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Correo electrónico" {...field} />
                  </FormControl>
                  <FormMessage>
                    {createLocalForm.formState.errors.encargado_email?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={createLocalForm.control}
              name="encargado_tel"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Teléfono" {...field} />
                  </FormControl>
                  <FormMessage>
                    {createLocalForm.formState.errors.encargado_tel?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button type="submit">Crear Local</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
