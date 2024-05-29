import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LayoutDash from '../components/Dashboard/LayoutDash';
import Inicio from '../components/Dashboard/Inicio';
import { AuthProvider } from '../context/AuthProvide.jsx'; // Verifica que el nombre del archivo sea correcto
import Layout from '../components/Public/Layout'; // Asegúrate de que el nombre del componente sea correcto
import Login from '../components/Public/Login';

const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/dashboard" element={<LayoutDash />}>
            <Route index element={<Inicio />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Routing;
