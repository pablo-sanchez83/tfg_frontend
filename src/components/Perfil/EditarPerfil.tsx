import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@/lib/interfaces';

interface UserProfileFormProps {
  user: User;
}

const editUserSchema = z.object({
  first_name: z.string().max(50),
  last_name: z.string().max(50),
  username: z.string().min(5, { message: 'Mínimo 5 caracteres' }).max(50, { message: 'Máximo 50 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  tel: z.string().regex(/^\d{1,4}-\d{7,10}$/, { message: 'Teléfono inválido' }),
});

export default function EditarPerfil({ user }: UserProfileFormProps) {
  const editForm = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      username: user.username || '',
      email: user.email || '',
      tel: user.tel || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof editUserSchema>) => {
    try {
      await axios.patch('http://127.0.0.1:8000/api/mi_usuario', data, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-3xl text-center'>Editar Información</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...editForm}>
          <form onSubmit={editForm.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <FormField
              control={editForm.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Nombre de usuario' {...field} />
                  </FormControl>
                  {editForm.formState.errors.username && (
                    <p className='text-red-500'>{editForm.formState.errors.username.message}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={editForm.control}
              name='first_name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Nombre' {...field} />
                  </FormControl>
                  {editForm.formState.errors.first_name && (
                    <p className='text-red-500'>{editForm.formState.errors.first_name.message}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={editForm.control}
              name='last_name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Apellido' {...field} />
                  </FormControl>
                  {editForm.formState.errors.last_name && (
                    <p className='text-red-500'>{editForm.formState.errors.last_name.message}</p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={editForm.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  {editForm.formState.errors.email && (
                    <p className='text-red-500'>{editForm.formState.errors.email.message}</p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={editForm.control}
              name='tel'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Teléfono: 9999-999999999' {...field} />
                  </FormControl>
                  {editForm.formState.errors.tel && (
                    <p className='text-red-500'>{editForm.formState.errors.tel.message}</p>
                  )}
                </FormItem>
              )}
            />
            <Button type='submit'>Actualizar Información</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}