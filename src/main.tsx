import React from 'react'
import ReactDOM from 'react-dom/client'

import GenericLayout from '@/assets/GenericLayout'
import AccountLayout from '@/assets/AccountLayout'

import Index from './components/Index/Index'
import Login from './components/login/Login'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { Proveedor } from './components/Auth/AuthContext'

const router = createBrowserRouter([
  {
    path: "/",
    element: <GenericLayout><Index /></GenericLayout>,
  },
  {
    path: "/account",
    element: <AccountLayout><Login /></AccountLayout>,
  },
  {
    path: "/about",
    element: <GenericLayout><Index /></GenericLayout>,
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Proveedor>
      <RouterProvider router={router} />
    </Proveedor>
  </React.StrictMode>,
)
