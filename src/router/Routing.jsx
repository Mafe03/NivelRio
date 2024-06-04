import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LayoutDash from '../components/Dashboard/LayoutDash';
import Inicio from '../components/Dashboard/Inicio';
import { AuthProvider } from '../context/AuthProvide.jsx'; // Verifica que el nombre del archivo sea correcto
import Layout from '../components/Public/Layout'; // Asegúrate de que el nombre del componente sea correcto
import Login from '../components/Public/Login';
import Bombeo2 from '../components/Dashboard/Bombeo2';

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

            <Route path="Bombeo2" element={<Bombeo2/>} />

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Routing;
