import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home'
import Venda from './routes/Venda'
import Estoque from './routes/Estoque'
import Cliente from './routes/Cliente'
import Fornecedor from './routes/Fornecedor'
import Administrativo from './routes/Administrativo'
import ErrorPage from './routes/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/vendas',
        element: <Venda />
      },
      {
        path: '/estoque',
        element: <Estoque />
      },
      {
        path: '/clientes',
        element: <Cliente />
      },
      {
        path: '/fornecedores',
        element: <Fornecedor />
      },
      {
        path: '/administrativo',
        element: <Administrativo />
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);