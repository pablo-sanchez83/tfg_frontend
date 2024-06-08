import axios from "axios";
import { AuthResponse } from "@/lib/interfaces";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { useState, useContext } from "react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import CountryCodeSelect from "@/components/account/SelectorPrefijo";
import { Input } from "@/components/ui/input";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./account.module.css";

import { Link, useNavigate } from "react-router-dom";

import { Contexto } from "@/components/Auth/AuthContext";
import env from "@/lib/env";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [countryCode, setCountryCode] = useState("34");
  const navigate = useNavigate();
  const context = useContext(Contexto);

  if (!context) {
    throw new Error("Contexto must be used within a Proveedor");
  }

  const { login } = context;

  const phoneRegex = /\d{7,10}$/;

  const signUpSchema = z
    .object({
      username: z
        .string()
        .min(5, { message: "Mínimo 5 caracteres" })
        .max(50, { message: "Máximo 50 caracteres" }),
      email: z.string().email({ message: "Email inválido" }),
      tel: z.string().regex(phoneRegex, { message: "Teléfono inválido" }),
      password: z.string().max(50),
      confirm_password: z.string().max(50),
      rol: z.number(),
      is_superuser: z.boolean(),
    })
    .refine((data) => data.password === data.confirm_password, {
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
      rol: 2,
      is_superuser: false,
    },
  });

  function onSignUp(values: z.infer<typeof signUpSchema>) {
    const formattedValues = {
      ...values,
      tel: `${countryCode}-${values.tel}`,
    };

    axios
      .post<AuthResponse>(env.API_BASE_URL + env.endpoints.register, formattedValues)
      .then((res) => {
        if (res.data.token) {
          toast.success("¡Creación del usuario exitosa!");
          login(res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error("¡Creación del usuario fallida!");
        console.error(err);
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
    axios
      .post<AuthResponse>(env.API_BASE_URL + env.endpoints.login, values)
      .then((res) => {
        if (res.data.token) {
          toast.success("¡Inicio de sesión exitoso!");
          login(res.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error("¡Inicio de sesión fallido!");
        console.error(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="w-screen max-h-screen mt-10 grid place-items-center">
        <div className={`${styles.container} ${isSignUp ? styles.active : ""}`}>
          <div className={`${styles["form-container"]} ${styles["sign-up"]}`}>
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(onSignUp)}
                className="flex flex-col gap-4 items-center justify-center py-2 h-full"
              >
                <h1>
                  <b>Crear Cuenta</b>
                </h1>
                <FormField
                  control={signUpForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nombre" {...field} />
                      </FormControl>
                      {signUpForm.formState.errors.username && (
                        <p className="text-red-500">
                          {signUpForm.formState.errors.username.message}
                        </p>
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
                        <p className="text-red-500">
                          {signUpForm.formState.errors.email.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <div className="flex gap-1 items-center">
                  <CountryCodeSelect
                    defaultValue={"34"}
                    onValueChange={setCountryCode}
                  />
                  <FormField
                    control={signUpForm.control}
                    name="tel"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="w-1/3"
                            placeholder="Teléfono"
                            {...field}
                          />
                        </FormControl>
                        {signUpForm.formState.errors.tel && (
                          <p className="text-red-500">
                            {signUpForm.formState.errors.tel.message}
                          </p>
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
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          {...field}
                        />
                      </FormControl>
                      {signUpForm.formState.errors.password && (
                        <p className="text-red-500">
                          {signUpForm.formState.errors.password.message}
                        </p>
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
                        <Input
                          type="password"
                          placeholder="Confirmar Contraseña"
                          {...field}
                        />
                      </FormControl>
                      {signUpForm.formState.errors.confirm_password && (
                        <p className="text-red-500">
                          {signUpForm.formState.errors.confirm_password.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-1/2 self-center bg-[#E67E22] hover:bg-transparent hover:text-black hover:border-[#E67E22] border"
                >
                  Registrarse
                </Button>
              </form>
            </Form>
          </div>
          <div className={`${styles["form-container"]} ${styles["sign-in"]}`}>
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="flex flex-col gap-4"
              >
                <h1>
                  <b>Iniciar Sesión</b>
                </h1>
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      {loginForm.formState.errors.email && (
                        <p className="text-red-500">
                          {loginForm.formState.errors.email.message}
                        </p>
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
                        <Input
                          type="password"
                          placeholder="Contraseña"
                          {...field}
                        />
                      </FormControl>
                      {loginForm.formState.errors.password && (
                        <p className="text-red-500">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-1/2 self-center bg-transparent text-black border-[#E67E22] border hover:bg-[#E67E22] hover:text-white hover:border-none"
                >
                  Iniciar Sesión
                </Button>
              </form>
            </Form>
          </div>
          <div className={styles["toggle-container"]}>
            <div className={styles.toggle}>
              <div
                className={`${styles["toggle-panel"]} ${styles["toggle-left"]}`}
              >
                <h1>
                  <b>¡Bienvenido de Nuevo!</b>
                </h1>
                <p>
                  Ingresa tus datos personales para usar todas las funciones del
                  sitio
                </p>
                <Button
                  className={isSignUp ? "" : "hidden"}
                  onClick={() => setIsSignUp(false)}
                >
                  Iniciar Sesión
                </Button>
              </div>
              <div
                className={`${styles["toggle-panel"]} ${styles["toggle-right"]}`}
              >
                <h1>
                  <b>¡Hola, Amigo!</b>
                </h1>
                <p>
                  Regístrate con tus datos personales para usar todas las
                  funciones del sitio
                </p>
                <Button
                  className={isSignUp ? "hidden" : ""}
                  onClick={() => setIsSignUp(true)}
                >
                  Registrarse
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Link to="/empresa-cuenta" className="text-[#E67E22] hover:text-black">
          ¿Quieres registrar una cuenta de empresa?
        </Link>
      </div>
    </>
  );
}
