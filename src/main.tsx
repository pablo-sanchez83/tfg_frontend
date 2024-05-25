import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import Login from './components/login/Login'
import GenericLayout from '@/assets/GenericLayout'
import AccountLayout from '@/assets/AccountLayout'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <GenericLayout><App /></GenericLayout>,
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
