import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/interfaces";
import env from "@/lib/env";

const createEmpresaSchema = z.object({
  nombre: z.string().max(100),
});

export default function CrearEmpresaForm({
  fetchEmpresa,
  user,
}: {
  fetchEmpresa: () => void;
  user: User;
}) {
  const createEmpresaForm = useForm<z.infer<typeof createEmpresaSchema>>({
    resolver: zodResolver(createEmpresaSchema),
  });

  const handleCreateEmpresa = async (
    data: z.infer<typeof createEmpresaSchema>,
  ) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("usuario", user.id.toString());
    try {
      await axios.post(env.API_BASE_URL + env.endpoints.empresas, formData, {
        headers: { Authorization: `Token ${localStorage.getItem(env.TOKEN_KEY)}` },
      });
      fetchEmpresa();
    } catch (error) {
      console.error("Error creating empresa:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Empresa</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...createEmpresaForm}>
          <form
            onSubmit={createEmpresaForm.handleSubmit(handleCreateEmpresa)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={createEmpresaForm.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Nombre de la empresa" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Crear Empresa</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
