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

const router = createBrowserRouter([
  {
    path: "/",
    element: <GenericLayout><Index /></GenericLayout>,
  },
  {
    path: "/account",
    element: <AccountLayout><Login /></AccountLayout>,
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
