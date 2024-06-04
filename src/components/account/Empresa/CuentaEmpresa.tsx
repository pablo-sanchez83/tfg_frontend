import axios from "axios";
import { AuthResponse } from "@/lib/interfaces";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useState, useContext } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import SelectorPrefijo from "@/components/account/SelectorPrefijo";
import { Input } from "@/components/ui/input";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate } from "react-router-dom";

import { Contexto } from "@/components/Auth/AuthContext";

export default function Login() {
    const baseUrl = "http://localhost:8000/api/";
    const [countryCode, setCountryCode] = useState("34");
    const navigate = useNavigate();
    const context = useContext(Contexto);

    if (!context) {
        throw new Error("Contexto must be used within a Proveedor");
    }

    const { login } = context;

    const phoneRegex = /\d{7,10}$/;

    const signUpSchema = z.object({
        username: z.string().min(5, { message: "Mínimo 5 caracteres" }).max(50, { message: "Máximo 50 caracteres" }),
        email: z.string().email({ message: "Email inválido" }),
        tel: z.string().regex(phoneRegex, { message: "Teléfono inválido" }),
        password: z.string().max(50),
        confirm_password: z.string().max(50),
        rol: z.number(),
        is_superuser: z.boolean()
    }).refine(data => data.password === data.confirm_password, {
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
    });

    const signUpForm = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            tel: "",
            password: "",
            confirm_password: "",
            rol: 4,
            is_superuser: false
        },
    });

    function onSignUp(values: z.infer<typeof signUpSchema>) {
        const formattedValues = {
            ...values,
            tel: `${countryCode}-${values.tel}`
        };

        axios.post<AuthResponse>(
            baseUrl + "register",
            formattedValues
        )
            .then((res) => {
                if (res.data.token) {
                    toast.success("¡Creación del usuario exitosa!");
                    login(res.data.token);
                    navigate("/");
                }
            })
            .catch((err) => {
                toast.error("¡Creación del usuario fallida!");
                console.log(err);
            });
    }

    return (
        <>
            <ToastContainer />
            <div className="w-screen max-h-screen mt-10 grid place-items-center">
                <Form {...signUpForm}>
                    <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="m-10 bg-white p-10 border rounded-md shadow-md flex flex-col gap-4 items-center justify-center py-2 h-full">
                        <h1><b>Crear Cuenta</b></h1>
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
                        <div className="flex gap-1 items-center">
                            <SelectorPrefijo defaultValue={"34"} onValueChange={setCountryCode} />
                            <FormField
                                control={signUpForm.control}
                                name="tel"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input className="w-full" placeholder="Teléfono" {...field} />
                                        </FormControl>
                                        {signUpForm.formState.errors.tel && (
                                            <p className="text-red-500">{signUpForm.formState.errors.tel.message}</p>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>
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
                <Link to="/account" className="text-[#E67E22] hover:text-black">¿Tienes una cuenta de cliente?</Link>
            </div>
        </>
    );
}