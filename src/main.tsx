import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import Login from './components/login/Login'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Navbar from './components/shared/Navbar.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
    <RouterProvider router={router} />
    {/* FOOTER */}
  </React.StrictMode>,
)
