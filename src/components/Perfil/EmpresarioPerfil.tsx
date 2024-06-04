import { useState, useEffect } from 'react';
import axios from 'axios';
import CrearLocalForm from './CrearLocalForm';
import CrearEmpresaForm from './CrearEmpresaForm';
import EditarPerfil from './EditarPerfil';
import { Empresa, Locales, User, Categoria_Culinaria } from '@/lib/interfaces';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableHeader
} from '@/components/ui/table';

export default function EmpresarioPerfil({ user }: { user: User }) {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [locales, setLocales] = useState<Locales[]>([]);
  const [categorias, setCategorias] = useState<Categoria_Culinaria[]>([]);
  const baseURL = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    fetchEmpresa();
    fetchCategoriasCulinarias();
  }, []);

  useEffect(() => {
    if (empresa) {
      fetchLocales();
    }
  }, [empresa]);

  const fetchEmpresa = async () => {
    try {
      const response = await axios.get(baseURL + '/empresas', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      if (response.data.length > 0) {
        setEmpresa(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching empresa:', error);
    }
  };

  const fetchLocales = async () => {
    try {
      if (!empresa) return;
      const response = await axios.get(baseURL + '/locales/empresa/' + empresa.id, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      setLocales(response.data);
    } catch (error) {
      console.error('Error fetching locales:', error);
    }
  };

  const fetchCategoriasCulinarias = async () => {
    try {
      const response = await axios.get(baseURL + '/categorias_culinarias', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categorias culinarias:', error);
    }
  };

  const handleDeleteLocal = async (id: number) => {
    try {
      await axios.delete(baseURL + `/local/eliminar/${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      setLocales(locales.filter(local => local.id !== id));
    } catch (error) {
      console.error('Error deleting local:', error);
    }
  };

  return (
    <div className='flex gap-4 w-full m-3'>
      <div className='flex flex-col gap-4 w-3/4'>
        {empresa ? (
          empresa.confirmado ? (
            <div className='flex flex-col gap-4 w-full'>
              <CrearLocalForm categorias={categorias} empresa={empresa} fetchLocales={fetchLocales} />
              <Card>
                <CardHeader>
                  <CardTitle>Locales</CardTitle>
                </CardHeader>
                <CardContent>
                  {locales.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nombre</TableHead>
                          <TableHead>Dirección</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {locales.map((local, index) => (
                          <TableRow key={index}>
                            <TableCell>{local.nombre}</TableCell>
                            <TableCell>{local.direccion}</TableCell>
                            <TableCell>
                              <Button className='bg-red-500' onClick={() => handleDeleteLocal(local.id)}>
                                <Trash />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p>No hay locales</p>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <p>Empresa pendiente de confirmación.</p>
          )
        ) : (
          <CrearEmpresaForm user={user} fetchEmpresa={fetchEmpresa} />
        )}
      </div>
      <div className='w-1/4 flex flex-col gap-4'>
        <EditarPerfil user={user} />
        {empresa && (
          <Card>
            <CardHeader>
              <CardTitle>Información</CardTitle>
            </CardHeader>
            <CardContent>
              <h1 className='text-xl'>Información de la empresa</h1>
              <h3 className='text-lg'>Nombre: {empresa?.nombre}</h3>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
