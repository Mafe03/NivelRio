import React, { useState } from 'react';
import Navbar from "./Navbar";
import Aside from "./Aside";
const Planta2 = () => {
    const [abrir, setAbrir] = useState(false);
    return ( <>
      <Aside abrir={abrir} setAbrir={setAbrir} />
      <Navbar abrir={abrir} setAbrir={setAbrir} pageTitle="Planta N°2" />{" "}
      {/* Asegúrate de pasar las props correctamente */}
      <div className="container-fluid py-4">
        <div className="row">
          <div className="card-body pt-0 p-3 text-center bg-gradient-primary3 ">
            <div className="nivel-rio">
              <h6 className="mb-0">PLANTA N°2</h6>
              <span className="text-xs">
               EN PROCESO
              </span>
            </div>
          </div>
         </div>
      </div></> );
}
 
export default Planta2;