import React, { useState, useEffect } from "react";
import logo from "../../assets/img/logo.png";
import { NavLink } from "react-router-dom";
const Aside = ({ abrir }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verificar el ancho de la ventana al cargar y redimensionar
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // 767px es generalmente considerado como el límite entre dispositivos móviles y de escritorio
    };

    handleResize(); // Verificar el ancho de la ventana al cargar la página

    window.addEventListener("resize", handleResize); // Verificar el ancho de la ventana al redimensionar

    // Limpiar el listener de evento al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {(!isMobile && (
        <aside
          className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark navbar-collapse"
          id="sidenav-main"
        >
          <div className="sidenav-header">
            <i
              className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
              aria-hidden="true"
              id="iconSidenav"
            ></i>
            <a
              className="navbar-brand m-0"
             
              target="_blank"
            >
              <img
                src={logo}
                className="navbar-brand-img h-100"
                alt="main_logo"
              />{" "}
              <span className="ms-1 font-weight-bold text-white">
                EMCARTAGO
              </span>
            </a>
          </div>
          <hr className="horizontal light mt-0 mb-2" />
          <div
            className="collapse navbar-collapse  w-auto "
            id="sidenav-collapse-main"
          >
            <ul className="navbar-nav">
              
            <li className="nav-item">
  <NavLink
    to="/"
    className="nav-link text-white bg-gradient-primary1"
    activeClassName="active" // Agrega la clase "active" cuando el enlace está activo
  >
    <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
      <i className="material-icons opacity-10">dashboard</i>
    </div>
    <span className="nav-link-text ms-1">Planta N°1</span>
  </NavLink>
</li>
                
              <li className="nav-item">
              <NavLink to="/Dashboard/Bombeo2" isActive={(match, location) => {
      // Devuelve true si la ruta actual coincide con "/Bombeo2"
      return location.pathname === "/Bombeo2";
    }}>
      <a className={`nav-link text-white bg-gradient-primary1 ${location.pathname === "/Bombeo2" ? "active" : ""}`}>
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">receipt_long</i>
                  </div>
                  <span className="nav-link-text ms-1">Planta N°2</span>
                </a>
                </NavLink>
              </li>
             
            </ul>
          </div>
        </aside>
      )) ||
        (abrir === true ? (
          <aside
            className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark navbar-collapse"
            id="sidenav-main"
          >
            <div className="sidenav-header">
              <i
                className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
                aria-hidden="true"
                id="iconSidenav"
              ></i>
              <a
                className="navbar-brand m-0"
                target="_blank"
              >
                <img
                  src={logo}
                  className="navbar-brand-img h-100"
                  alt="main_logo"
                />{" "}
                <span className="ms-1 font-weight-bold text-white">
                  EMCARTAGO
                </span>
              </a>
            </div>
            <hr className="horizontal light mt-0 mb-2" />
            <div
              className="collapse navbar-collapse  w-auto "
              id="sidenav-collapse-main"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                <NavLink to="/">
                <a class="nav-link text-white " href="">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                      <i className="material-icons opacity-10">dashboard</i>
                    </div>
                    <span className="nav-link-text ms-1">Planta N°1</span>
                  </a>
                  </NavLink>
                </li>
                <li className="nav-item">
              <NavLink to="Bombeo2">
              <a class="nav-link text-white " href="">
            <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                    <i className="material-icons opacity-10">receipt_long</i>
                  </div>
                  <span className="nav-link-text ms-1">Planta N°2</span>
                </a>
                </NavLink>
              </li>
               
                
               
               
               
                
               
              </ul>
            </div>
          </aside>
        ) : (
          <></>
        ))}
    </>
  );
};

export default Aside;
