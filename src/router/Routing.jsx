import React, { useState } from 'react';
import { Routes, Route, BrowserRouter  } from 'react-router-dom';
import LayoutDash from '../components/Dashboard/LayoutDash';
import Inicio from '../components/Dashboard/Inicio';
import { AuthProvider } from '../context/AuthProvide';
import Layaout from '../components/Public/Layout';
import Login from '../components/Public/Login';


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
            
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </> );
}
 
export default Routing;