import React, { useState } from 'react';
import { Routes, Route, BrowserRouter  } from 'react-router-dom';
import LayoutDash from '../components/Dashboard/LayoutDash';
import Inicio from '../components/Dashboard/Inicio';
import { AuthProvider } from '../context/AuthProvide';
import Layaout from '../components/Public/Layout';
import Login from '../components/Public/Login';
import CerrarSesion from '../components/Dashboard/CerrarSesion';
import Planta1 from '../components/Dashboard/Planta1';
import Planta2 from '../components/Dashboard/Planta2';


const Routing = () => {
    return ( <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layaout />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/Dashboard" element={<LayoutDash />}>
            <Route index element={<Inicio />} />
            <Route path="Planta1" element={<Planta1/>} />
            <Route path="Planta2" element={<Planta2/>} />
            <Route path="Cerrar" element={<CerrarSesion />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </> );
}
 
export default Routing;