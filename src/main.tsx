import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Proveedor } from "./components/Auth/AuthContext";

// Importación de layouts y componentes
import GenericLayout from "@/assets/GenericLayout";
import AccountLayout from "@/assets/AccountLayout";
import Index from "./components/Index/Index";
import Login from "./components/account/Cliente/Account";
import CuentaEmpresa from "./components/account/Empresa/CuentaEmpresa";
import LocalDetails from "./components/LocalDetails/LocalDetails";
import Reserva from "./components/Reserva/Reserva";
import Perfil from "./components/Perfil/Perfil";
import ErrorMissing from "./assets/404Error";

// Creación del enrutador con las rutas y sus respectivos componentes y layouts
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GenericLayout>
        <Index />
      </GenericLayout>
    ),
  },
  {
    path: "/account",
    element: (
      <AccountLayout>
        <Login />
      </AccountLayout>
    ),
  },
  {
    path: "/empresa-cuenta",
    element: (
      <AccountLayout>
        <CuentaEmpresa />
      </AccountLayout>
    ),
  },
  {
    path: "/perfil",
    element: (
      <GenericLayout>
        <Perfil />
      </GenericLayout>
    ),
  },
  {
    path: "/locales/:id",
    element: (
      <GenericLayout>
        <LocalDetails />
      </GenericLayout>
    ),
  },
  {
    path: "/reservar/:id",
    element: (
      <GenericLayout>
        <Reserva />
      </GenericLayout>
    ),
  },
  {
    path: "/*",
    element: (
      <AccountLayout>
        <ErrorMissing/>
      </AccountLayout>
    )
  }
]);

// Renderización de la aplicación en el elemento root del HTML
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Proveedor>
      <RouterProvider router={router} />
    </Proveedor>
  </React.StrictMode>,
);
