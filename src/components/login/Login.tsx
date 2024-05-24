import axios from "axios";
import { AuthResponse } from "@/lib/interfaces";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./login.module.css"; // Importar las clases CSS

export default function Login() {
    const baseUrl = "http://localhost:8000/api/";
    const [isSignUp, setIsSignUp] = useState(false);

    const signUpSchema = z.object({
        username: z.string().min(5, { message: "Mínimo 5 caracteres" }).max(50, { message: "Máximo 50 caracteres" }),
        email: z.string().email({ message: "Email inválido" }),
        password: z.string().max(50),
        confirm_password: z.string().max(50),
        rol: z.number(),
    }).refine(data => data.password === data.confirm_password, {
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
    });

    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirm_password: "",
            rol: 2
        },
    });

    function onSignUp(values: z.infer<typeof signUpSchema>) {
        axios.post<AuthResponse>(
            baseUrl + "register",
            values
        )
            .then((res) => {
                if (res.data.token) {
                    toast.success("¡Creación del usuario exitosa!");
                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                toast.error("¡Creación del usuario fallida!");
                console.log(err)
            });
    }

    const loginSchema = z.object({
        email: z.string().email({ message: "Email inválido" }),
        password: z.string().max(50, { message: "Máximo 50 caracteres" }),
    });

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onLogin = (values: z.infer<typeof loginSchema>) => {
        axios.post<AuthResponse>(
            baseUrl + "login",
            values
        )
            .then((res) => {
                if (res.data.token) {
                    toast.success("¡Inicio de sesión exitoso!");
                    localStorage.setItem("token", res.data.token);
                }
            })
            .catch((err) => {
                toast.error("¡Inicio de sesión fallido!");
                console.log(err)
            });
    };

    return (
        <>
            <ToastContainer />
            <div className="w-screen max-h-screen mt-10 grid place-items-center">
                <div className={`${styles.container} ${isSignUp ? styles.active : ""}`}>
                    <div className={`${styles['form-container']} ${styles['sign-up']}`}>
                        <Form {...signUpForm}>
                            <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="flex flex-col gap-4">
                                <h1>Crear Cuenta</h1>
                                <FormField
                                    control={signUpForm.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Nombre" {...field} />
                                            </FormControl>
                                            {signUpForm.formState.errors.username && (
                                                <p className="text-red-500">{signUpForm.formState.errors.username.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            {signUpForm.formState.errors.email && (
                                                <p className="text-red-500">{signUpForm.formState.errors.email.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} />
                                            </FormControl>
                                            {signUpForm.formState.errors.password && (
                                                <p className="text-red-500">{signUpForm.formState.errors.password.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Confirmar Contraseña" {...field} />
                                            </FormControl>
                                            {signUpForm.formState.errors.confirm_password && (
                                                <p className="text-red-500">{signUpForm.formState.errors.confirm_password.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-1/2 self-center bg-[#E67E22] hover:bg-transparent hover:text-black hover:border-[#E67E22] border">Registrarse</Button>
                            </form>
                        </Form>
                    </div>
                    <div className={`${styles['form-container']} ${styles['sign-in']}`}>
                        <Form {...loginForm}>
                            <form onSubmit={loginForm.handleSubmit(onLogin)} className="flex flex-col gap-4">
                                <h1>Iniciar Sesión</h1>
                                <FormField
                                    control={loginForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            {loginForm.formState.errors.email && (
                                                <p className="text-red-500">{loginForm.formState.errors.email.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={loginForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input type="password" placeholder="Contraseña" {...field} />
                                            </FormControl>
                                            {loginForm.formState.errors.password && (
                                                <p className="text-red-500">{loginForm.formState.errors.password.message}</p>
                                            )}
                                        </FormItem>
                                    )}
                                />
                                <a href="#">¿Olvidaste tu contraseña?</a>
                                <Button type="submit" className="w-1/2 self-center bg-transparent text-black border-[#E67E22] border hover:bg-[#E67E22] hover:text-white hover:border-none">Iniciar Sesión</Button>
                            </form>
                        </Form>
                    </div>
                    <div className={styles['toggle-container']}>
                        <div className={styles.toggle}>
                            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
                                <h1>¡Bienvenido de Nuevo!</h1>
                                <p>Ingresa tus datos personales para usar todas las funciones del sitio</p>
                                <Button className={isSignUp ? '' : 'hidden'} onClick={() => setIsSignUp(false)}>Iniciar Sesión</Button>
                            </div>
                            <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
                                <h1>¡Hola, Amigo!</h1>
                                <p>Regístrate con tus datos personales para usar todas las funciones del sitio</p>
                                <Button className={isSignUp ? 'hidden' : ''} onClick={() => setIsSignUp(true)}>Registrarse</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
