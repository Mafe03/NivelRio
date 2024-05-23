import React, { useState } from 'react';
import { Outlet, Navigate } from "react-router-dom";
import UseAuth from "../../helper/UseAuth";
import Navbar from './Navbar';
import Aside from './Aside';


const LayoutDash = () => {
    const { Autenticado } = UseAuth();
    return ( <>
    
    <Aside/>
    
    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
    <Navbar/>
    {Autenticado.ter_num_id ? <Outlet /> : <Navigate to={"/"} />}
    </main>
    </> );
}
 
export default LayoutDash;