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
import { Empresa, User } from "@/lib/interfaces";
import EditarPerfil from "./utils/EditarPerfil";
import MisReservas from "./utils/MisReservas";

export default function AdminPerfil({ user }: { user: User }) {
  const [users, setUsers] = useState<User[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  const baseURL = "http://127.0.0.1:8000/api";

  useEffect(() => {
    fetchUsers();
    fetchEmpresas();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(baseURL + "/usuarios", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchEmpresas = async () => {
    try {
      const response = await axios.get(baseURL + "/empresas", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      setEmpresas(response.data);
    } catch (error) {
      console.error("Error fetching empresas:", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(baseURL + `/usuario/${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteEmpresa = async (id: number) => {
    try {
      await axios.delete(baseURL + `/empresa/${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      setEmpresas(empresas.filter((empresa) => empresa.id !== id));
    } catch (error) {
      console.error("Error deleting empresa:", error);
    }
  };

  const handleToggleConfirmado = async (id: number, confirmado: boolean) => {
    try {
      await axios.patch(
        `${baseURL}/empresa/${id}`,
        { confirmado },
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
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

  return (
    <div className="flex gap-4 w-full h-full">
      <div className="ml-4 flex flex-col gap-4 w-3/4 h-[80vh]">
        <Card className="flex-1 overflow-auto">
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
                    <TableCell colSpan={8}>No hay usuarios</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="flex-1 overflow-auto">
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
        <MisReservas />
      </div>
      <div className="w-1/4">
        <EditarPerfil user={user} />
      </div>
    </div>
  );
}
