import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LayoutDash from '../components/Dashboard/LayoutDash';
import Inicio from '../components/Dashboard/Inicio';
import { AuthProvider } from '../context/AuthProvide.jsx'; // Verifica que el nombre del archivo sea correcto
import Layout from '../components/Public/Layout'; // Asegúrate de que el nombre del componente sea correcto
import Login from '../components/Public/Login';
import CerrarSesion from '../components/Dashboard/CerrarSesion';
import Planta1 from '../components/Dashboard/Planta1';
import Planta2 from '../components/Dashboard/Planta2';

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
<<<<<<< HEAD
            <Route path="Planta1" element={<Planta1/>} />
            <Route path="Planta2" element={<Planta2/>} />
            <Route path="Cerrar" element={<CerrarSesion />} />
=======

            <Route path="Bombeo2" element={<Bombeo2/>} />

>>>>>>> 5b0e9f52d990d396d9112541c70c12059c7f2739
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Routing;
