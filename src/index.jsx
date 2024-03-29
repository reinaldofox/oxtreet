import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import Administrativo from './routes/Administrativo';
import Cliente from './routes/Cliente';
import ErrorPage from './routes/ErrorPage';
import Estoque from './routes/Estoque';
import Fornecedor from './routes/Fornecedor';
import Home from './routes/Home';
import Venda from './routes/Venda';

const router = createBrowserRouter([
  { path: '/', element: <App />,  errorElement: <ErrorPage />,
    children: [  
      { path: '/', element: <Home /> },
      { path: '/vendas', element: <Venda /> },
      { path: '/estoque', element: <Estoque /> },
      { path: '/clientes', element: <Cliente /> },
      { path: '/fornecedores', element: <Fornecedor /> },
      { path: '/administrativo', element: <Administrativo /> },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);